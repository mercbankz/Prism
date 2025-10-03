/**
 * Integration Manager
 * Manages all portfolio integration adapters
 */

import { IntegrationAdapter } from './types'
import { createCoinbaseAdapter } from './coinbase'
import { createMetaMaskAdapter } from './metamask'
import { createFidelityAdapter } from './fidelity'
import { createBinanceAdapter } from './binance'

export type SupportedProvider = 'coinbase' | 'metamask' | 'fidelity' | 'binance' | 'kraken' | 'gemini' | 'etoro' | 'wealthfront' | 'ledger'

export class IntegrationManager {
  private adapters: Map<SupportedProvider, IntegrationAdapter> = new Map()

  constructor() {
    // Initialize available adapters
    this.adapters.set('coinbase', createCoinbaseAdapter())
    this.adapters.set('metamask', createMetaMaskAdapter())
    this.adapters.set('fidelity', createFidelityAdapter())
    this.adapters.set('binance', createBinanceAdapter())
    
    // TODO: Add other adapters as they're implemented
    // this.adapters.set('kraken', createKrakenAdapter())
    // this.adapters.set('gemini', createGeminiAdapter())
    // etc.
  }

  /**
   * Get adapter for a specific provider
   */
  getAdapter(provider: SupportedProvider): IntegrationAdapter | null {
    return this.adapters.get(provider) || null
  }

  /**
   * Get all available providers
   */
  getAvailableProviders(): SupportedProvider[] {
    return Array.from(this.adapters.keys())
  }

  /**
   * Get provider info for UI display
   */
  getProviderInfo(provider: SupportedProvider) {
    const providerInfo = {
      coinbase: {
        name: 'Coinbase Pro',
        description: 'Connect your Coinbase Pro account for crypto portfolio tracking',
        category: 'crypto',
        requiredCredentials: ['apiKey', 'apiSecret', 'passphrase'],
        website: 'https://pro.coinbase.com'
      },
      metamask: {
        name: 'MetaMask Wallet',
        description: 'Connect your MetaMask wallet for DeFi and NFT tracking',
        category: 'wallet',
        requiredCredentials: ['walletAddress'],
        website: 'https://metamask.io'
      },
      fidelity: {
        name: 'Fidelity Investments',
        description: 'Connect your Fidelity account for traditional investment tracking',
        category: 'broker',
        requiredCredentials: ['apiKey'],
        website: 'https://www.fidelity.com'
      },
      binance: {
        name: 'Binance',
        description: 'Connect your Binance account for crypto trading data',
        category: 'crypto',
        requiredCredentials: ['apiKey', 'apiSecret'],
        website: 'https://www.binance.com'
      },
      kraken: {
        name: 'Kraken',
        description: 'Connect your Kraken account for crypto portfolio analysis',
        category: 'crypto',
        requiredCredentials: ['apiKey', 'apiSecret'],
        website: 'https://www.kraken.com'
      },
      gemini: {
        name: 'Gemini',
        description: 'Connect your Gemini account for regulated crypto trading data',
        category: 'crypto',
        requiredCredentials: ['apiKey', 'apiSecret'],
        website: 'https://www.gemini.com'
      },
      etoro: {
        name: 'eToro',
        description: 'Connect your eToro account for social trading portfolio data',
        category: 'broker',
        requiredCredentials: ['apiKey'],
        website: 'https://www.etoro.com'
      },
      wealthfront: {
        name: 'Wealthfront',
        description: 'Connect your Wealthfront account for robo-advisor portfolio tracking',
        category: 'broker',
        requiredCredentials: ['apiKey'],
        website: 'https://www.wealthfront.com'
      },
      ledger: {
        name: 'Ledger Hardware Wallet',
        description: 'Connect your Ledger device for hardware wallet portfolio tracking',
        category: 'wallet',
        requiredCredentials: ['walletAddress'],
        website: 'https://www.ledger.com'
      }
    }

    return providerInfo[provider] || null
  }

  /**
   * Check if a provider is currently implemented
   */
  isProviderImplemented(provider: SupportedProvider): boolean {
    return this.adapters.has(provider)
  }
}

// Export singleton instance
export const integrationManager = new IntegrationManager()

// Re-export types for convenience
export * from './types'
