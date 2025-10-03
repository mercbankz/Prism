/**
 * Live metrics and counter system for Prism marketing site
 * Simulates real-time growth with smooth animations
 */

import { useState, useEffect } from 'react'

export interface Metric {
  id: string
  label: string
  value: number
  suffix: string
  icon: string
  growthRate: number // per minute
}

export const defaultMetrics: Metric[] = [
  {
    id: 'portfolios-analyzed',
    label: 'Portfolios Analyzed',
    value: 61400,
    suffix: '+',
    icon: '📊',
    growthRate: 0.5 // 0.5 portfolios per minute
  },
  {
    id: 'badges-earned',
    label: 'Badges Earned',
    value: 190500,
    suffix: '+',
    icon: '🏆',
    growthRate: 2.3 // 2.3 badges per minute
  },
  {
    id: 'books-completed',
    label: 'Books Completed',
    value: 30000,
    suffix: '+',
    icon: '📚',
    growthRate: 0.8 // 0.8 books per minute
  },
  {
    id: 'ai-insights',
    label: 'AI Insights Generated',
    value: 125000,
    suffix: '+',
    icon: '🤖',
    growthRate: 5.2 // 5.2 insights per minute
  },
  {
    id: 'chess-games',
    label: 'Chess Games Played',
    value: 45000,
    suffix: '+',
    icon: '♟️',
    growthRate: 1.1 // 1.1 games per minute
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: 8500,
    suffix: '+',
    icon: '👥',
    growthRate: 0.2 // 0.2 users per minute
  }
]

class MetricsService {
  private metrics: Metric[]
  private startTime: number
  private subscribers: ((metrics: Metric[]) => void)[] = []

  constructor(initialMetrics: Metric[] = defaultMetrics) {
    this.metrics = initialMetrics.map(metric => ({ ...metric }))
    this.startTime = Date.now()
    
    // Start the growth simulation
    this.startGrowthSimulation()
  }

  private startGrowthSimulation() {
    setInterval(() => {
      this.updateMetrics()
      this.notifySubscribers()
    }, 1000) // Update every second
  }

  private updateMetrics() {
    const now = Date.now()
    const minutesElapsed = (now - this.startTime) / (1000 * 60)

    this.metrics = this.metrics.map(metric => {
      const growth = minutesElapsed * metric.growthRate
      return {
        ...metric,
        value: Math.floor(metric.value + growth)
      }
    })
  }

  public getMetrics(): Metric[] {
    return this.metrics.map(metric => ({ ...metric }))
  }

  public subscribe(callback: (metrics: Metric[]) => void) {
    this.subscribers.push(callback)
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.getMetrics()))
  }

  public formatValue(value: number, suffix: string): string {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${suffix}`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${suffix}`
    } else {
      return `${value.toLocaleString()}${suffix}`
    }
  }

  public getGrowthRate(metricId: string): number {
    const metric = this.metrics.find(m => m.id === metricId)
    return metric?.growthRate || 0
  }

  public getTotalGrowth(): number {
    const now = Date.now()
    const minutesElapsed = (now - this.startTime) / (1000 * 60)
    
    return this.metrics.reduce((total, metric) => {
      return total + (minutesElapsed * metric.growthRate)
    }, 0)
  }
}

// Singleton instance
export const metricsService = new MetricsService()

// Hook for React components
export function useMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>(metricsService.getMetrics())
  
  useEffect(() => {
    const unsubscribe = metricsService.subscribe(setMetrics)
    return unsubscribe
  }, [])
  
  return metrics
}

// Utility functions
export function formatMetricValue(value: number, suffix: string = ''): string {
  return metricsService.formatValue(value, suffix)
}

export function getGrowthStats(): { totalGrowth: number; growthRate: number } {
  const totalGrowth = metricsService.getTotalGrowth()
  const growthRate = metricsService.getMetrics().reduce((sum, metric) => sum + metric.growthRate, 0)
  
  return { totalGrowth, growthRate }
}

// Mock API endpoints for server-side rendering
export async function getMetricsSSR(): Promise<Metric[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return metricsService.getMetrics()
}

export async function getMetricById(id: string): Promise<Metric | null> {
  await new Promise(resolve => setTimeout(resolve, 50))
  return metricsService.getMetrics().find(metric => metric.id === id) || null
}
