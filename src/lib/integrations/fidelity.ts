/**
 * Fidelity Integration Adapter (Mock Implementation)
 * READ-ONLY: For portfolio analysis only, no trading execution
 */

import { IntegrationAdapter, Holding, Transaction, ConnectionStatus, AdapterCredentials } from './types'

export class FidelityAdapter implements IntegrationAdapter {
  readonly name = 'Fidelity Investments'
  readonly provider = 'fidelity'
  readonly isReadOnly = true

  private connected = false
  private lastSync: Date | null = null

  async connect(credentials: AdapterCredentials): Promise<ConnectionStatus> {
    if (!credentials.apiKey) {
      return {
        connected: false,
        lastSync: null,
        error: 'API key is required for Fidelity connection'
      }
    }

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1200))

    this.connected = true
    this.lastSync = new Date()

    return {
      connected: true,
      lastSync: this.lastSync
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false
    this.lastSync = null
  }

  async listHoldings(): Promise<Holding[]> {
    if (!this.connected) {
      throw new Error('Not connected to Fidelity')
    }

    // Mock traditional investment holdings
    return [
      {
        symbol: 'FXAIX',
        name: 'Fidelity 500 Index Fund',
        quantity: 150.5,
        averageCost: 145.20,
        currentPrice: 158.75,
        totalValue: 23892.38,
        category: 'stock',
        lastUpdated: new Date()
      },
      {
        symbol: 'FTIHX',
        name: 'Fidelity Total International Index Fund',
        quantity: 200,
        averageCost: 42.10,
        currentPrice: 44.85,
        totalValue: 8970.00,
        category: 'stock',
        lastUpdated: new Date()
      },
      {
        symbol: 'FXNAX',
        name: 'Fidelity U.S. Bond Index Fund',
        quantity: 500,
        averageCost: 11.25,
        currentPrice: 10.95,
        totalValue: 5475.00,
        category: 'stock',
        lastUpdated: new Date()
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 50,
        averageCost: 165.30,
        currentPrice: 185.20,
        totalValue: 9260.00,
        category: 'stock',
        lastUpdated: new Date()
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        quantity: 25,
        averageCost: 285.40,
        currentPrice: 310.15,
        totalValue: 7753.75,
        category: 'stock',
        lastUpdated: new Date()
      },
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        quantity: 75,
        averageCost: 220.50,
        currentPrice: 235.80,
        totalValue: 17685.00,
        category: 'stock',
        lastUpdated: new Date()
      }
    ]
  }

  async fetchTransactions(limit = 50): Promise<Transaction[]> {
    if (!this.connected) {
      throw new Error('Not connected to Fidelity')
    }

    // Mock transaction data for traditional investments
    const transactions: Transaction[] = []
    const holdings = [
      { symbol: 'FXAIX', price: 158.75 },
      { symbol: 'FTIHX', price: 44.85 },
      { symbol: 'FXNAX', price: 10.95 },
      { symbol: 'AAPL', price: 185.20 },
      { symbol: 'MSFT', price: 310.15 },
      { symbol: 'VTI', price: 235.80 }
    ]

    for (let i = 0; i < Math.min(limit, 25); i++) {
      const holding = holdings[Math.floor(Math.random() * holdings.length)]
      const transactionTypes: ('buy' | 'sell' | 'dividend')[] = ['buy', 'sell', 'dividend']
      const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
      
      let quantity: number
      let price: number
      let totalAmount: number
      let fee: number

      if (type === 'dividend') {
        quantity = 0
        price = 0
        totalAmount = Math.random() * 100 + 10 // Dividend amount
        fee = 0
      } else {
        quantity = Math.random() * 50 + 1
        price = holding.price * (0.9 + Math.random() * 0.2) // Price variation
        totalAmount = quantity * price
        fee = type === 'buy' ? 0 : 4.95 // No fee for buys, $4.95 for sells
      }
      
      transactions.push({
        id: `fid_${Date.now()}_${i}`,
        symbol: holding.symbol,
        type,
        quantity,
        price,
        totalAmount,
        fee,
        timestamp: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
        description: type === 'dividend' 
          ? `Dividend payment for ${holding.symbol}`
          : `${type.toUpperCase()} ${quantity.toFixed(2)} shares of ${holding.symbol}`
      })
    }

    return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  async getConnectionStatus(): Promise<ConnectionStatus> {
    return {
      connected: this.connected,
      lastSync: this.lastSync
    }
  }
}

/**
 * Factory function to create Fidelity adapter
 */
export function createFidelityAdapter(): FidelityAdapter {
  return new FidelityAdapter()
}
