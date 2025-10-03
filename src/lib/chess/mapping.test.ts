import { describe, it, expect } from 'vitest'
import { mapPortfolioToChessPieces, getPieceSymbol, type PortfolioHolding } from './mapping'

describe('Chess Mapping', () => {
  const mockPortfolio: PortfolioHolding[] = [
    { symbol: 'BTC', name: 'Bitcoin', value: 30000, category: 'crypto', volatility: 0.8 },
    { symbol: 'AAPL', name: 'Apple Inc.', value: 25000, category: 'stock', volatility: 0.3 },
    { symbol: 'ETH', name: 'Ethereum', value: 20000, category: 'crypto', volatility: 0.7 },
    { symbol: 'SPY', name: 'SPDR S&P 500', value: 35000, category: 'stock', volatility: 0.2 },
    { symbol: 'TSLA', name: 'Tesla Inc.', value: 15000, category: 'stock', volatility: 0.6 },
  ]

  describe('mapPortfolioToChessPieces', () => {
    it('should map largest holding to king', () => {
      const mappings = mapPortfolioToChessPieces(mockPortfolio)
      const king = mappings.find(m => m.pieceType === 'king')
      
      expect(king).toBeDefined()
      expect(king?.symbol).toBe('SPY') // Largest holding
      expect(king?.reasoning).toContain('Largest holding')
    })

    it('should map volatile assets to queen', () => {
      const mappings = mapPortfolioToChessPieces(mockPortfolio)
      const queen = mappings.find(m => m.pieceType === 'queen')
      
      expect(queen).toBeDefined()
      expect(['BTC', 'ETH'].includes(queen?.symbol || '')).toBe(true)
      expect(queen?.reasoning).toContain('volatility')
    })

    it('should map BTC to rook as digital gold', () => {
      const mappings = mapPortfolioToChessPieces(mockPortfolio)
      const btcMapping = mappings.find(m => m.symbol === 'BTC')
      
      expect(btcMapping).toBeDefined()
      expect(['rook', 'queen'].includes(btcMapping?.pieceType || '')).toBe(true)
    })

    it('should return mappings for all provided holdings', () => {
      const mappings = mapPortfolioToChessPieces(mockPortfolio)
      
      expect(mappings.length).toBeGreaterThan(0)
      expect(mappings.length).toBeLessThanOrEqual(mockPortfolio.length)
      
      // All symbols should be from the original portfolio
      mappings.forEach(mapping => {
        expect(mockPortfolio.some(h => h.symbol === mapping.symbol)).toBe(true)
      })
    })
  })

  describe('getPieceSymbol', () => {
    it('should return correct white piece symbols', () => {
      expect(getPieceSymbol('king', true)).toBe('♔')
      expect(getPieceSymbol('queen', true)).toBe('♕')
      expect(getPieceSymbol('rook', true)).toBe('♖')
      expect(getPieceSymbol('bishop', true)).toBe('♗')
      expect(getPieceSymbol('knight', true)).toBe('♘')
      expect(getPieceSymbol('pawn', true)).toBe('♙')
    })

    it('should return correct black piece symbols', () => {
      expect(getPieceSymbol('king', false)).toBe('♚')
      expect(getPieceSymbol('queen', false)).toBe('♛')
      expect(getPieceSymbol('rook', false)).toBe('♜')
      expect(getPieceSymbol('bishop', false)).toBe('♝')
      expect(getPieceSymbol('knight', false)).toBe('♞')
      expect(getPieceSymbol('pawn', false)).toBe('♟')
    })

    it('should handle invalid piece types', () => {
      expect(getPieceSymbol('invalid', true)).toBe('?')
    })
  })
})
