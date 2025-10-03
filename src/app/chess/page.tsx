"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Crown, 
  Play, 
  RotateCcw, 
  Trophy, 
  Target,
  TrendingDown,
  TrendingUp,
  Minus
} from "lucide-react"
import { mapPortfolioToChessPieces, getPieceSymbol, type AssetMapping, type PortfolioHolding } from "@/lib/chess/mapping"
import { FinancialChessEngine, generateMockMarketEvents, type MarketEvent } from "@/lib/chess/engine"
import { getCurrentQuarter } from "@/lib/utils"

// Mock portfolio data
const mockPortfolio: PortfolioHolding[] = [
  { symbol: 'BTC', name: 'Bitcoin', value: 30000, category: 'crypto', volatility: 0.8 },
  { symbol: 'AAPL', name: 'Apple Inc.', value: 25000, category: 'stock', volatility: 0.3 },
  { symbol: 'ETH', name: 'Ethereum', value: 20000, category: 'crypto', volatility: 0.7 },
  { symbol: 'SPY', name: 'SPDR S&P 500', value: 35000, category: 'stock', volatility: 0.2 },
  { symbol: 'TSLA', name: 'Tesla Inc.', value: 15000, category: 'stock', volatility: 0.6 },
]

// Mock game history
const gameHistory = [
  { quarter: '2024-Q1', result: 'win' as const, score: 1200 },
  { quarter: '2023-Q4', result: 'loss' as const, score: 800 },
  { quarter: '2023-Q3', result: 'draw' as const, score: 1000 },
]

export default function ChessPage() {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup')
  const [assetMappings, setAssetMappings] = useState<AssetMapping[]>([])
  const [marketEvents, setMarketEvents] = useState<MarketEvent[]>([])
  const [engine, setEngine] = useState<FinancialChessEngine | null>(null)
  const [currentQuarter] = useState(getCurrentQuarter())
  const [gameResult, setGameResult] = useState<'win' | 'loss' | 'draw' | null>(null)
  const [moveCount, setMoveCount] = useState(0)

  useEffect(() => {
    // Initialize asset mappings and market events
    const mappings = mapPortfolioToChessPieces(mockPortfolio)
    const events = generateMockMarketEvents()
    
    setAssetMappings(mappings)
    setMarketEvents(events)
    
    // Create asset position mappings for the engine
    const assetPositions: Record<string, string> = {}
    mappings.forEach((mapping, index) => {
      // Mock positions - in a real implementation, these would be actual board positions
      assetPositions[mapping.symbol] = `${String.fromCharCode(97 + (index % 8))}${Math.floor(index / 8) + 1}`
    })
    
    const chessEngine = new FinancialChessEngine(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      {
        difficulty: 'medium',
        marketEvents: events,
        userAssetMappings: assetPositions
      }
    )
    
    setEngine(chessEngine)
  }, [])

  const startGame = () => {
    setGameState('playing')
    setGameResult(null)
    setMoveCount(0)
    engine?.reset()
  }

  const resetGame = () => {
    setGameState('setup')
    setGameResult(null)
    setMoveCount(0)
    engine?.reset()
  }

  const simulateMove = () => {
    if (!engine || gameState !== 'playing') return
    
    // Simulate a move (in real implementation, this would be user interaction with the board)
    const legalMoves = engine.getLegalMoves()
    if (legalMoves.length > 0) {
      const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
      engine.makeUserMove(randomMove)
      setMoveCount(prev => prev + 1)
      
      // AI responds
      setTimeout(() => {
        const aiMove = engine.makeAIMove()
        if (aiMove) {
          setMoveCount(prev => prev + 1)
        }
        
        // Check if game is over
        if (engine.isGameOver()) {
          const result = engine.getGameResult()
          setGameResult(result)
          setGameState('finished')
        }
      }, 1000)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'negative': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'negative': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Crown className="w-8 h-8 text-primary" />
          Financial Chess
        </h1>
        <p className="text-muted-foreground">
          Quarterly strategic game where your portfolio becomes the board
        </p>
      </div>

      {/* Current Season Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Current Season: {currentQuarter}</h2>
            <p className="text-sm text-muted-foreground">
              Your portfolio assets are mapped to chess pieces based on their financial characteristics
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Game State</p>
            <Badge variant={gameState === 'playing' ? 'default' : 'secondary'}>
              {gameState === 'setup' ? 'Ready to Play' : gameState === 'playing' ? 'In Progress' : 'Completed'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chess Board Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Game Board</CardTitle>
              <CardDescription>
                {gameState === 'setup' && "Click 'Start Game' to begin your quarterly chess match"}
                {gameState === 'playing' && `Move ${moveCount} - Your turn`}
                {gameState === 'finished' && `Game Over - ${gameResult === 'win' ? 'You Won!' : gameResult === 'loss' ? 'You Lost' : 'Draw'}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="chess-board bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-lg p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">♔</div>
                  <p className="text-lg font-medium mb-4">
                    {gameState === 'setup' && 'Ready to Start'}
                    {gameState === 'playing' && 'Game in Progress'}
                    {gameState === 'finished' && 'Game Complete'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    {gameState === 'setup' && (
                      <Button onClick={startGame}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Game
                      </Button>
                    )}
                    {gameState === 'playing' && (
                      <Button onClick={simulateMove}>
                        Make Move
                      </Button>
                    )}
                    {(gameState === 'playing' || gameState === 'finished') && (
                      <Button variant="outline" onClick={resetGame}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Game Progress */}
              {gameState === 'playing' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Game Progress</span>
                    <span>{moveCount} moves</span>
                  </div>
                  <Progress value={Math.min((moveCount / 50) * 100, 100)} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Asset Mappings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Chess Army</CardTitle>
              <CardDescription>Portfolio assets mapped to chess pieces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assetMappings.map((mapping) => (
                  <div key={mapping.symbol} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">
                      {getPieceSymbol(mapping.pieceType, true)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{mapping.symbol}</span>
                        <Badge variant="outline" className="text-xs">
                          {mapping.pieceType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{mapping.reasoning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Market Events */}
          <Card>
            <CardHeader>
              <CardTitle>Market Events</CardTitle>
              <CardDescription>Events affecting AI strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{event.symbol}</span>
                    <div className="flex items-center gap-1">
                      {getSentimentIcon(event.sentiment)}
                      <Badge variant="outline" className={getSentimentColor(event.sentiment)}>
                        {event.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Game History */}
          <Card>
            <CardHeader>
              <CardTitle>Season History</CardTitle>
              <CardDescription>Your quarterly performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {gameHistory.map((game) => (
                <div key={game.quarter} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm font-medium">{game.quarter}</span>
                  <div className="flex items-center gap-2">
                    {game.result === 'win' && <Trophy className="w-4 h-4 text-yellow-500" />}
                    {game.result === 'loss' && <Target className="w-4 h-4 text-red-500" />}
                    {game.result === 'draw' && <Minus className="w-4 h-4 text-gray-500" />}
                    <Badge 
                      variant={game.result === 'win' ? 'default' : game.result === 'loss' ? 'destructive' : 'secondary'}
                    >
                      {game.result}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Your portfolio assets become chess pieces based on their financial characteristics</p>
              <p>• The AI opponent uses market events to influence its strategy</p>
              <p>• Negative news makes AI more aggressive against affected pieces</p>
              <p>• Games are played quarterly with results tracked privately</p>
              <p>• Learn market dynamics through strategic gameplay</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
