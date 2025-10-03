"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMetrics, formatMetricValue } from '@/lib/metrics'
import { TrendingUp, Users, BookOpen, Trophy, Bot, Crown } from 'lucide-react'

const iconMap = {
  '📊': TrendingUp,
  '🏆': Trophy,
  '📚': BookOpen,
  '🤖': Bot,
  '♟️': Crown,
  '👥': Users,
}

interface StatCardProps {
  metric: {
    id: string
    label: string
    value: number
    suffix: string
    icon: string
    growthRate: number
  }
  index: number
}

function StatCard({ metric, index }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(metric.value)
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp

  useEffect(() => {
    // Animate to current value
    const startValue = metric.value - (metric.growthRate * 10) // Start from 10 minutes ago
    const endValue = metric.value
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOutCubic
      
      setDisplayValue(Math.floor(currentValue))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [metric.value, metric.growthRate])

  return (
    <motion.div
      className="glass-card rounded-xl p-6 min-w-[200px] group hover:glow-primary transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-xs text-muted font-medium">
            +{metric.growthRate.toFixed(1)}/min
          </div>
          <div className="text-xs text-primary font-semibold">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Live
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-fg font-heading">
          {formatMetricValue(displayValue, metric.suffix)}
        </div>
        <div className="text-sm text-muted">
          {metric.label}
        </div>
      </div>

      {/* Growth indicator */}
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: index * 0.2 }}
          />
        </div>
        <span className="text-xs text-muted">
          Growing
        </span>
      </div>
    </motion.div>
  )
}

export function LiveStatsMarquee() {
  const metrics = useMetrics()
  const [currentMetrics, setCurrentMetrics] = useState(metrics)

  useEffect(() => {
    setCurrentMetrics(metrics)
  }, [metrics])

  return (
    <section className="py-20 bg-gradient-radial-primary/20">
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
              Growing Together
            </span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Real-time metrics showing our community's progress in building wealth through education
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentMetrics.slice(0, 6).map((metric, index) => (
            <StatCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>

        {/* Marquee Animation */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-6 animate-marquee">
            {[...currentMetrics, ...currentMetrics].map((metric, index) => (
              <motion.div
                key={`${metric.id}-${index}`}
                className="flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass-card rounded-lg p-4 min-w-[150px] text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                      {React.createElement(
                        iconMap[metric.icon as keyof typeof iconMap] || TrendingUp,
                        { className: 'w-4 h-4 text-white' }
                      )}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-fg font-heading">
                    {formatMetricValue(metric.value, metric.suffix)}
                  </div>
                  <div className="text-xs text-muted">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Indicator */}
        <motion.div
          className="flex items-center justify-center space-x-2 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted font-medium">
            Live data • Updated every minute
          </span>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
