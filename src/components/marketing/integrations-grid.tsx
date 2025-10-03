"use client"

import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Shield, 
  Eye, 
  Lock,
  TrendingUp,
  Coins,
  CreditCard,
  Building2,
  Wallet,
  Banknote
} from 'lucide-react'

const integrations = [
  {
    name: 'Coinbase Pro',
    category: 'Cryptocurrency',
    icon: Coins,
    status: 'connected',
    description: 'Professional crypto trading platform',
    features: ['Spot trading', 'Advanced charts', 'API access'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Binance',
    category: 'Cryptocurrency',
    icon: Coins,
    status: 'available',
    description: 'Global crypto exchange',
    features: ['Spot & futures', 'DeFi integration', 'High liquidity'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'MetaMask',
    category: 'Web3 Wallet',
    icon: Wallet,
    status: 'available',
    description: 'Browser-based Ethereum wallet',
    features: ['DeFi access', 'NFT support', 'Multi-chain'],
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Kraken',
    category: 'Cryptocurrency',
    icon: Coins,
    status: 'available',
    description: 'Secure crypto exchange',
    features: ['High security', 'Staking rewards', 'Fiat on-ramps'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Ledger',
    category: 'Hardware Wallet',
    icon: Shield,
    status: 'available',
    description: 'Hardware wallet integration',
    features: ['Cold storage', 'Multi-currency', 'Secure backup'],
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Gemini',
    category: 'Cryptocurrency',
    icon: Coins,
    status: 'available',
    description: 'Regulated crypto exchange',
    features: ['US regulated', 'Institutional grade', 'Insurance'],
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Fidelity',
    category: 'Traditional Finance',
    icon: Building2,
    status: 'available',
    description: 'Investment and retirement services',
    features: ['401k accounts', 'Mutual funds', 'ETFs'],
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'eToro',
    category: 'Social Trading',
    icon: TrendingUp,
    status: 'available',
    description: 'Social trading platform',
    features: ['Copy trading', 'Social features', 'CFDs'],
    color: 'from-teal-500 to-teal-600',
  },
  {
    name: 'Wealthfront',
    category: 'Robo-Advisor',
    icon: Banknote,
    status: 'available',
    description: 'Automated investment management',
    features: ['Tax optimization', 'Rebalancing', 'Low fees'],
    color: 'from-emerald-500 to-emerald-600',
  },
]

export function IntegrationsGrid() {
  return (
    <section className="py-20 bg-gradient-radial-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fg mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Connect Everything
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
            Secure, read-only integrations with the platforms you already use. Your assets stay in your custody.
          </p>
          
          {/* Security Notice */}
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-fg">Read-only • No custody • Encrypted</span>
          </div>
        </motion.div>

        {/* Integrations Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {integrations.map((integration, index) => {
            const Icon = integration.icon
            
            return (
              <motion.div
                key={integration.name}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="glass-panel rounded-xl p-6 h-full group-hover:glow-primary transition-all duration-300 cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {integration.status === 'connected' ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-green-500 font-medium">Connected</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-muted" />
                          <span className="text-xs text-muted">Read-only</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-fg group-hover:text-primary transition-colors">
                        {integration.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {integration.category}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted leading-relaxed">
                      {integration.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1">
                      {integration.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gradient-primary rounded-full" />
                          <span className="text-xs text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button className="flex items-center justify-between w-full text-sm font-medium text-muted hover:text-primary transition-colors">
                      <span>View Documentation</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute inset-0 glass-card rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-fg">Security Notice</span>
                    </div>
                    <p className="text-xs text-muted">
                      Read-only access. We never hold custody of your assets. All API keys are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-fg mb-4">
              Don't see your platform?
            </h3>
            <p className="text-muted mb-6">
              We're constantly adding new integrations. Request your platform and we'll prioritize it for our roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl glow-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Integration
              </motion.button>
              <motion.button
                className="glass-card border border-white/20 hover:bg-white/5 text-fg font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Integrations
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
