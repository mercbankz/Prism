"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Play, 
  Sparkles,
  TrendingUp,
  Crown,
  Zap
} from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-radial-primary opacity-20 blur-3xl" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial-accent opacity-15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial-primary opacity-10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Main CTA */}
          <div className="glass-panel rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid-pattern" />
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-fg">
                  Join 8,500+ Investors
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="text-fg">Build your edge.</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Not your spreadsheet.
                </span>
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                className="text-xl sm:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Stop managing spreadsheets and start mastering your portfolio with AI-powered insights, 
                gamified learning, and real-time market intelligence.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-10 py-6 text-lg glow-primary group"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-card border-white/20 hover:bg-white/5 text-fg font-semibold px-10 py-6 text-lg group"
                  >
                    <span className="flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>See Live Demo</span>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-fg mb-2">AI-Powered Analytics</h3>
                  <p className="text-sm text-muted">Real-time insights and portfolio health scoring</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-fg mb-2">Gamified Learning</h3>
                  <p className="text-sm text-muted">Master strategy through Financial Chess and badges</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-fg mb-2">Non-Custodial Security</h3>
                  <p className="text-sm text-muted">Your keys, your assets, your control</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-fg mb-1">$0</div>
              <div className="text-sm text-muted">Setup Cost</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-fg mb-1">5 min</div>
              <div className="text-sm text-muted">Setup Time</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-fg mb-1">24/7</div>
              <div className="text-sm text-muted">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
