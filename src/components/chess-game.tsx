"use client"

import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Castle, 
  Gem, 
  Zap, 
  DollarSign,
  Trophy,
  RotateCcw,
  Info
} from 'lucide-react'

// Asset class mappings for chess pieces
const PIECE_ASSETS = {
  'p': { name: 'Bonds', icon: DollarSign, color: 'bg-blue-500', description: 'Stable income investments' },
  'r': { name: 'Real Estate', icon: Castle, color: 'bg-green-500', description: 'Property investments' },
  'n': { name: 'Commodities', icon: Gem, color: 'bg-yellow-500', description: 'Gold, oil, agricultural goods' },
  'b': { name: 'Tech Stocks', icon: Zap, color: 'bg-purple-500', description: 'Technology companies' },
  'q': { name: 'Bitcoin', icon: Crown, color: 'bg-orange-500', description: 'Digital gold' },
  'k': { name: 'Your Portfolio', icon: Trophy, color: 'bg-red-500', description: 'Your complete investment portfolio' }
}

interface ChessGameProps {
  onGameEnd?: (result: string) => void
}

export function ChessGame({ onGameEnd }: ChessGameProps) {
  const [game, setGame] = useState(new Chess())
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<string>('in_progress')
  const [showAssetInfo, setShowAssetInfo] = useState(false)

  // Simple AI move function
  const makeAIMove = () => {
    const possibleMoves = game.moves()
    if (possibleMoves.length === 0) return

    // Simple AI: prioritize center control and piece development
    const centerMoves = possibleMoves.filter(move => {
      const target = move.slice(-2)
      return ['d4', 'd5', 'e4', 'e5'].includes(target)
    })

    const developedMoves = possibleMoves.filter(move => {
      return move.includes('N') || move.includes('B') || move.includes('Q')
    })

    let selectedMove
    if (centerMoves.length > 0) {
      selectedMove = centerMoves[Math.floor(Math.random() * centerMoves.length)]
    } else if (developedMoves.length > 0) {
      selectedMove = developedMoves[Math.floor(Math.random() * developedMoves.length)]
    } else {
      selectedMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    }

    try {
      const move = game.move(selectedMove)
      if (move) {
        setGame(new Chess(game.fen()))
        setMoveHistory(prev => [...prev, move.san])
        checkGameStatus()
      }
    } catch (error) {
      console.error('Invalid AI move:', error)
    }
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Always promote to queen
      })

      if (move === null) return false

      setGame(new Chess(game.fen()))
      setMoveHistory(prev => [...prev, move.san])
      checkGameStatus()

      // Make AI move after a short delay
      setTimeout(() => {
        if (game.isGameOver()) return
        makeAIMove()
      }, 1000)

      return true
    } catch (error) {
      return false
    }
  }

  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus(game.turn() === 'w' ? 'black_wins' : 'white_wins')
      onGameEnd?.(gameStatus)
    } else if (game.isDraw()) {
      setGameStatus('draw')
      onGameEnd?.('draw')
    } else if (game.isCheck()) {
      setGameStatus('check')
    } else {
      setGameStatus('in_progress')
    }
  }

  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setMoveHistory([])
    setGameStatus('in_progress')
  }

  const getPieceAsset = (piece: string) => {
    const pieceType = piece.toLowerCase()
    return PIECE_ASSETS[pieceType as keyof typeof PIECE_ASSETS] || PIECE_ASSETS['p']
  }

  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'white_wins':
        return { message: 'You Win! 🎉', color: 'text-green-600' }
      case 'black_wins':
        return { message: 'AI Wins! 🤖', color: 'text-red-600' }
      case 'draw':
        return { message: 'Draw! 🤝', color: 'text-yellow-600' }
      case 'check':
        return { message: 'Check! ⚠️', color: 'text-orange-600' }
      default:
        return { message: game.turn() === 'w' ? 'Your Turn' : 'AI Thinking...', color: 'text-blue-600' }
    }
  }

  const status = getStatusMessage()

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-primary" />
                Financial Chess
              </CardTitle>
              <CardDescription>
                Strategic portfolio management through chess
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAssetInfo(!showAssetInfo)}
              >
                <Info className="w-4 h-4 mr-2" />
                Asset Guide
              </Button>
              <Button variant="outline" size="sm" onClick={resetGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <motion.div
              className={`text-2xl font-bold ${status.color}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              {status.message}
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chess Board */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="w-full max-w-lg mx-auto">
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                  boardWidth={600}
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  customDarkSquareStyle={{ backgroundColor: '#8B4513' }}
                  customLightSquareStyle={{ backgroundColor: '#F0D9B5' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Guide & Game Info */}
        <div className="space-y-4">
          {showAssetInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Asset Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(PIECE_ASSETS).map(([piece, asset]) => {
                  const Icon = asset.icon
                  return (
                    <motion.div
                      key={piece}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`w-8 h-8 ${asset.color} rounded flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.description}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Move History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Move History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {moveHistory.map((move, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-2 bg-muted/30 rounded text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-mono">{Math.floor(index / 2) + 1}.</span>
                    <span className="font-medium">{move}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Game Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Game Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Moves:</span>
                <span className="font-mono">{moveHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Turn:</span>
                <Badge variant={game.turn() === 'w' ? 'default' : 'secondary'}>
                  {game.turn() === 'w' ? 'You' : 'AI'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge variant="outline">{gameStatus.replace('_', ' ')}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
