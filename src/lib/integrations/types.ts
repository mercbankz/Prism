/**
 * Common types for integration adapters
 */

export interface Holding {
  symbol: string
  name: string
  quantity: number
  averageCost: number
  currentPrice: number
  totalValue: number
  category: 'stock' | 'crypto' | 'commodity' | 'nft' | 'other'
  lastUpdated: Date
}

export interface Transaction {
  id: string
  symbol: string
  type: 'buy' | 'sell' | 'transfer' | 'dividend' | 'fee'
  quantity: number
  price: number
  totalAmount: number
  fee: number
  timestamp: Date
  description?: string
}

export interface ConnectionStatus {
  connected: boolean
  lastSync: Date | null
  error?: string
}

export interface IntegrationAdapter {
  readonly name: string
  readonly provider: string
  readonly isReadOnly: true // Always read-only for security
  
  connect(credentials: Record<string, string>): Promise<ConnectionStatus>
  disconnect(): Promise<void>
  listHoldings(): Promise<Holding[]>
  fetchTransactions(limit?: number): Promise<Transaction[]>
  getConnectionStatus(): Promise<ConnectionStatus>
}

export interface AdapterCredentials {
  apiKey?: string
  apiSecret?: string
  passphrase?: string
  walletAddress?: string
  [key: string]: string | undefined
}
