/**
 * Simple Chess Engine for Financial Chess
 * AI opponent that makes moves based on market events and news sentiment
 */

import { Chess } from 'chess.js'

export interface MarketEvent {
  symbol: string
  sentiment: 'positive' | 'negative' | 'neutral'
  impact: 'low' | 'medium' | 'high'
  description: string
}

export interface ChessEngineConfig {
  difficulty: 'easy' | 'medium' | 'hard'
  marketEvents: MarketEvent[]
  userAssetMappings: Record<string, string> // symbol -> piece position
}

export class FinancialChessEngine {
  private chess: Chess
  private config: ChessEngineConfig
  private moveHistory: string[] = []

  constructor(fen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', config: ChessEngineConfig) {
    this.chess = new Chess(fen)
    this.config = config
  }

  /**
   * Get current board state
   */
  getBoardState(): string {
    return this.chess.fen()
  }

  /**
   * Check if game is over
   */
  isGameOver(): boolean {
    return this.chess.isGameOver()
  }

  /**
   * Get game result
   */
  getGameResult(): 'win' | 'loss' | 'draw' | null {
    if (!this.isGameOver()) return null
    
    if (this.chess.isCheckmate()) {
      return this.chess.turn() === 'w' ? 'loss' : 'win' // If it's white's turn and checkmate, white lost
    }
    
    if (this.chess.isDraw() || this.chess.isStalemate()) {
      return 'draw'
    }
    
    return null
  }

  /**
   * Make a move for the user
   */
  makeUserMove(move: string): boolean {
    try {
      const result = this.chess.move(move)
      if (result) {
        this.moveHistory.push(move)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  /**
   * Get all legal moves
   */
  getLegalMoves(): string[] {
    return this.chess.moves()
  }

  /**
   * AI makes a move based on market events and basic chess strategy
   */
  makeAIMove(): string | null {
    if (this.chess.turn() !== 'b' || this.isGameOver()) {
      return null
    }

    const legalMoves = this.chess.moves({ verbose: true })
    if (legalMoves.length === 0) return null

    // Apply market event influence
    const influencedMoves = this.applyMarketInfluence(legalMoves)
    
    // Select move based on difficulty and market influence
    const selectedMove = this.selectMove(influencedMoves)
    
    if (selectedMove) {
      this.chess.move(selectedMove)
      this.moveHistory.push(selectedMove.san)
      return selectedMove.san
    }

    return null
  }

  /**
   * Apply market event influence to move selection
   */
  private applyMarketInfluence(moves: any[]): any[] {
    return moves.map(move => {
      let score = this.evaluateMove(move)
      
      // Check if move affects pieces related to market events
      for (const event of this.config.marketEvents) {
        const piecePosition = this.config.userAssetMappings[event.symbol]
        if (piecePosition && this.moveAffectsPosition(move, piecePosition)) {
          // Adjust score based on market sentiment
          const multiplier = this.getEventMultiplier(event)
          score *= multiplier
        }
      }
      
      return { ...move, marketScore: score }
    })
  }

  /**
   * Basic move evaluation
   */
  private evaluateMove(move: any): number {
    let score = Math.random() * 10 // Base randomness
    
    // Prefer captures
    if (move.captured) {
      score += 20
    }
    
    // Prefer checks
    if (move.san.includes('+')) {
      score += 15
    }
    
    // Prefer checkmate
    if (move.san.includes('#')) {
      score += 1000
    }
    
    // Prefer center control
    if (['e4', 'e5', 'd4', 'd5'].includes(move.to)) {
      score += 5
    }
    
    return score
  }

  /**
   * Get multiplier based on market event
   */
  private getEventMultiplier(event: MarketEvent): number {
    const baseMultiplier = event.impact === 'high' ? 2.0 : event.impact === 'medium' ? 1.5 : 1.2
    
    if (event.sentiment === 'negative') {
      return baseMultiplier // AI becomes more aggressive against user's affected pieces
    } else if (event.sentiment === 'positive') {
      return 1 / baseMultiplier // AI becomes less aggressive
    }
    
    return 1.0
  }

  /**
   * Check if move affects a specific position
   */
  private moveAffectsPosition(move: any, position: string): boolean {
    return move.to === position || move.from === position
  }

  /**
   * Select best move based on difficulty and scores
   */
  private selectMove(moves: any[]): any | null {
    if (moves.length === 0) return null
    
    // Sort by market score
    moves.sort((a, b) => (b.marketScore || 0) - (a.marketScore || 0))
    
    switch (this.config.difficulty) {
      case 'easy':
        // Pick from bottom 50% of moves (weaker play)
        const easyIndex = Math.floor(moves.length * 0.5) + Math.floor(Math.random() * Math.floor(moves.length * 0.5))
        return moves[easyIndex] || moves[0]
        
      case 'medium':
        // Pick from top 70% of moves
        const mediumIndex = Math.floor(Math.random() * Math.floor(moves.length * 0.7))
        return moves[mediumIndex]
        
      case 'hard':
        // Pick from top 30% of moves
        const hardIndex = Math.floor(Math.random() * Math.floor(moves.length * 0.3))
        return moves[hardIndex]
        
      default:
        return moves[0]
    }
  }

  /**
   * Get move history
   */
  getMoveHistory(): string[] {
    return [...this.moveHistory]
  }

  /**
   * Reset game
   */
  reset(): void {
    this.chess.reset()
    this.moveHistory = []
  }
}

/**
 * Generate mock market events for demo
 */
export function generateMockMarketEvents(): MarketEvent[] {
  return [
    {
      symbol: 'BTC',
      sentiment: 'negative',
      impact: 'high',
      description: 'Bitcoin faces regulatory pressure from major economies'
    },
    {
      symbol: 'AAPL',
      sentiment: 'positive',
      impact: 'medium',
      description: 'Apple reports strong quarterly earnings'
    },
    {
      symbol: 'ETH',
      sentiment: 'neutral',
      impact: 'low',
      description: 'Ethereum network upgrade proceeds as planned'
    },
    {
      symbol: 'TSLA',
      sentiment: 'negative',
      impact: 'medium',
      description: 'Tesla recalls vehicles due to safety concerns'
    }
  ]
}
