/**
 * News Service - Live Implementation
 * Fetches and processes financial news with sentiment analysis
 */

import axios from 'axios'

export interface NewsItem {
  id: string
  symbol?: string
  title: string
  url: string
  publishedAt: Date
  sentiment: 'pos' | 'neg' | 'neutral'
  source: string
  summary?: string
  imageUrl?: string
}

export interface NewsSentiment {
  score: number // -1 to 1
  label: 'pos' | 'neg' | 'neutral'
  confidence: number
}

interface AlphaVantageNews {
  feed: Array<{
    title: string
    url: string
    time_published: string
    authors: string[]
    summary: string
    banner_image: string
    source: string
    category_within_source: string
    source_domain: string
    topics: Array<{
      topic: string
      relevance_score: string
    }>
    overall_sentiment_score: number
    overall_sentiment_label: string
    ticker_sentiment: Array<{
      ticker: string
      relevance_score: string
      ticker_sentiment_score: string
      ticker_sentiment_label: string
    }>
  }>
}

interface FinnhubNews {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

interface NewsAPIArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export class NewsService {
  private alphaVantageApiKey: string
  private finnhubApiKey: string
  private newsApiKey: string

  constructor() {
    this.alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY || ''
    this.finnhubApiKey = process.env.FINNHUB_API_KEY || ''
    this.newsApiKey = process.env.NEWS_API_KEY || ''
  }

  /**
   * Fetch news for specific symbols using multiple sources
   */
  async fetchNewsForSymbols(symbols: string[], limit = 10): Promise<NewsItem[]> {
    const allNews: NewsItem[] = []

    try {
      // Fetch from Alpha Vantage (best for stock sentiment)
      if (this.alphaVantageApiKey) {
        const alphaNews = await this.fetchAlphaVantageNews(symbols, limit)
        allNews.push(...alphaNews)
      }

      // Fetch from Finnhub (good for general market news)
      if (this.finnhubApiKey) {
        const finnhubNews = await this.fetchFinnhubNews(limit)
        allNews.push(...finnhubNews)
      }

      // Fetch from NewsAPI (general financial news)
      if (this.newsApiKey) {
        const newsApiNews = await this.fetchNewsAPIFinancial(symbols, limit)
        allNews.push(...newsApiNews)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    }

    // If no API keys are available, return mock data
    if (allNews.length === 0) {
      return this.getMockNews(symbols, limit)
    }

    // Remove duplicates and sort by date
    const uniqueNews = this.removeDuplicates(allNews)
    return uniqueNews
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit)
  }

  /**
   * Fetch general market news
   */
  async fetchMarketNews(limit = 20): Promise<NewsItem[]> {
    const marketSymbols = ['SPY', 'QQQ', 'BTC', 'ETH', 'AAPL', 'MSFT', 'GOOGL', 'AMZN']
    return this.fetchNewsForSymbols(marketSymbols, limit)
  }

  /**
   * Fetch news from Alpha Vantage
   */
  private async fetchAlphaVantageNews(symbols: string[], limit: number): Promise<NewsItem[]> {
    try {
      const tickers = symbols.join(',')
      const response = await axios.get<AlphaVantageNews>(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickers}&apikey=${this.alphaVantageApiKey}&limit=${limit}`,
        { timeout: 10000 }
      )

      if (!response.data.feed) {
        return []
      }

      return response.data.feed.map((article, index) => ({
        id: `av_${Date.now()}_${index}`,
        title: article.title,
        url: article.url,
        publishedAt: new Date(article.time_published.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6')),
        sentiment: this.mapSentimentLabel(article.overall_sentiment_label),
        source: article.source,
        summary: article.summary,
        imageUrl: article.banner_image,
        symbol: article.ticker_sentiment.length > 0 ? article.ticker_sentiment[0].ticker : undefined
      }))
    } catch (error) {
      console.error('Alpha Vantage API error:', error)
      return []
    }
  }

  /**
   * Fetch news from Finnhub
   */
  private async fetchFinnhubNews(limit: number): Promise<NewsItem[]> {
    try {
      const response = await axios.get<FinnhubNews[]>(
        `https://finnhub.io/api/v1/news?category=general&token=${this.finnhubApiKey}`,
        { timeout: 10000 }
      )

      return response.data.slice(0, limit).map((article) => ({
        id: `fh_${article.id}`,
        title: article.headline,
        url: article.url,
        publishedAt: new Date(article.datetime * 1000),
        sentiment: this.analyzeSentiment(article.headline + ' ' + article.summary).label,
        source: article.source,
        summary: article.summary,
        imageUrl: article.image,
        symbol: article.related
      }))
    } catch (error) {
      console.error('Finnhub API error:', error)
      return []
    }
  }

  /**
   * Fetch financial news from NewsAPI
   */
  private async fetchNewsAPIFinancial(symbols: string[], limit: number): Promise<NewsItem[]> {
    try {
      const query = symbols.length > 0 ? symbols.join(' OR ') : 'finance OR stock OR crypto'
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=reuters.com,bloomberg.com,cnbc.com,marketwatch.com,wsj.com&sortBy=publishedAt&pageSize=${limit}&apiKey=${this.newsApiKey}`,
        { timeout: 10000 }
      )

      if (!response.data.articles) {
        return []
      }

      return response.data.articles.map((article: NewsAPIArticle, index: number) => ({
        id: `na_${Date.now()}_${index}`,
        title: article.title,
        url: article.url,
        publishedAt: new Date(article.publishedAt),
        sentiment: this.analyzeSentiment(article.title + ' ' + (article.description || '')).label,
        source: article.source.name,
        summary: article.description || undefined,
        imageUrl: article.urlToImage || undefined
      }))
    } catch (error) {
      console.error('NewsAPI error:', error)
      return []
    }
  }

  /**
   * Analyze sentiment of news text
   */
  analyzeSentiment(text: string): NewsSentiment {
    const positiveWords = [
      'beats', 'record', 'growth', 'rises', 'milestone', 'success', 'high', 'optimism',
      'gains', 'surge', 'rally', 'breakthrough', 'profit', 'revenue', 'expansion',
      'upgrade', 'bullish', 'positive', 'strong', 'robust', 'solid', 'impressive'
    ]
    
    const negativeWords = [
      'pressure', 'decline', 'slows', 'competition', 'concerns', 'falls', 'crisis',
      'drops', 'plunge', 'crash', 'loss', 'deficit', 'recession', 'bearish',
      'negative', 'weak', 'poor', 'disappointing', 'warning', 'risk', 'threat'
    ]
    
    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length
    
    let score = 0
    let label: 'pos' | 'neg' | 'neutral' = 'neutral'
    
    if (positiveCount > negativeCount) {
      score = Math.min(0.8, positiveCount * 0.2)
      label = 'pos'
    } else if (negativeCount > positiveCount) {
      score = Math.max(-0.8, -negativeCount * 0.2)
      label = 'neg'
    }
    
    return {
      score,
      label,
      confidence: Math.abs(score) + 0.2
    }
  }

  /**
   * Get news sentiment summary for portfolio
   */
  async getPortfolioNewsSentiment(symbols: string[]): Promise<{
    positive: number
    negative: number
    neutral: number
    overall: 'pos' | 'neg' | 'neutral'
  }> {
    const news = await this.fetchNewsForSymbols(symbols, 50)
    
    const sentimentCounts = {
      positive: news.filter(item => item.sentiment === 'pos').length,
      negative: news.filter(item => item.sentiment === 'neg').length,
      neutral: news.filter(item => item.sentiment === 'neutral').length
    }
    
    let overall: 'pos' | 'neg' | 'neutral' = 'neutral'
    if (sentimentCounts.positive > sentimentCounts.negative) {
      overall = 'pos'
    } else if (sentimentCounts.negative > sentimentCounts.positive) {
      overall = 'neg'
    }
    
    return {
      ...sentimentCounts,
      overall
    }
  }

  /**
   * Map Alpha Vantage sentiment labels to our format
   */
  private mapSentimentLabel(label: string): 'pos' | 'neg' | 'neutral' {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('positive') || lowerLabel.includes('bullish')) {
      return 'pos'
    } else if (lowerLabel.includes('negative') || lowerLabel.includes('bearish')) {
      return 'neg'
    }
    return 'neutral'
  }

  /**
   * Remove duplicate news items
   */
  private removeDuplicates(news: NewsItem[]): NewsItem[] {
    const seen = new Set<string>()
    return news.filter(item => {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  /**
   * Fallback mock news when APIs are not available
   */
  private getMockNews(symbols: string[], limit: number): NewsItem[] {
    const mockNews: NewsItem[] = [
      {
        id: '1',
        symbol: 'AAPL',
        title: 'Apple Reports Record Q4 Earnings, Beats Wall Street Expectations',
        url: 'https://example.com/apple-earnings',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        sentiment: 'pos',
        source: 'Reuters',
        summary: 'Apple Inc. reported better-than-expected quarterly results driven by strong iPhone sales.'
      },
      {
        id: '2',
        symbol: 'BTC',
        title: 'Bitcoin Faces Regulatory Pressure as SEC Announces New Guidelines',
        url: 'https://example.com/bitcoin-sec',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        sentiment: 'neg',
        source: 'CoinDesk',
        summary: 'New SEC guidelines could impact cryptocurrency trading and institutional adoption.'
      },
      {
        id: '3',
        symbol: 'TSLA',
        title: 'Tesla Stock Rises on New Model Announcement and Production Milestone',
        url: 'https://example.com/tesla-model',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        sentiment: 'pos',
        source: 'Bloomberg',
        summary: 'Tesla announces new vehicle model and reaches significant production milestone.'
      }
    ]

    return mockNews.slice(0, limit)
  }
}

// Export singleton instance
export const newsService = new NewsService()
