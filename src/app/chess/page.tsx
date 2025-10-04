"use client"

import { ChessGame } from '@/components/chess/ChessGame'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Trophy, 
  Calendar,
  Target,
  TrendingUp,
  Users
} from 'lucide-react'

const seasons = [
  { id: 1, name: 'Q1 2024: Market Volatility', status: 'completed', winner: 'AI' },
  { id: 2, name: 'Q2 2024: Tech Rally', status: 'completed', winner: 'User' },
  { id: 3, name: 'Q3 2024: Crypto Surge', status: 'active', winner: null },
  { id: 4, name: 'Q4 2024: Year-End Strategy', status: 'upcoming', winner: null },
]

export default function ChessPage() {
  const currentSeason = seasons[2]
  const userScore = 7
  const aiScore = 5
  const gamesPlayed = 12

  const handleGameEnd = (result: string) => {
    console.log('Game ended:', result)
    // In a real app, this would update user stats and achievements
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="w-8 h-8 text-primary" />
            Financial Chess
          </h1>
          <p className="text-muted-foreground">
            Strategic portfolio management through chess
          </p>
        </div>
      </motion.div>

      {/* Current Season */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Current Season
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{currentSeason.name}</h3>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentSeason.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentSeason.status}
                  </span>
                  {currentSeason.winner && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Winner: {currentSeason.winner}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wins: {userScore}</span>
                  <span>Losses: {aiScore}</span>
                  <span>Draws: {gamesPlayed - userScore - aiScore}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Games Played</span>
                  <span>{gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days Remaining</span>
                  <span>23</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chess Game */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChessGame />
      </motion.div>

      {/* Statistics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userScore}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiScore}</div>
            <p className="text-xs text-muted-foreground">
              -1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gamesPlayed}</div>
            <p className="text-xs text-muted-foreground">
              This season
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}