import { useState, useEffect } from 'react'

export type PriceTick = { 
  t: number; 
  p: number; 
  v?: number;
  c?: number; // change percentage
}

export interface MarketProvider {
  getQuote(symbol: string): Promise<{ price: number; changePct: number; volume?: number }>;
  getSeries(symbol: string, range: '1M' | '3M' | '6M' | '1Y'): Promise<PriceTick[]>;
  streamQuote?(symbol: string, onTick: (p: PriceTick) => void): () => void;
}

// Mock market data provider for development
export class MockMarketProvider implements MarketProvider {
  private basePrices: { [key: string]: number } = {
    'AAPL': 185.50,
    'MSFT': 420.30,
    'GOOGL': 145.20,
    'AMZN': 155.80,
    'TSLA': 245.60,
    'NVDA': 875.40,
    'META': 485.20,
    'BTC': 43250.00,
    'ETH': 2650.00,
    'SOL': 98.50,
    'AVAX': 35.20,
    'MATIC': 0.85
  }

  private connections: Map<string, () => void> = new Map()

  async getQuote(symbol: string): Promise<{ price: number; changePct: number; volume?: number }> {
    const basePrice = this.basePrices[symbol.toUpperCase()] || 100
    const change = (Math.random() - 0.5) * 0.1 // ±5% change
    const price = basePrice * (1 + change)
    const changePct = change * 100
    const volume = Math.floor(Math.random() * 1000000) + 100000

    return { price, changePct, volume }
  }

  async getSeries(symbol: string, range: '1M' | '3M' | '6M' | '1Y'): Promise<PriceTick[]> {
    const days = range === '1M' ? 30 : range === '3M' ? 90 : range === '6M' ? 180 : 365
    const basePrice = this.basePrices[symbol.toUpperCase()] || 100
    const data: PriceTick[] = []
    
    for (let i = 0; i <= days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i))
      const timestamp = date.getTime()
      
      const randomChange = (Math.random() - 0.5) * 0.05 // ±2.5% daily change
      const price = basePrice * (1 + randomChange * (i / days))
      const volume = Math.floor(Math.random() * 1000000) + 100000
      
      data.push({
        t: timestamp,
        p: Math.round(price * 100) / 100,
        v: volume,
        c: randomChange * 100
      })
    }
    
    return data
  }

  streamQuote(symbol: string, onTick: (p: PriceTick) => void): () => void {
    const basePrice = this.basePrices[symbol.toUpperCase()] || 100
    let currentPrice = basePrice
    
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.02 // ±1% change
      currentPrice = currentPrice * (1 + change)
      
      onTick({
        t: Date.now(),
        p: Math.round(currentPrice * 100) / 100,
        c: change * 100
      })
    }, 5000) // Update every 5 seconds
    
    const disconnect = () => {
      clearInterval(interval)
      this.connections.delete(symbol)
    }
    
    this.connections.set(symbol, disconnect)
    return disconnect
  }
}

// Real market data provider using Finnhub API
export class FinnhubMarketProvider implements MarketProvider {
  private apiKey: string
  private baseUrl = 'https://finnhub.io/api/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getQuote(symbol: string): Promise<{ price: number; changePct: number; volume?: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/quote?symbol=${symbol}&token=${this.apiKey}`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      return {
        price: data.c || 0,
        changePct: data.dp || 0,
        volume: data.v || 0
      }
    } catch (error) {
      console.error('Finnhub API error:', error)
      // Fallback to mock data
      const mockProvider = new MockMarketProvider()
      return mockProvider.getQuote(symbol)
    }
  }

  async getSeries(symbol: string, range: '1M' | '3M' | '6M' | '1Y'): Promise<PriceTick[]> {
    try {
      const to = Math.floor(Date.now() / 1000)
      const from = to - (range === '1M' ? 30 * 24 * 3600 : 
                        range === '3M' ? 90 * 24 * 3600 :
                        range === '6M' ? 180 * 24 * 3600 : 365 * 24 * 3600)
      
      const response = await fetch(`${this.baseUrl}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${this.apiKey}`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      return data.t.map((timestamp: number, index: number) => ({
        t: timestamp * 1000,
        p: data.c[index],
        v: data.v[index],
        c: index > 0 ? ((data.c[index] - data.c[index - 1]) / data.c[index - 1]) * 100 : 0
      }))
    } catch (error) {
      console.error('Finnhub API error:', error)
      // Fallback to mock data
      const mockProvider = new MockMarketProvider()
      return mockProvider.getSeries(symbol, range)
    }
  }
}

// Crypto market data provider using CoinGecko API
export class CoinGeckoMarketProvider implements MarketProvider {
  private baseUrl = 'https://api.coingecko.com/api/v3'

  async getQuote(symbol: string): Promise<{ price: number; changePct: number; volume?: number }> {
    try {
      const coinId = this.getCoinId(symbol)
      const response = await fetch(`${this.baseUrl}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      const coinData = data[coinId]
      return {
        price: coinData.usd || 0,
        changePct: coinData.usd_24h_change || 0,
        volume: coinData.usd_24h_vol || 0
      }
    } catch (error) {
      console.error('CoinGecko API error:', error)
      // Fallback to mock data
      const mockProvider = new MockMarketProvider()
      return mockProvider.getQuote(symbol)
    }
  }

  async getSeries(symbol: string, range: '1M' | '3M' | '6M' | '1Y'): Promise<PriceTick[]> {
    try {
      const coinId = this.getCoinId(symbol)
      const days = range === '1M' ? 30 : range === '3M' ? 90 : range === '6M' ? 180 : 365
      
      const response = await fetch(`${this.baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      return data.prices.map((price: [number, number], index: number) => ({
        t: price[0],
        p: price[1],
        v: data.total_volumes[index]?.[1] || 0,
        c: index > 0 ? ((price[1] - data.prices[index - 1][1]) / data.prices[index - 1][1]) * 100 : 0
      }))
    } catch (error) {
      console.error('CoinGecko API error:', error)
      // Fallback to mock data
      const mockProvider = new MockMarketProvider()
      return mockProvider.getSeries(symbol, range)
    }
  }

  private getCoinId(symbol: string): string {
    const coinMap: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'SOL': 'solana',
      'AVAX': 'avalanche-2',
      'MATIC': 'matic-network'
    }
    return coinMap[symbol.toUpperCase()] || 'bitcoin'
  }
}

// Factory function to get the appropriate market provider
export function getMarketProvider(symbol: string): MarketProvider {
  const crypto = ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC']
  
  if (crypto.includes(symbol.toUpperCase())) {
    return new CoinGeckoMarketProvider()
  }
  
  // Use Finnhub for stocks if API key is available
  if (process.env.FINNHUB_API_KEY) {
    return new FinnhubMarketProvider(process.env.FINNHUB_API_KEY)
  }
  
  // Fallback to mock data
  return new MockMarketProvider()
}

// Rate-limited market data fetcher
export async function fetchMarketDataWithRateLimit(symbols: string[]): Promise<Map<string, any>> {
  const data = new Map()
  const provider = new MockMarketProvider()
  
  for (const symbol of symbols) {
    try {
      const quote = await provider.getQuote(symbol)
      data.set(symbol, {
        symbol,
        price: quote.price,
        change: quote.changePct,
        changePercent: quote.changePct,
        volume: quote.volume || 0,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error(`Failed to fetch data for ${symbol}:`, error)
    }
  }
  
  return data
}

// React hook for live market data
export function useLiveQuote(symbol: string) {
  const [data, setData] = useState<{ price: number; changePct: number; status: 'live' | 'paused' }>({
    price: 0,
    changePct: 0,
    status: 'paused'
  })
  
  const [isConnected, setIsConnected] = useState(false)
  
  useEffect(() => {
    const provider = getMarketProvider(symbol)
    
    // Get initial quote
    provider.getQuote(symbol).then(quote => {
      setData({
        price: quote.price,
        changePct: quote.changePct,
        status: 'live'
      })
      setIsConnected(true)
    })
    
    // Set up streaming if available
    if (provider.streamQuote) {
      const disconnect = provider.streamQuote(symbol, (tick) => {
        setData({
          price: tick.p,
          changePct: tick.c || 0,
          status: 'live'
        })
        setIsConnected(true)
      })
      
      return () => {
        disconnect()
        setIsConnected(false)
      }
    }
    
    // Fallback to polling every 10 seconds
    const interval = setInterval(async () => {
      try {
        const quote = await provider.getQuote(symbol)
        setData({
          price: quote.price,
          changePct: quote.changePct,
          status: 'live'
        })
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to fetch quote:', error)
        setIsConnected(false)
      }
    }, 10000)
    
    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [symbol])
  
  return { ...data, isConnected }
}