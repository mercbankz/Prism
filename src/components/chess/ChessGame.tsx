"use client"

import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw } from 'lucide-react'

export function ChessGame() {
  const [game, setGame] = useState(new Chess())
  const [gameStatus, setGameStatus] = useState('playing')
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  const makeAiMove = useCallback(() => {
    const possibleMoves = game.moves()
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
      return
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIndex])
    setGame(new Chess(game.fen()))
    setMoveHistory(prev => [...prev, possibleMoves[randomIndex]])
  }, [game])

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() === 'p' && targetSquare[1] === '8' ? 'q' : undefined,
      })

      if (move === null) return false

      setGame(new Chess(game.fen()))
      setMoveHistory(prev => [...prev, move.san])

      // Check game status
      if (game.isCheckmate()) {
        setGameStatus('checkmate')
      } else if (game.isStalemate()) {
        setGameStatus('stalemate')
      } else if (game.isDraw()) {
        setGameStatus('draw')
      } else {
        // AI moves after user
        setTimeout(makeAiMove, 500)
      }
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
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Financial Chess Board</span>
          <Badge variant="secondary">{getGameStatusMessage()}</Badge>
        </CardTitle>
        <CardDescription>
          Strategize your investments on the chessboard. Each piece represents an asset class.
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