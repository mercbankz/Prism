import { NextResponse } from 'next/server'

// Mock real-time metrics with base values and growth simulation
const BASE_METRICS = {
  portfoliosAnalyzed: 61400,
  badgesEarned: 190500,
  booksCompleted: 30000,
  activeUsers: 12500
}

// Growth rates (per hour)
const GROWTH_RATES = {
  portfoliosAnalyzed: 12, // ~12 new portfolios per hour
  badgesEarned: 35,       // ~35 new badges per hour
  booksCompleted: 8,      // ~8 new books completed per hour
  activeUsers: 3          // ~3 new active users per hour
}

// Calculate current metrics based on time elapsed since launch
function getCurrentMetrics() {
  const launchDate = new Date('2024-01-01T00:00:00Z') // App launch date
  const now = new Date()
  const hoursElapsed = (now.getTime() - launchDate.getTime()) / (1000 * 60 * 60)
  
  return {
    portfoliosAnalyzed: Math.floor(BASE_METRICS.portfoliosAnalyzed + (GROWTH_RATES.portfoliosAnalyzed * hoursElapsed)),
    badgesEarned: Math.floor(BASE_METRICS.badgesEarned + (GROWTH_RATES.badgesEarned * hoursElapsed)),
    booksCompleted: Math.floor(BASE_METRICS.booksCompleted + (GROWTH_RATES.booksCompleted * hoursElapsed)),
    activeUsers: Math.floor(BASE_METRICS.activeUsers + (GROWTH_RATES.activeUsers * hoursElapsed))
  }
}

export async function GET() {
  try {
    const metrics = getCurrentMetrics()
    
    // Add some randomness to make it feel more live (±5% variance)
    const addVariance = (value: number) => {
      const variance = 0.05 // 5% variance
      const randomFactor = 1 + (Math.random() - 0.5) * variance
      return Math.floor(value * randomFactor)
    }
    
    const liveMetrics = {
      portfoliosAnalyzed: addVariance(metrics.portfoliosAnalyzed),
      badgesEarned: addVariance(metrics.badgesEarned),
      booksCompleted: addVariance(metrics.booksCompleted),
      activeUsers: addVariance(metrics.activeUsers),
      lastUpdated: new Date().toISOString(),
      growthRates: GROWTH_RATES
    }
    
    return NextResponse.json(liveMetrics)
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(BASE_METRICS, { status: 500 })
  }
}



