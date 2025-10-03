import { describe, it, expect, beforeEach } from 'vitest'
import { metricsService, formatMetricValue, getGrowthStats } from '@/lib/metrics'

describe('Metrics Service', () => {
  beforeEach(() => {
    // Reset any state if needed
  })

  it('should format large numbers correctly', () => {
    expect(formatMetricValue(1234)).toBe('1.2K')
    expect(formatMetricValue(1234567)).toBe('1.2M')
    expect(formatMetricValue(999)).toBe('999')
    expect(formatMetricValue(1000000)).toBe('1.0M')
  })

  it('should format values with suffix', () => {
    expect(formatMetricValue(1000, '+')).toBe('1.0K+')
    expect(formatMetricValue(500000, '%')).toBe('500.0K%')
  })

  it('should get initial metrics', () => {
    const metrics = metricsService.getMetrics()
    expect(metrics).toBeDefined()
    expect(metrics.length).toBeGreaterThan(0)
    
    const firstMetric = metrics[0]
    expect(firstMetric).toHaveProperty('id')
    expect(firstMetric).toHaveProperty('label')
    expect(firstMetric).toHaveProperty('value')
    expect(firstMetric).toHaveProperty('suffix')
    expect(firstMetric).toHaveProperty('growthRate')
  })

  it('should calculate growth stats', () => {
    const stats = getGrowthStats()
    expect(stats).toHaveProperty('totalGrowth')
    expect(stats).toHaveProperty('growthRate')
    expect(typeof stats.totalGrowth).toBe('number')
    expect(typeof stats.growthRate).toBe('number')
  })

  it('should have reasonable growth rates', () => {
    const metrics = metricsService.getMetrics()
    
    metrics.forEach(metric => {
      expect(metric.growthRate).toBeGreaterThanOrEqual(0)
      expect(metric.growthRate).toBeLessThan(100) // Reasonable upper bound
    })
  })

  it('should have valid metric values', () => {
    const metrics = metricsService.getMetrics()
    
    metrics.forEach(metric => {
      expect(metric.value).toBeGreaterThan(0)
      expect(typeof metric.value).toBe('number')
      expect(Number.isInteger(metric.value)).toBe(true)
    })
  })
})

describe('Metric Formatting Edge Cases', () => {
  it('should handle zero values', () => {
    expect(formatMetricValue(0)).toBe('0')
    expect(formatMetricValue(0, '+')).toBe('0+')
  })

  it('should handle negative values', () => {
    expect(formatMetricValue(-1000)).toBe('-1.0K')
    expect(formatMetricValue(-1000000)).toBe('-1.0M')
  })

  it('should handle very large numbers', () => {
    expect(formatMetricValue(999999999)).toBe('1000.0M')
  })
})
