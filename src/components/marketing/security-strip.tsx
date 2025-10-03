"use client"

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  Download,
  CheckCircle,
  Server,
  Key,
  Database
} from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'We never hold custody of your assets or private keys',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Eye,
    title: 'Read-Only Access',
    description: 'All integrations are read-only. No trading execution.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Key,
    title: 'Encryption at Rest',
    description: 'All sensitive data encrypted with AES-256',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'GDPR Compliant',
    description: 'Export or delete your data anytime',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Server,
    title: 'SOC 2 Type II',
    description: 'Enterprise-grade security standards',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: CheckCircle,
    title: 'HTTPS Everywhere',
    description: 'All connections secured with SSL/TLS',
    color: 'from-teal-500 to-green-500',
  },
]

export function SecurityStrip() {
  return (
    <section className="py-16 bg-gradient-radial-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-fg mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Security First
            </span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Your privacy and security are our top priorities. Here's how we protect your data.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.title}
                className="glass-card rounded-xl p-6 text-center group hover:glow-primary transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-heading text-lg font-bold text-fg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="mt-12 glass-panel rounded-2xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-heading text-xl font-bold text-fg mb-3">
                Security Guarantee
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                Prism is built with security as the foundation. We use industry-standard encryption, 
                maintain read-only access to your accounts, and never store your private keys or 
                trading credentials. Your assets remain in your custody at all times.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted">No custody of assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted">Read-only API access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted">Encrypted data storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted">GDPR compliant</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
