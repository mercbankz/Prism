"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  BookOpen, 
  TrendingUp,
  Users,
  Calendar,
  Zap,
  Crown,
  Shield,
  Gem
} from "lucide-react"

// Mock badges data
const badgesData = [
  // Bronze Badges
  { id: 1, slug: 'first-login', tier: 'bronze', title: 'Welcome Aboard', description: 'Complete your first login to Prism', points: 5, earned: true, earnedAt: '2024-01-15', icon: Star },
  { id: 2, slug: 'portfolio-connected', tier: 'bronze', title: 'Connected', description: 'Connect your first portfolio account', points: 5, earned: true, earnedAt: '2024-01-15', icon: Target },
  { id: 3, slug: 'first-analysis', tier: 'bronze', title: 'Analyst', description: 'View your first portfolio analysis', points: 5, earned: true, earnedAt: '2024-01-16', icon: TrendingUp },
  { id: 4, slug: 'ai-chat', tier: 'bronze', title: 'AI Curious', description: 'Have your first conversation with Prism AI', points: 5, earned: true, earnedAt: '2024-01-17', icon: Zap },
  { id: 5, slug: 'book-started', tier: 'bronze', title: 'Reader', description: 'Start reading your first book', points: 5, earned: true, earnedAt: '2024-01-18', icon: BookOpen },
  
  // Silver Badges
  { id: 6, slug: 'week-streak', tier: 'silver', title: 'Consistent', description: 'Log in for 7 consecutive days', points: 10, earned: true, earnedAt: '2024-01-22', icon: Calendar },
  { id: 7, slug: 'chess-player', tier: 'silver', title: 'Chess Player', description: 'Complete your first Financial Chess game', points: 10, earned: true, earnedAt: '2024-01-25', icon: Crown },
  { id: 8, slug: 'book-finished', tier: 'silver', title: 'Scholar', description: 'Complete reading your first book', points: 10, earned: false, earnedAt: null, icon: BookOpen },
  { id: 9, slug: 'portfolio-optimized', tier: 'silver', title: 'Optimizer', description: 'Run 5 portfolio rebalance simulations', points: 10, earned: false, earnedAt: null, icon: TrendingUp },
  { id: 10, slug: 'ai-expert', tier: 'silver', title: 'AI Expert', description: 'Have 25 conversations with Prism AI', points: 10, earned: false, earnedAt: null, icon: Zap },
  
  // Gold Badges
  { id: 11, slug: 'month-streak', tier: 'gold', title: 'Dedicated', description: 'Log in for 30 consecutive days', points: 25, earned: false, earnedAt: null, icon: Calendar },
  { id: 12, slug: 'chess-winner', tier: 'gold', title: 'Chess Master', description: 'Win 3 Financial Chess games', points: 25, earned: false, earnedAt: null, icon: Crown },
  { id: 13, slug: 'library-master', tier: 'gold', title: 'Library Master', description: 'Complete 5 books in the library', points: 25, earned: false, earnedAt: null, icon: BookOpen },
  { id: 14, slug: 'portfolio-guru', tier: 'gold', title: 'Portfolio Guru', description: 'Maintain 90+ health score for 30 days', points: 25, earned: false, earnedAt: null, icon: Shield },
  { id: 15, slug: 'knowledge-seeker', tier: 'gold', title: 'Knowledge Seeker', description: 'Earn 15 different badges', points: 25, earned: false, earnedAt: null, icon: Star },
  
  // Platinum Badges
  { id: 16, slug: 'year-veteran', tier: 'platinum', title: 'Veteran', description: 'Use Prism for 365 consecutive days', points: 50, earned: false, earnedAt: null, icon: Trophy },
  { id: 17, slug: 'chess-champion', tier: 'platinum', title: 'Chess Champion', description: 'Win 10 Financial Chess games', points: 50, earned: false, earnedAt: null, icon: Crown },
  { id: 18, slug: 'library-scholar', tier: 'platinum', title: 'Scholar Supreme', description: 'Complete all books in the library', points: 50, earned: false, earnedAt: null, icon: Gem },
  { id: 19, slug: 'ambassador', tier: 'platinum', title: 'Ambassador', description: 'Refer 50 active users to Prism', points: 50, earned: false, earnedAt: null, icon: Users },
  { id: 20, slug: 'master-investor', tier: 'platinum', title: 'Master Investor', description: 'Maintain perfect 100 health score for 90 days', points: 50, earned: false, earnedAt: null, icon: Trophy },
]

const tierColors = {
  bronze: 'secondary',
  silver: 'outline', 
  gold: 'default',
  platinum: 'destructive'
}

const tierIcons = {
  bronze: Award,
  silver: Star,
  gold: Trophy,
  platinum: Crown
}

export default function BadgesPage() {
  const [selectedTier, setSelectedTier] = useState<string>('all')
  
  const earnedBadges = badgesData.filter(badge => badge.earned)
  const totalPoints = earnedBadges.reduce((sum, badge) => sum + badge.points, 0)
  const monthsUnlocked = Math.floor(totalPoints / 100)
  const maxMonths = 6
  const remainingPoints = (monthsUnlocked < maxMonths) ? (100 - (totalPoints % 100)) : 0
  
  // Check for Ambassador badge
  const hasAmbassador = earnedBadges.some(badge => badge.slug === 'ambassador')
  const totalFreeMonths = hasAmbassador ? 12 : Math.min(monthsUnlocked, maxMonths)
  
  const filteredBadges = selectedTier === 'all' 
    ? badgesData 
    : badgesData.filter(badge => badge.tier === selectedTier)
  
  const tierCounts = {
    bronze: badgesData.filter(b => b.tier === 'bronze').length,
    silver: badgesData.filter(b => b.tier === 'silver').length,
    gold: badgesData.filter(b => b.tier === 'gold').length,
    platinum: badgesData.filter(b => b.tier === 'platinum').length,
  }
  
  const earnedCounts = {
    bronze: earnedBadges.filter(b => b.tier === 'bronze').length,
    silver: earnedBadges.filter(b => b.tier === 'silver').length,
    gold: earnedBadges.filter(b => b.tier === 'gold').length,
    platinum: earnedBadges.filter(b => b.tier === 'platinum').length,
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Award className="w-8 h-8 text-primary" />
          Badges & Rewards
        </h1>
        <p className="text-muted-foreground">
          Earn badges and unlock rewards as you learn and engage with Prism
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{earnedBadges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{totalFreeMonths}</p>
                <p className="text-sm text-muted-foreground">Free Months</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{remainingPoints || 'Max'}</p>
                <p className="text-sm text-muted-foreground">
                  {remainingPoints ? 'Points to Next Month' : 'Months Unlocked'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rewards Progress</CardTitle>
          <CardDescription>
            Earn 100 points = 1 free month (max 6 months). Ambassador badge = 1 free year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to next free month</span>
                <span>{totalPoints % 100}/100 points</span>
              </div>
              <Progress value={(totalPoints % 100)} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {Object.entries(tierCounts).map(([tier, total]) => {
                const earned = earnedCounts[tier as keyof typeof earnedCounts]
                const TierIcon = tierIcons[tier as keyof typeof tierIcons]
                return (
                  <div key={tier} className="p-3 border rounded-lg">
                    <TierIcon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium capitalize">{tier}</p>
                    <p className="text-sm text-muted-foreground">{earned}/{total}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant={selectedTier === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedTier('all')}
        >
          All ({badgesData.length})
        </Button>
        {Object.entries(tierCounts).map(([tier, count]) => (
          <Button
            key={tier}
            variant={selectedTier === tier ? 'default' : 'outline'}
            onClick={() => setSelectedTier(tier)}
          >
            <span className="capitalize">{tier}</span> ({count})
          </Button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          const IconComponent = badge.icon
          return (
            <Card 
              key={badge.id} 
              className={`relative ${badge.earned ? 'ring-2 ring-primary/20' : 'opacity-60'}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      badge.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{badge.title}</CardTitle>
                      <Badge variant={tierColors[badge.tier as keyof typeof tierColors] as any} className="text-xs">
                        {badge.tier}
                      </Badge>
                    </div>
                  </div>
                  {badge.earned && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {badge.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm font-medium">{badge.points} pts</span>
                  </div>
                  
                  {badge.earned && badge.earnedAt && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Special Rewards Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Special Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <h3 className="font-medium">Free Subscription Months</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Earn 100 points to unlock 1 free month of Prism Premium (max 6 months total)
              </p>
              <p className="text-xs text-muted-foreground">
                Current: {monthsUnlocked}/{maxMonths} months unlocked
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium">Ambassador Program</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Refer 50 active users to earn the Ambassador badge and unlock 1 free year
              </p>
              <p className="text-xs text-muted-foreground">
                This reward is exempt from the 6-month cap
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
