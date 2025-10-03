/**
 * MetaMask Integration Adapter (Live Implementation)
 * READ-ONLY: For portfolio analysis only, no transaction execution
 */

import { Web3 } from 'web3'
import axios from 'axios'
import { IntegrationAdapter, Holding, Transaction, ConnectionStatus, AdapterCredentials } from './types'

interface EtherscanTransaction {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  gasUsed: string
  isError: string
}

interface TokenBalance {
  contractAddress: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  balance: string
}

interface CoinGeckoPrice {
  [key: string]: {
    usd: number
  }
}

export class MetaMaskAdapter implements IntegrationAdapter {
  readonly name = 'MetaMask Wallet'
  readonly provider = 'metamask'
  readonly isReadOnly = true

  private connected = false
  private lastSync: Date | null = null
  private walletAddress: string | null = null
  private web3: Web3 | null = null

  async connect(credentials: AdapterCredentials): Promise<ConnectionStatus> {
    if (!credentials.walletAddress) {
      return {
        connected: false,
        lastSync: null,
        error: 'Wallet address is required'
      }
    }

    // Validate wallet address format
    if (!credentials.walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      return {
        connected: false,
        lastSync: null,
        error: 'Invalid Ethereum wallet address format'
      }
    }

    try {
      // Initialize Web3 with public RPC
      this.web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/demo') // Using demo endpoint
      
      // Test by fetching balance
      const balance = await this.web3.eth.getBalance(credentials.walletAddress)
      
      this.connected = true
      this.lastSync = new Date()
      this.walletAddress = credentials.walletAddress

      return {
        connected: true,
        lastSync: this.lastSync
      }
    } catch (error) {
      this.connected = false
      return {
        connected: false,
        lastSync: null,
        error: error instanceof Error ? error.message : 'Failed to connect to wallet'
      }
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false
    this.lastSync = null
    this.walletAddress = null
    this.web3 = null
  }

  async listHoldings(): Promise<Holding[]> {
    if (!this.connected || !this.walletAddress || !this.web3) {
      throw new Error('Not connected to MetaMask')
    }

    try {
      const holdings: Holding[] = []

      // Get ETH balance
      const ethBalance = await this.web3.eth.getBalance(this.walletAddress)
      const ethAmount = parseFloat(this.web3.utils.fromWei(ethBalance, 'ether'))

      if (ethAmount > 0) {
        // Get ETH price
        const ethPrice = await this.getTokenPrice('ethereum')
        
        holdings.push({
          symbol: 'ETH',
          name: 'Ethereum',
          quantity: ethAmount,
          averageCost: ethPrice,
          currentPrice: ethPrice,
          totalValue: ethAmount * ethPrice,
          category: 'crypto',
          lastUpdated: new Date()
        })
      }

      // Get ERC-20 token balances using Etherscan API
      try {
        const tokenBalances = await this.getTokenBalances(this.walletAddress)
        
        for (const token of tokenBalances) {
          const balance = parseFloat(token.balance) / Math.pow(10, parseInt(token.tokenDecimal))
          
          if (balance > 0) {
            // Get token price from CoinGecko
            const price = await this.getTokenPriceBySymbol(token.tokenSymbol.toLowerCase())
            
            holdings.push({
              symbol: token.tokenSymbol,
              name: token.tokenName,
              quantity: balance,
              averageCost: price,
              currentPrice: price,
              totalValue: balance * price,
              category: 'crypto',
              lastUpdated: new Date()
            })
          }
        }
      } catch (error) {
        console.warn('Could not fetch token balances:', error)
      }

      return holdings.sort((a, b) => b.totalValue - a.totalValue)
    } catch (error) {
      throw new Error(`Failed to fetch holdings: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async fetchTransactions(limit = 50): Promise<Transaction[]> {
    if (!this.connected || !this.walletAddress) {
      throw new Error('Not connected to MetaMask')
    }

    try {
      // Fetch transactions using Etherscan API
      const etherscanApiKey = process.env.ETHERSCAN_API_KEY || 'YourApiKeyToken'
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${this.walletAddress}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=${etherscanApiKey}`,
        { timeout: 10000 }
      )

      if (response.data.status !== '1') {
        throw new Error('Failed to fetch transactions from Etherscan')
      }

      const transactions: Transaction[] = response.data.result.map((tx: EtherscanTransaction) => {
        const value = parseFloat(this.web3!.utils.fromWei(tx.value, 'ether'))
        const gasUsed = parseFloat(this.web3!.utils.fromWei((BigInt(tx.gasUsed) * BigInt(tx.gasPrice)).toString(), 'ether'))
        const isOutgoing = tx.from.toLowerCase() === this.walletAddress!.toLowerCase()

        return {
          id: `mm_${tx.hash}`,
          symbol: 'ETH',
          type: isOutgoing ? 'sell' : 'buy',
          quantity: value,
          price: 0, // We don't have historical price data
          totalAmount: value,
          fee: gasUsed,
          timestamp: new Date(parseInt(tx.timeStamp) * 1000),
          description: `${isOutgoing ? 'Sent' : 'Received'} ${value.toFixed(6)} ETH`
        }
      })

      return transactions.filter(tx => tx.quantity > 0)
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

  private async getTokenBalances(address: string): Promise<TokenBalance[]> {
    try {
      const etherscanApiKey = process.env.ETHERSCAN_API_KEY || 'YourApiKeyToken'
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=tokenlist&address=${address}&apikey=${etherscanApiKey}`,
        { timeout: 10000 }
      )

      if (response.data.status === '1') {
        return response.data.result.slice(0, 20) // Limit to top 20 tokens
      }
      return []
    } catch (error) {
      console.warn('Could not fetch token balances:', error)
      return []
    }
  }

  private async getTokenPrice(coinId: string): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
        { timeout: 5000 }
      )
      
      const data = response.data as CoinGeckoPrice
      return data[coinId]?.usd || 0
    } catch (error) {
      console.warn(`Could not fetch price for ${coinId}:`, error)
      return 0
    }
  }

  private async getTokenPriceBySymbol(symbol: string): Promise<number> {
    try {
      // Map common symbols to CoinGecko IDs
      const symbolMap: Record<string, string> = {
        'usdc': 'usd-coin',
        'usdt': 'tether',
        'dai': 'dai',
        'uni': 'uniswap',
        'link': 'chainlink',
        'aave': 'aave',
        'comp': 'compound-governance-token',
        'mkr': 'maker',
        'snx': 'havven',
        'crv': 'curve-dao-token'
      }

      const coinId = symbolMap[symbol] || symbol
      return await this.getTokenPrice(coinId)
    } catch (error) {
      console.warn(`Could not fetch price for symbol ${symbol}:`, error)
      return 0
    }
  }
}

/**
 * Factory function to create MetaMask adapter
 */
export function createMetaMaskAdapter(): MetaMaskAdapter {
  return new MetaMaskAdapter()
}
