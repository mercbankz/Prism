"use client"

import { motion } from 'framer-motion'
import { 
  Shield, 
  Brain, 
  Crown, 
  Trophy,
  Lock,
  Sparkles,
  Gamepad2,
  BookOpen
} from 'lucide-react'

const pillars = [
  {
    icon: Shield,
    title: 'Non-Custodial Privacy',
    description: 'Your keys, your assets. We never hold custody of your funds.',
    features: ['Read-only access', 'Encrypted storage', 'GDPR compliant'],
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0.1,
  },
  {
    icon: Brain,
    title: 'AI Portfolio Health',
    description: 'Real-time insights powered by advanced AI and live market data.',
    features: ['Health scoring', 'Risk analysis', 'Live data feeds'],
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.2,
  },
  {
    icon: Crown,
    title: 'Financial Chess',
    description: 'Master strategy through quarterly seasons of competitive gameplay.',
    features: ['Quarterly seasons', 'AI opponents', 'Strategy learning'],
    gradient: 'from-amber-500 to-orange-500',
    delay: 0.3,
  },
  {
    icon: Trophy,
    title: 'Gamified Learning',
    description: 'Earn badges and unlock rewards as you build financial literacy.',
    features: ['100+ badges', 'Progress tracking', 'Achievement rewards'],
    gradient: 'from-emerald-500 to-teal-500',
    delay: 0.4,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function ValuePillars() {
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
              Built for Modern Investors
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Four core pillars that make Prism the most comprehensive portfolio intelligence platform
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            
            return (
              <motion.div
                key={pillar.title}
                className="group relative"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-panel rounded-2xl p-8 h-full group-hover:glow-primary transition-all duration-300">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${pillar.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary-2/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-2xl font-bold text-fg group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-muted leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 pt-4">
                      {pillar.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: pillar.delay + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full" />
                          <span className="text-sm text-muted">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                </div>

                {/* Floating accent */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${pillar.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="font-heading text-2xl font-bold text-fg">
                Ready to Experience All Four?
              </h3>
            </div>
            <p className="text-muted mb-6">
              Join thousands of investors who are already using Prism to build wealth through education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl glow-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="glass-card border border-white/20 hover:bg-white/5 text-fg font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
