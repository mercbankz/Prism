/**
 * Financial Chess Mapping Logic
 * Maps user portfolio assets to chess pieces based on financial characteristics
 */

export interface AssetMapping {
  symbol: string
  name: string
  value: number
  category: 'stock' | 'crypto' | 'commodity' | 'nft' | 'other'
  pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  reasoning: string
}

export interface PortfolioHolding {
  symbol: string
  name: string
  value: number
  category: 'stock' | 'crypto' | 'commodity' | 'nft' | 'other'
  volatility?: number
  correlation?: number
}

/**
 * Maps portfolio holdings to chess pieces based on financial characteristics
 */
export function mapPortfolioToChessPieces(holdings: PortfolioHolding[]): AssetMapping[] {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0)
  const sortedByValue = [...holdings].sort((a, b) => b.value - a.value)
  
  const mappings: AssetMapping[] = []
  
  // King: Largest holding cluster (most valuable position)
  if (sortedByValue.length > 0) {
    const largest = sortedByValue[0]
    mappings.push({
      ...largest,
      pieceType: 'king',
      reasoning: `Largest holding (${((largest.value / totalValue) * 100).toFixed(1)}% of portfolio)`
    })
  }
  
  // Queen: Highest growth/volatility asset
  const volatileAssets = sortedByValue.filter(h => 
    h.category === 'crypto' || (h.volatility && h.volatility > 0.3)
  )
  if (volatileAssets.length > 0 && volatileAssets[0].symbol !== mappings[0]?.symbol) {
    mappings.push({
      ...volatileAssets[0],
      pieceType: 'queen',
      reasoning: 'High volatility/growth potential asset'
    })
  }
  
  // Rooks: Stability assets (bonds, gold, BTC as digital gold)
  const stabilityAssets = sortedByValue.filter(h => 
    h.category === 'commodity' || 
    h.symbol === 'BTC' || 
    h.symbol.includes('BOND') ||
    h.symbol === 'GLD'
  ).slice(0, 2)
  
  stabilityAssets.forEach(asset => {
    if (!mappings.find(m => m.symbol === asset.symbol)) {
      mappings.push({
        ...asset,
        pieceType: 'rook',
        reasoning: 'Stability/store of value asset'
      })
    }
  })
  
  // Bishops: Thematic mid-risk (AI stocks, ETH, sector ETFs)
  const thematicAssets = sortedByValue.filter(h => 
    h.symbol === 'ETH' ||
    h.symbol.includes('AI') ||
    h.symbol.includes('TECH') ||
    h.name.toLowerCase().includes('artificial intelligence')
  ).slice(0, 2)
  
  thematicAssets.forEach(asset => {
    if (!mappings.find(m => m.symbol === asset.symbol)) {
      mappings.push({
        ...asset,
        pieceType: 'bishop',
        reasoning: 'Thematic/sector-focused investment'
      })
    }
  })
  
  // Knights: Non-correlated/alternatives (REITs, commodities, NFTs)
  const alternativeAssets = sortedByValue.filter(h => 
    h.category === 'nft' ||
    h.symbol.includes('REIT') ||
    (h.category === 'commodity' && h.symbol !== 'GLD')
  ).slice(0, 2)
  
  alternativeAssets.forEach(asset => {
    if (!mappings.find(m => m.symbol === asset.symbol)) {
      mappings.push({
        ...asset,
        pieceType: 'knight',
        reasoning: 'Alternative/non-correlated asset'
      })
    }
  })
  
  // Pawns: Minor positions (<5% each)
  const minorPositions = sortedByValue.filter(h => 
    (h.value / totalValue) < 0.05 && 
    !mappings.find(m => m.symbol === h.symbol)
  ).slice(0, 8)
  
  minorPositions.forEach(asset => {
    mappings.push({
      ...asset,
      pieceType: 'pawn',
      reasoning: `Small position (${((asset.value / totalValue) * 100).toFixed(1)}% of portfolio)`
    })
  })
  
  return mappings
}

/**
 * Get piece symbol for display
 */
export function getPieceSymbol(pieceType: string, isWhite: boolean = true): string {
  const pieces = {
    king: isWhite ? '♔' : '♚',
    queen: isWhite ? '♕' : '♛',
    rook: isWhite ? '♖' : '♜',
    bishop: isWhite ? '♗' : '♝',
    knight: isWhite ? '♘' : '♞',
    pawn: isWhite ? '♙' : '♟'
  }
  return pieces[pieceType as keyof typeof pieces] || '?'
}

/**
 * Generate board position from asset mappings
 */
export function generateInitialBoardPosition(mappings: AssetMapping[]): string {
  // Standard chess starting position with asset mappings
  // This would be customized based on the actual mappings
  return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
}
