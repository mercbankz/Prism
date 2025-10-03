import axios from 'axios'

// Financial API interfaces
export interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  pe?: number
  high52Week?: number
  low52Week?: number
}

export interface CryptoQuote {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  volume24h: number
  marketCap?: number
  rank?: number
}

export interface NewsItem {
  title: string
  summary: string
  source: string
  publishedAt: string
  sentiment: 'positive' | 'negative' | 'neutral'
  relevanceScore: number
  url?: string
}

export interface MarketData {
  stock?: StockQuote
  crypto?: CryptoQuote
  news: NewsItem[]
  sentiment: {
    overall: 'bullish' | 'bearish' | 'neutral'
    score: number
  }
}

// Alpha Vantage API (Free tier: 5 calls per minute, 500 calls per day)
export class AlphaVantageAPI {
  private apiKey: string
  private baseUrl = 'https://www.alphavantage.co/query'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getStockQuote(symbol: string): Promise<StockQuote | null> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: this.apiKey
        }
      })

      const data = response.data['Global Quote']
      if (!data || data['01. symbol'] === undefined) {
        return null
      }

      return {
        symbol: data['01. symbol'],
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change']),
        changePercent: parseFloat(data['10. change percent'].replace('%', '')),
        volume: parseInt(data['06. volume']),
        marketCap: undefined,
        pe: undefined,
        high52Week: undefined,
        low52Week: undefined
      }
    } catch (error) {
      console.error('Alpha Vantage API error:', error)
      return null
    }
  }

  async getNews(symbols: string[], limit = 10): Promise<NewsItem[]> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          function: 'NEWS_SENTIMENT',
          tickers: symbols.join(','),
          limit,
          apikey: this.apiKey
        }
      })

      const newsData = response.data.feed || []
      
      return newsData.map((item: any) => ({
        title: item.title,
        summary: item.summary,
        source: item.source,
        publishedAt: item.time_published,
        sentiment: this.mapSentiment(item.overall_sentiment_score),
        relevanceScore: item.relevance_score,
        url: item.url
      }))
    } catch (error) {
      console.error('Alpha Vantage News API error:', error)
      return []
    }
  }

  private mapSentiment(score: number): 'positive' | 'negative' | 'neutral' {
    if (score > 0.1) return 'positive'
    if (score < -0.1) return 'negative'
    return 'neutral'
  }
}

// Finnhub API (Free tier: 60 calls per minute)
export class FinnhubAPI {
  private apiKey: string
  private baseUrl = 'https://finnhub.io/api/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getStockQuote(symbol: string): Promise<StockQuote | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/quote`, {
        params: {
          symbol,
          token: this.apiKey
        }
      })

      const data = response.data
      if (!data.c) return null

      return {
        symbol,
        price: data.c,
        change: data.d || 0,
        changePercent: data.dp || 0,
        volume: data.volume || 0,
        marketCap: undefined,
        pe: undefined,
        high52Week: data.h,
        low52Week: data.l
      }
    } catch (error) {
      console.error('Finnhub API error:', error)
      return null
    }
  }

  async getCryptoQuote(symbol: string): Promise<CryptoQuote | null> {
    try {
      // Finnhub uses different symbol format for crypto
      const cryptoSymbol = `BINANCE:${symbol}USDT`
      
      const response = await axios.get(`${this.baseUrl}/quote`, {
        params: {
          symbol: cryptoSymbol,
          token: this.apiKey
        }
      })

      const data = response.data
      if (!data.c) return null

      return {
        symbol,
        price: data.c,
        change24h: data.d || 0,
        changePercent24h: data.dp || 0,
        volume24h: data.volume || 0,
        marketCap: undefined,
        rank: undefined
      }
    } catch (error) {
      console.error('Finnhub Crypto API error:', error)
      return null
    }
  }
}

// Yahoo Finance API (Unofficial, rate-limited)
export class YahooFinanceAPI {
  private baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart'

  async getStockQuote(symbol: string): Promise<StockQuote | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/${symbol}`)
      const data = response.data.chart.result[0]
      
      if (!data || !data.meta) return null

      const meta = data.meta
      return {
        symbol: meta.symbol,
        price: meta.regularMarketPrice,
        change: meta.regularMarketPrice - meta.previousClose,
        changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
        volume: meta.regularMarketVolume,
        marketCap: meta.marketCap,
        pe: meta.trailingPE,
        high52Week: meta.fiftyTwoWeekHigh,
        low52Week: meta.fiftyTwoWeekLow
      }
    } catch (error) {
      console.error('Yahoo Finance API error:', error)
      return null
    }
  }
}

// Combined Financial Data Service
export class FinancialDataService {
  private alphaVantage: AlphaVantageAPI | null = null
  private finnhub: FinnhubAPI | null = null
  private yahooFinance: YahooFinanceAPI = new YahooFinanceAPI()

  constructor() {
    if (process.env.ALPHA_VANTAGE_API_KEY) {
      this.alphaVantage = new AlphaVantageAPI(process.env.ALPHA_VANTAGE_API_KEY)
    }
    if (process.env.FINNHUB_API_KEY) {
      this.finnhub = new FinnhubAPI(process.env.FINNHUB_API_KEY)
    }
  }

  async getMarketData(symbol: string, isCrypto = false): Promise<MarketData> {
    let stockQuote: StockQuote | null = null
    let cryptoQuote: CryptoQuote | null = null
    let news: NewsItem[] = []

    try {
      if (isCrypto) {
        // Try Finnhub for crypto first
        if (this.finnhub) {
          cryptoQuote = await this.finnhub.getCryptoQuote(symbol)
        }
      } else {
        // Try multiple sources for stocks
        if (this.finnhub) {
          stockQuote = await this.finnhub.getStockQuote(symbol)
        }
        
        if (!stockQuote && this.alphaVantage) {
          stockQuote = await this.alphaVantage.getStockQuote(symbol)
        }
        
        if (!stockQuote) {
          stockQuote = await this.yahooFinance.getStockQuote(symbol)
        }
      }

      // Get news
      if (this.alphaVantage) {
        news = await this.alphaVantage.getNews([symbol])
      }

      // Calculate overall sentiment
      const sentiment = this.calculateSentiment(news, stockQuote, cryptoQuote)

      return {
        stock: stockQuote || undefined,
        crypto: cryptoQuote || undefined,
        news,
        sentiment: sentiment as { overall: 'bullish' | 'bearish' | 'neutral', score: number }
      }
    } catch (error) {
      console.error('Financial data service error:', error)
      return {
        stock: undefined,
        crypto: undefined,
        news: [],
        sentiment: { overall: 'neutral', score: 0 }
      }
    }
  }

  private calculateSentiment(
    news: NewsItem[], 
    stock?: StockQuote | null, 
    crypto?: CryptoQuote | null
  ) {
    let sentimentScore = 0
    let dataPoints = 0

    // Factor in news sentiment
    news.forEach(item => {
      const score = item.sentiment === 'positive' ? 1 : item.sentiment === 'negative' ? -1 : 0
      sentimentScore += score * item.relevanceScore
      dataPoints += item.relevanceScore
    })

    // Factor in price movement
    if (stock) {
      sentimentScore += stock.changePercent / 10 // Scale down percentage change
      dataPoints += 1
    }

    if (crypto) {
      sentimentScore += crypto.changePercent24h / 10
      dataPoints += 1
    }

    const finalScore = dataPoints > 0 ? sentimentScore / dataPoints : 0

    return {
      overall: finalScore > 0.1 ? 'bullish' : finalScore < -0.1 ? 'bearish' : 'neutral',
      score: Math.max(-1, Math.min(1, finalScore))
    }
  }

  getDataSources(): string[] {
    const sources = ['Yahoo Finance']
    if (this.alphaVantage) sources.push('Alpha Vantage')
    if (this.finnhub) sources.push('Finnhub')
    return sources
  }
}

// Singleton instance
export const financialDataService = new FinancialDataService()
