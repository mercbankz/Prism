import { NextRequest, NextResponse } from 'next/server'

// Mock badge data - no database required
const mockBadges = [
  { id: '1', slug: 'first-login', tier: 'bronze', title: 'Welcome Aboard', description: 'Complete your first login', points: 10 },
  { id: '2', slug: 'portfolio-setup', tier: 'silver', title: 'Portfolio Pioneer', description: 'Set up your first portfolio', points: 25 },
  { id: '3', slug: 'dashboard-visitor', tier: 'bronze', title: 'Dashboard Explorer', description: 'Visit the dashboard 10 times', points: 15 },
  { id: '4', slug: 'ai-enthusiast', tier: 'gold', title: 'AI Enthusiast', description: 'Ask 50 questions to the AI Assistant', points: 50 },
  { id: '5', slug: 'strategist', tier: 'silver', title: 'Strategist', description: 'Finish 3 books in the Strategy category', points: 30 },
  { id: '6', slug: 'ai-scholar', tier: 'gold', title: 'AI Scholar', description: 'Finish 3 AI books', points: 45 },
  { id: '7', slug: 'market-timer', tier: 'bronze', title: 'Market Timer', description: 'Log in during market hours for 10 consecutive days', points: 20 },
  { id: '8', slug: 'risk-master', tier: 'platinum', title: 'Risk Master', description: 'Maintain moderate risk for 60 days', points: 75 },
  { id: '9', slug: 'hodl-hero', tier: 'gold', title: 'HODL Hero', description: 'Track crypto positions > 6 months', points: 60 },
  { id: '10', slug: 'ambassador', tier: 'platinum', title: 'Ambassador', description: 'Refer 50 active users', points: 100 }
]

export async function GET(request: NextRequest) {
  try {
    // Mock earned badges for demo
    const mockEarnedBadgeIds = new Set([
      'first-login',
      'portfolio-setup',
      'dashboard-visitor',
      'ai-enthusiast'
    ])

    const badgesWithStatus = mockBadges.map(badge => ({
      ...badge,
      earned: mockEarnedBadgeIds.has(badge.slug),
      earnedAt: mockEarnedBadgeIds.has(badge.slug) ? new Date().toISOString() : null
    }))

    // Calculate mock stats
    const earnedBadges = badgesWithStatus.filter(b => b.earned)
    const totalPoints = earnedBadges.reduce((sum, badge) => sum + badge.points, 0)
    const monthsUnlocked = Math.floor(totalPoints / 100)
    const hasAmbassador = earnedBadges.some(badge => badge.slug === 'ambassador')
    const totalFreeMonths = hasAmbassador ? 12 : Math.min(monthsUnlocked, 6)

    return NextResponse.json({
      badges: badgesWithStatus,
      stats: {
        earnedCount: earnedBadges.length,
        totalPoints,
        monthsUnlocked: totalFreeMonths,
        remainingPoints: monthsUnlocked < 6 ? (100 - (totalPoints % 100)) : 0,
        hasAmbassador
      }
    })
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
