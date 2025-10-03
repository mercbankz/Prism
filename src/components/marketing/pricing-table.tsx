"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Check, 
  Star, 
  Crown, 
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react'

const features = [
  'AI Portfolio Assistant with expanded datasets',
  'Portfolio dashboard with line chart tracking (1M/3M/6M/1Y)',
  'Financial Chess game (quarterly seasons, AI opponent)',
  'Education Library: AI, Strategy, Macro, Modern Investing',
  'Gamification: 100+ badges, referral rewards, ambassador program',
  'Export tools: CSV, PDF, JSON',
  'Security: 2FA, privacy-first, non-custodial',
  'Priority support & advanced integrations',
  'Custom portfolio alerts & notifications',
  'Real-time market news & sentiment analysis',
]

export function PricingTable() {
  return (
    <section className="py-20">
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
              Simple Pricing
            </span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
            One powerful plan with everything you need to master your portfolio
          </p>
          
          {/* Founder Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-fg">
              Founder Launch — 25% off first month
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial-primary opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial-accent opacity-15 blur-3xl" />
            
            {/* Ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-primary text-white px-6 py-2 rounded-bl-2xl rounded-tr-3xl">
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-semibold">Most Popular</span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-3xl font-bold text-fg">Prism Pro</h3>
              </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-5xl font-bold text-fg">$150</span>
                    <div className="text-left">
                      <div className="text-lg text-muted line-through">$200</div>
                      <div className="text-sm text-primary font-medium">25% off</div>
                    </div>
                  </div>
                  <p className="text-muted">per month • Cancel anytime</p>
                </div>

                <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
                  The complete Prism experience with AI-powered portfolio intelligence, 
                  Financial Chess, expanded datasets, and premium features.
                </p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg glow-primary"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-card border-white/20 hover:bg-white/5 text-fg font-semibold px-8 py-6 text-lg"
                  >
                    View Live Demo
                  </Button>
                </motion.div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-fg font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Disclaimer */}
              <motion.div
                className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-medium text-fg">Important Notice</span>
                </div>
                <p className="text-sm text-muted">
                  Cancel anytime • Educational use only • No trading execution • 
                  Past performance does not guarantee future results
                </p>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-fg mb-1">Instant Setup</h4>
                    <p className="text-sm text-muted">Get started in minutes</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-fg mb-1">Educational Only</h4>
                    <p className="text-sm text-muted">No trading execution</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-fg mb-1">Cancel Anytime</h4>
                    <p className="text-sm text-muted">No long-term contracts</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Compare Plans (Hidden by default) */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="text-sm text-muted hover:text-primary transition-colors">
            Compare with other plans →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
