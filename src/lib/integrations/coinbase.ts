/**
 * Coinbase Pro Integration Adapter (Live Implementation)
 * READ-ONLY: For portfolio analysis only, no trading execution
 */

import crypto from 'crypto'
import axios from 'axios'
import { IntegrationAdapter, Holding, Transaction, ConnectionStatus, AdapterCredentials } from './types'

interface CoinbaseAccount {
  id: string
  currency: string
  balance: string
  available: string
  hold: string
  profile_id: string
  trading_enabled: boolean
}

interface CoinbaseProduct {
  id: string
  display_name: string
  base_currency: string
  quote_currency: string
  status: string
}

interface CoinbaseFill {
  trade_id: number
  product_id: string
  price: string
  size: string
  order_id: string
  created_at: string
  liquidity: string
  fee: string
  settled: boolean
  side: 'buy' | 'sell'
}

export class CoinbaseAdapter implements IntegrationAdapter {
  readonly name = 'Coinbase Pro'
  readonly provider = 'coinbase'
  readonly isReadOnly = true

  private connected = false
  private lastSync: Date | null = null
  private apiKey: string = ''
  private apiSecret: string = ''
  private passphrase: string = ''
  private baseUrl = 'https://api.exchange.coinbase.com'

  async connect(credentials: AdapterCredentials): Promise<ConnectionStatus> {
    if (!credentials.apiKey || !credentials.apiSecret || !credentials.passphrase) {
      return {
        connected: false,
        lastSync: null,
        error: 'Missing required credentials: apiKey, apiSecret, passphrase'
      }
    }

    this.apiKey = credentials.apiKey
    this.apiSecret = credentials.apiSecret
    this.passphrase = credentials.passphrase

    try {
      // Test connection by fetching accounts
      await this.makeAuthenticatedRequest('GET', '/accounts')
      
      this.connected = true
      this.lastSync = new Date()

      return {
        connected: true,
        lastSync: this.lastSync
      }
    } catch (error) {
      this.connected = false
      return {
        connected: false,
        lastSync: null,
        error: error instanceof Error ? error.message : 'Failed to connect to Coinbase Pro'
      }
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false
    this.lastSync = null
    this.apiKey = ''
    this.apiSecret = ''
    this.passphrase = ''
  }

  async listHoldings(): Promise<Holding[]> {
    if (!this.connected) {
      throw new Error('Not connected to Coinbase Pro')
    }

    try {
      // Fetch accounts
      const accounts = await this.makeAuthenticatedRequest('GET', '/accounts') as CoinbaseAccount[]
      
      // Fetch products for currency names
      const products = await this.makePublicRequest('GET', '/products') as CoinbaseProduct[]
      const productMap = new Map(products.map(p => [p.base_currency, p.display_name]))

      // Get current prices
      const pricePromises = accounts
        .filter(account => parseFloat(account.balance) > 0)
        .map(async (account) => {
          try {
            const ticker = await this.makePublicRequest('GET', `/products/${account.currency}-USD/ticker`)
            return { currency: account.currency, price: parseFloat(ticker.price || '0') }
          } catch {
            return { currency: account.currency, price: 0 }
          }
        })

      const prices = await Promise.all(pricePromises)
      const priceMap = new Map(prices.map(p => [p.currency, p.price]))

      const holdings: Holding[] = []

      for (const account of accounts) {
        const balance = parseFloat(account.balance)
        if (balance > 0) {
          const currentPrice = priceMap.get(account.currency) || 0
          const totalValue = balance * currentPrice

          holdings.push({
            symbol: account.currency,
            name: productMap.get(account.currency) || account.currency,
            quantity: balance,
            averageCost: currentPrice, // We don't have historical cost data from this endpoint
            currentPrice,
            totalValue,
            category: 'crypto',
            lastUpdated: new Date()
          })
        }
      }

      return holdings.sort((a, b) => b.totalValue - a.totalValue)
    } catch (error) {
      throw new Error(`Failed to fetch holdings: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async fetchTransactions(limit = 50): Promise<Transaction[]> {
    if (!this.connected) {
      throw new Error('Not connected to Coinbase Pro')
    }

    try {
      // Fetch fills (completed trades) for all products
      const fills = await this.makeAuthenticatedRequest('GET', `/fills?limit=${Math.min(limit, 100)}`) as CoinbaseFill[]

      const transactions: Transaction[] = fills.map(fill => ({
        id: `cb_${fill.trade_id}`,
        symbol: fill.product_id.split('-')[0], // Extract base currency
        type: fill.side,
        quantity: parseFloat(fill.size),
        price: parseFloat(fill.price),
        totalAmount: parseFloat(fill.size) * parseFloat(fill.price),
        fee: parseFloat(fill.fee),
        timestamp: new Date(fill.created_at),
        description: `${fill.side.toUpperCase()} ${fill.size} ${fill.product_id.split('-')[0]} at $${fill.price}`
      }))

      return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getConnectionStatus(): Promise<ConnectionStatus> {
    return {
      connected: this.connected,
      lastSync: this.lastSync
    }
  }

  private async makeAuthenticatedRequest(method: string, path: string, body?: any): Promise<any> {
    const timestamp = Date.now() / 1000
    const requestPath = path
    const bodyString = body ? JSON.stringify(body) : ''
    
    // Create signature
    const message = timestamp + method + requestPath + bodyString
    const signature = crypto
      .createHmac('sha256', Buffer.from(this.apiSecret, 'base64'))
      .update(message)
      .digest('base64')

    const headers = {
      'CB-ACCESS-KEY': this.apiKey,
      'CB-ACCESS-SIGN': signature,
      'CB-ACCESS-TIMESTAMP': timestamp.toString(),
      'CB-ACCESS-PASSPHRASE': this.passphrase,
      'Content-Type': 'application/json'
    }

    const response = await axios({
      method: method as any,
      url: this.baseUrl + path,
      headers,
      data: body,
      timeout: 10000
    })

    return response.data
  }

  private async makePublicRequest(method: string, path: string): Promise<any> {
    const response = await axios({
      method: method as any,
      url: this.baseUrl + path,
      timeout: 10000
    })

    return response.data
  }
}

/**
 * Factory function to create Coinbase adapter
 */
export function createCoinbaseAdapter(): CoinbaseAdapter {
  return new CoinbaseAdapter()
}
