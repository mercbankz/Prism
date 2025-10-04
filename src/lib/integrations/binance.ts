/**
 * Binance Integration Adapter (Live Implementation)
 * READ-ONLY: For portfolio analysis only, no trading execution
 */

import crypto from 'crypto'
import axios from 'axios'
import { IntegrationAdapter, Holding, Transaction, ConnectionStatus, AdapterCredentials } from './types'

interface BinanceAccountInfo {
  makerCommission: number
  takerCommission: number
  buyerCommission: number
  sellerCommission: number
  canTrade: boolean
  canWithdraw: boolean
  canDeposit: boolean
  updateTime: number
  accountType: string
  balances: BinanceBalance[]
}

interface BinanceBalance {
  asset: string
  free: string
  locked: string
}

interface BinanceTrade {
  symbol: string
  id: number
  orderId: number
  orderListId: number
  price: string
  qty: string
  quoteQty: string
  commission: string
  commissionAsset: string
  time: number
  isBuyer: boolean
  isMaker: boolean
  isBestMatch: boolean
}

interface BinancePrice {
  symbol: string
  price: string
}

export class BinanceAdapter implements IntegrationAdapter {
  readonly name = 'Binance'
  readonly provider = 'binance'
  readonly isReadOnly = true

  private connected = false
  private lastSync: Date | null = null
  private apiKey: string = ''
  private apiSecret: string = ''
  private baseUrl = 'https://api.binance.com'

  async connect(credentials: AdapterCredentials): Promise<ConnectionStatus> {
    if (!credentials.apiKey || !credentials.apiSecret) {
      return {
        connected: false,
        lastSync: null,
        error: 'Missing required credentials: apiKey, apiSecret'
      }
    }

    this.apiKey = credentials.apiKey
    this.apiSecret = credentials.apiSecret

    try {
      // Test connection by fetching account info
      await this.makeAuthenticatedRequest('GET', '/api/v3/account')
      
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
        error: error instanceof Error ? error.message : 'Failed to connect to Binance'
      }
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false
    this.lastSync = null
    this.apiKey = ''
    this.apiSecret = ''
  }

  async listHoldings(): Promise<Holding[]> {
    if (!this.connected) {
      throw new Error('Not connected to Binance')
    }

    try {
      // Fetch account info
      const accountInfo = await this.makeAuthenticatedRequest('GET', '/api/v3/account') as BinanceAccountInfo
      
      // Get current prices for all symbols
      const prices = await this.makePublicRequest('GET', '/api/v3/ticker/price') as BinancePrice[]
      const priceMap = new Map(prices.map(p => [p.symbol, parseFloat(p.price)]))

      const holdings: Holding[] = []

      for (const balance of accountInfo.balances) {
        const totalBalance = parseFloat(balance.free) + parseFloat(balance.locked)
        
        if (totalBalance > 0) {
          // Try to get USD price
          let currentPrice = 0
          const usdSymbol = `${balance.asset}USDT`
          
          if (priceMap.has(usdSymbol)) {
            currentPrice = priceMap.get(usdSymbol) || 0
          } else {
            // Try BUSD or other stablecoins
            const altSymbols = [`${balance.asset}BUSD`, `${balance.asset}USDC`]
            for (const symbol of altSymbols) {
              if (priceMap.has(symbol)) {
                currentPrice = priceMap.get(symbol) || 0
                break
              }
            }
          }

          // Special case for stablecoins
          if (['USDT', 'BUSD', 'USDC', 'DAI'].includes(balance.asset)) {
            currentPrice = 1
          }

          const totalValue = totalBalance * currentPrice

          if (totalValue > 0.01) { // Only include holdings worth more than $0.01
            holdings.push({
              symbol: balance.asset,
              name: balance.asset,
              quantity: totalBalance,
              averageCost: currentPrice, // We don't have historical cost data
              currentPrice,
              totalValue,
              category: 'crypto',
              lastUpdated: new Date()
            })
          }
        }
      }

      return holdings.sort((a, b) => b.totalValue - a.totalValue)
    } catch (error) {
      throw new Error(`Failed to fetch holdings: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async fetchTransactions(limit = 50): Promise<Transaction[]> {
    if (!this.connected) {
      throw new Error('Not connected to Binance')
    }

    try {
      // Get account info to find symbols with balances
      const accountInfo = await this.makeAuthenticatedRequest('GET', '/api/v3/account') as BinanceAccountInfo
      const activeAssets = accountInfo.balances
        .filter(b => parseFloat(b.free) + parseFloat(b.locked) > 0)
        .map(b => b.asset)
        .slice(0, 10) // Limit to top 10 assets to avoid too many API calls

      const allTrades: Transaction[] = []

      // Fetch trades for each active asset (paired with USDT)
      for (const asset of activeAssets) {
        if (asset === 'USDT') continue // Skip USDT itself
        
        const symbol = `${asset}USDT`
        try {
          const trades = await this.makeAuthenticatedRequest('GET', `/api/v3/myTrades?symbol=${symbol}&limit=${Math.min(limit, 20)}`) as BinanceTrade[]
          
          for (const trade of trades) {
            allTrades.push({
              id: `bn_${trade.id}`,
              symbol: asset,
              type: trade.isBuyer ? 'buy' : 'sell',
              quantity: parseFloat(trade.qty),
              price: parseFloat(trade.price),
              totalAmount: parseFloat(trade.quoteQty),
              fee: parseFloat(trade.commission),
              timestamp: new Date(trade.time),
              description: `${trade.isBuyer ? 'BUY' : 'SELL'} ${trade.qty} ${asset} at $${trade.price}`
            })
          }
        } catch (error) {
          // Skip this symbol if we can't fetch trades (might not exist)
          console.warn(`Could not fetch trades for ${symbol}:`, error)
        }
      }

      return allTrades
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit)
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

  private async makeAuthenticatedRequest(method: string, path: string, params?: Record<string, any>): Promise<any> {
    const timestamp = Date.now()
    const queryString = new URLSearchParams({
      ...params,
      timestamp: timestamp.toString()
    }).toString()

    // Create signature
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString)
      .digest('hex')

    const finalQueryString = `${queryString}&signature=${signature}`

    const headers = {
      'X-MBX-APIKEY': this.apiKey,
      'Content-Type': 'application/json'
    }

    const response = await axios({
      method: method as any,
      url: `${this.baseUrl}${path}?${finalQueryString}`,
      headers,
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
 * Factory function to create Binance adapter
 */
export function createBinanceAdapter(): BinanceAdapter {
  return new BinanceAdapter()
}
