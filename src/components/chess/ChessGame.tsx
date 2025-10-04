"use client"

import { useState, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Bell, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock financial news events
const financialNewsEvents = [
  {
    id: 1,
    title: "Fed announces rate cut",
    impact: "positive",
    description: "Federal Reserve cuts interest rates by 0.25%, boosting market sentiment",
    triggerTime: 10000, // 10 seconds
    assetImpact: "Bonds, Real Estate benefit from lower rates"
  },
  {
    id: 2,
    title: "Tech earnings disappoint",
    impact: "negative", 
    description: "Major tech companies report lower than expected Q3 earnings",
    triggerTime: 20000, // 20 seconds
    assetImpact: "Tech stocks under pressure, Bitcoin volatility increases"
  },
  {
    id: 3,
    title: "Bitcoin ETF approved",
    impact: "positive",
    description: "SEC approves first Bitcoin ETF, institutional adoption accelerates",
    triggerTime: 30000, // 30 seconds
    assetImpact: "Bitcoin surges, crypto market rallies"
  },
  {
    id: 4,
    title: "Inflation data exceeds expectations",
    impact: "negative",
    description: "CPI data shows inflation rising faster than anticipated",
    triggerTime: 40000, // 40 seconds
    assetImpact: "Bonds fall, commodities and real estate gain"
  },
  {
    id: 5,
    title: "Recession fears grow",
    impact: "negative",
    description: "Economic indicators suggest potential recession ahead",
    triggerTime: 50000, // 50 seconds
    assetImpact: "Defensive assets favored, growth stocks decline"
  }
]

export function ChessGame() {
  const [game, setGame] = useState(new Chess())
  const [gameStatus, setGameStatus] = useState('playing')
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [notification, setNotification] = useState<any>(null)
  const [currentSeasonStats, setCurrentSeasonStats] = useState({
    userWins: 0,
    aiWins: 0,
    draws: 0,
    totalGames: 0
  })
  const [lastNewsEvent, setLastNewsEvent] = useState<any>(null)

  const makeAiMove = useCallback(() => {
    const possibleMoves = game.moves()
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
      return
    }
    
    // Slightly smarter AI based on news events
    let selectedMove
    if (lastNewsEvent) {
      // AI makes more aggressive moves on positive news, defensive on negative
      const aggressiveMoves = possibleMoves.filter(move => 
        move.includes('+') || move.includes('x') || move.includes('Q') || move.includes('R')
      )
      const defensiveMoves = possibleMoves.filter(move => 
        !move.includes('+') && !move.includes('x')
      )
      
      if (lastNewsEvent.impact === 'positive' && aggressiveMoves.length > 0) {
        selectedMove = aggressiveMoves[Math.floor(Math.random() * aggressiveMoves.length)]
      } else if (lastNewsEvent.impact === 'negative' && defensiveMoves.length > 0) {
        selectedMove = defensiveMoves[Math.floor(Math.random() * defensiveMoves.length)]
      } else {
        selectedMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
      }
    } else {
      selectedMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    }
    
    try {
      game.move(selectedMove)
      setGame(new Chess(game.fen()))
      setMoveHistory(prev => [...prev, `AI: ${selectedMove}`])
    } catch (error) {
      console.error('Invalid AI move:', error)
    }
  }, [game, lastNewsEvent])

  // Simulate news events that trigger AI moves
  useEffect(() => {
    const newsEvent = financialNewsEvents[Math.floor(Math.random() * financialNewsEvents.length)]
    const timer = setTimeout(() => {
      setLastNewsEvent(newsEvent)
      setNotification({
        type: 'news',
        title: newsEvent.title,
        description: newsEvent.description,
        impact: newsEvent.impact,
        assetImpact: newsEvent.assetImpact
      })
      
      // Auto-dismiss notification after 6 seconds
      setTimeout(() => {
        setNotification(null)
      }, 6000)
      
      // AI makes a move after news event
      setTimeout(() => {
        setIsAiThinking(true)
        setTimeout(() => {
          makeAiMove()
          setIsAiThinking(false)
          setNotification({
            type: 'ai_move',
            title: "AI has moved!",
            description: "Your turn to respond to the market conditions.",
            impact: 'neutral'
          })
          
          // Auto-dismiss AI move notification after 6 seconds
          setTimeout(() => {
            setNotification(null)
          }, 6000)
        }, 1500)
      }, 2000)
    }, newsEvent.triggerTime)

    return () => clearTimeout(timer)
  }, [makeAiMove])

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])


  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() === 'p' && targetSquare[1] === '8' ? 'q' : undefined,
      })

      if (move === null) return false

      setGame(new Chess(game.fen()))
      setMoveHistory(prev => [...prev, `You: ${move.san}`])

      // Check game status
      if (game.isCheckmate()) {
        setGameStatus('checkmate')
        setCurrentSeasonStats(prev => ({ ...prev, userWins: prev.userWins + 1, totalGames: prev.totalGames + 1 }))
      } else if (game.isStalemate()) {
        setGameStatus('stalemate')
        setCurrentSeasonStats(prev => ({ ...prev, draws: prev.draws + 1, totalGames: prev.totalGames + 1 }))
      } else if (game.isDraw()) {
        setGameStatus('draw')
        setCurrentSeasonStats(prev => ({ ...prev, draws: prev.draws + 1, totalGames: prev.totalGames + 1 }))
      }
      // Note: AI moves are now triggered by news events, not automatically after user moves
      return true
    } catch (e) {
      console.error("Invalid move:", e)
      return false
    }
  }

  const resetGame = () => {
    setGame(new Chess())
    setGameStatus('playing')
    setMoveHistory([])
  }

  const getGameStatusMessage = () => {
    switch (gameStatus) {
      case 'checkmate': return 'Checkmate! Game Over.'
      case 'stalemate': return 'Stalemate! It\'s a Draw.'
      case 'draw': return 'Draw! Game Over.'
      case 'playing': return 'Game in Progress. Your Turn.'
      default: return 'Game Status Unknown.'
    }
  }

  return (
    <Card className="relative">
      {/* Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-4 right-4 z-50 max-w-sm"
          >
            <Card className={`border-l-4 ${
              notification.impact === 'positive' ? 'border-l-[#00FF99] bg-[#00FF99]/10' :
              notification.impact === 'negative' ? 'border-l-[#FF4D4D] bg-[#FF4D4D]/10' :
              'border-l-blue-500 bg-blue-50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    notification.impact === 'positive' ? 'bg-[#00FF99]/20' :
                    notification.impact === 'negative' ? 'bg-[#FF4D4D]/20' :
                    'bg-blue-100'
                  }`}>
                    {notification.type === 'news' ? (
                      notification.impact === 'positive' ? 
                        <TrendingUp className="w-4 h-4 text-[#00FF99]" /> :
                        <TrendingDown className="w-4 h-4 text-[#FF4D4D]" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm ${
                      notification.impact === 'positive' ? 'text-[#00FF99]' :
                      notification.impact === 'negative' ? 'text-[#FF4D4D]' :
                      'text-blue-800'
                    }`}>{notification.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                    {notification.assetImpact && (
                      <p className="text-xs text-gray-500 mt-1 italic font-medium">{notification.assetImpact}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Thinking Indicator */}
      {isAiThinking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 left-4 z-50"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm font-medium text-blue-800">AI is thinking...</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Financial Chess Board</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{getGameStatusMessage()}</Badge>
            {lastNewsEvent && (
              <Badge variant={lastNewsEvent.impact === 'positive' ? 'default' : 'destructive'}>
                {lastNewsEvent.impact === 'positive' ? 'Bull Market' : 'Bear Market'}
              </Badge>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Strategize your investments on the chessboard. AI moves are triggered by financial news events.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 aspect-square max-w-[600px] mx-auto">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={600}
          />
        </div>

        <div className="w-full lg:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Game Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={resetGame} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" /> Reset Game
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Asset Mappings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Pawns</span>
                <Badge variant="outline" className="ml-auto">Bonds</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Rooks</span>
                <Badge variant="outline" className="ml-auto">Real Estate</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Knights</span>
                <Badge variant="outline" className="ml-auto">Commodities</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Bishops</span>
                <Badge variant="outline" className="ml-auto">Tech Stocks</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Queen</span>
                <Badge variant="outline" className="ml-auto">Bitcoin</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">King</span>
                <Badge variant="outline" className="ml-auto">Portfolio</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quarterly News Calendar</CardTitle>
            </CardHeader>
            <CardContent className="max-h-48 overflow-y-auto">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded border-l-2 border-green-500">
                  <div>
                    <div className="font-medium text-green-800">CPI Release</div>
                    <div className="text-xs text-green-600">Jan 15, 2024</div>
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-300">Completed</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                  <div>
                    <div className="font-medium text-blue-800">Fed Meeting</div>
                    <div className="text-xs text-blue-600">Jan 31, 2024</div>
                  </div>
                  <Badge variant="outline" className="text-blue-700 border-blue-300">Upcoming</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded border-l-2 border-orange-500">
                  <div>
                    <div className="font-medium text-orange-800">Tech Earnings</div>
                    <div className="text-xs text-orange-600">Feb 5-15, 2024</div>
                  </div>
                  <Badge variant="outline" className="text-orange-700 border-orange-300">Upcoming</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded border-l-2 border-purple-500">
                  <div>
                    <div className="font-medium text-purple-800">Bitcoin ETF Review</div>
                    <div className="text-xs text-purple-600">Feb 20, 2024</div>
                  </div>
                  <Badge variant="outline" className="text-purple-700 border-purple-300">Upcoming</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-red-50 rounded border-l-2 border-red-500">
                  <div>
                    <div className="font-medium text-red-800">Jobs Report</div>
                    <div className="text-xs text-red-600">Mar 8, 2024</div>
                  </div>
                  <Badge variant="outline" className="text-red-700 border-red-300">Upcoming</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border-l-2 border-gray-300">
                  <div>
                    <div className="font-medium text-gray-600 line-through">Holiday Trading</div>
                    <div className="text-xs text-gray-500">Mar 15, 2024</div>
                  </div>
                  <Badge variant="secondary" className="text-gray-600">Completed</Badge>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="text-xs text-muted-foreground text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Completed Events</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Upcoming Events</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Move History</CardTitle>
            </CardHeader>
            <CardContent className="max-h-48 overflow-y-auto text-sm text-muted-foreground">
              {moveHistory.length === 0 ? (
                <p>No moves yet.</p>
              ) : (
                <ol className="list-decimal list-inside">
                  {moveHistory.map((move, index) => (
                    <li key={index}>{move}</li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}