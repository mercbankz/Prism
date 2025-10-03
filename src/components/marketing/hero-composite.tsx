"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import NeonRing from '@/components/canvas/NeonRing'
import { Logo } from '@/components/shared/Logo'
import Link from 'next/link'

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

const productScreenshots = [
  {
    title: 'Portfolio Dashboard',
    description: 'Real-time analytics with AI insights',
    image: '/screenshots/dashboard.png',
    delay: 0.1,
  },
  {
    title: 'Prism AI Assistant',
    description: 'Live market data & analysis',
    image: '/screenshots/ai.png',
    delay: 0.2,
  },
  {
    title: 'Financial Chess',
    description: 'Strategy meets gameplay',
    image: '/screenshots/chess.png',
    delay: 0.3,
  },
]

export function HeroComposite() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NeonRing size={600} glowIntensity={0.8} />
        </div>
        
        {/* Large Logo Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <Logo size="xl" variant="gold" animated={false} />
        </div>
        
        {/* Additional glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial-accent opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial-primary opacity-15 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-full"
              variants={itemVariants}
            >
              <Logo size="sm" variant="default" animated={false} />
              <span className="text-sm font-medium text-fg">
                AI Portfolio Intelligence
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  One dashboard.
                </span>
                <br />
                <span className="text-fg">
                  Infinite clarity.
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted max-w-2xl leading-relaxed">
                Prism unifies your holdings, scores your portfolio health, and turns strategy into a game.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg glow-primary"
                asChild
              >
                <Link href="/api/auth/signin" className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="glass-card border-white/20 hover:bg-white/5 text-fg font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link href="/demo" className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Live Demo</span>
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div className="flex items-center space-x-6 pt-8" variants={itemVariants}>
              <div className="text-center">
                <div className="text-2xl font-bold text-fg">61,400+</div>
                <div className="text-sm text-muted">Portfolios Analyzed</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-fg">190,500+</div>
                <div className="text-sm text-muted">Badges Earned</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-fg">30,000+</div>
                <div className="text-sm text-muted">Books Completed</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Product Screenshots */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative space-y-6">
              {productScreenshots.map((screenshot, index) => (
                <motion.div
                  key={screenshot.title}
                  className="group relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: screenshot.delay }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="glass-panel rounded-2xl p-6 group-hover:glow-primary transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-fg">
                          {screenshot.title}
                        </h3>
                        <p className="text-sm text-muted">
                          {screenshot.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Placeholder for screenshot */}
                    <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center border border-white/10">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted">
                          {screenshot.title} Preview
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10" />
                </motion.div>
              ))}
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-2/20 rounded-full"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
