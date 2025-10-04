// Real-time market data service using public APIs
interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

interface YahooFinanceResponse {
  quoteResponse: {
    result: Array<{
      symbol: string;
      regularMarketPrice: number;
      regularMarketChange: number;
      regularMarketChangePercent: number;
      regularMarketVolume: number;
    }>;
  };
}

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
  };
}

// Yahoo Finance API for stocks
const getStockData = async (symbols: string[]): Promise<MarketData[]> => {
  try {
    // Using Yahoo Finance API (free tier)
    const symbolsParam = symbols.join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolsParam}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }
    
    const data: YahooFinanceResponse = await response.json();
    
    return data.quoteResponse.result.map(stock => ({
      symbol: stock.symbol,
      price: stock.regularMarketPrice,
      change: stock.regularMarketChange,
      changePercent: stock.regularMarketChangePercent,
      volume: stock.regularMarketVolume,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};

// CoinGecko API for crypto
const getCryptoData = async (symbols: string[]): Promise<MarketData[]> => {
  try {
    // Map symbols to CoinGecko IDs
    const symbolToId: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'SOL': 'solana',
      'ADA': 'cardano',
      'DOT': 'polkadot',
      'MATIC': 'matic-network',
      'AVAX': 'avalanche-2',
      'LINK': 'chainlink'
    };
    
    const ids = symbols.map(symbol => symbolToId[symbol]).filter(Boolean);
    if (ids.length === 0) return [];
    
    const idsParam = ids.join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data: CoinGeckoResponse = await response.json();
    
    return symbols.map(symbol => {
      const id = symbolToId[symbol];
      const cryptoData = data[id];
      
      if (!cryptoData) return null;
      
      return {
        symbol,
        price: cryptoData.usd,
        change: cryptoData.usd_24h_change,
        changePercent: cryptoData.usd_24h_change,
        volume: cryptoData.usd_24h_vol || 0,
        timestamp: new Date().toISOString()
      };
    }).filter(Boolean) as MarketData[];
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
};

// Combined market data fetcher
export const fetchMarketData = async (symbols: string[]): Promise<MarketData[]> => {
  const stockSymbols = symbols.filter(symbol => 
    !['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'MATIC', 'AVAX', 'LINK'].includes(symbol)
  );
  const cryptoSymbols = symbols.filter(symbol => 
    ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'MATIC', 'AVAX', 'LINK'].includes(symbol)
  );
  
  const [stockData, cryptoData] = await Promise.all([
    stockSymbols.length > 0 ? getStockData(stockSymbols) : Promise.resolve([]),
    cryptoSymbols.length > 0 ? getCryptoData(cryptoSymbols) : Promise.resolve([])
  ]);
  
  return [...stockData, ...cryptoData];
};

// Mock data fallback for development
export const getMockMarketData = (symbols: string[]): MarketData[] => {
  const mockPrices: { [key: string]: number } = {
    'AAPL': 175.43,
    'MSFT': 378.85,
    'GOOGL': 142.56,
    'TSLA': 248.42,
    'AMZN': 151.94,
    'NVDA': 875.28,
    'BTC': 43250.00,
    'ETH': 2650.00,
    'SOL': 98.45
  };
  
  return symbols.map(symbol => {
    const basePrice = mockPrices[symbol] || 100;
    const change = (Math.random() - 0.5) * 0.05; // ±2.5% random change
    const newPrice = basePrice * (1 + change);
    const changePercent = (change * 100);
    
    return {
      symbol,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(changePercent.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      timestamp: new Date().toISOString()
    };
  });
};

// Rate limiter for API calls
class RateLimiter {
  private calls: number[] = [];
  private maxCalls: number;
  private windowMs: number;
  
  constructor(maxCalls: number, windowMs: number) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
  }
  
  async wait(): Promise<void> {
    const now = Date.now();
    
    // Remove old calls outside the window
    this.calls = this.calls.filter(callTime => now - callTime < this.windowMs);
    
    // If we're at the limit, wait
    if (this.calls.length >= this.maxCalls) {
      const oldestCall = Math.min(...this.calls);
      const waitTime = this.windowMs - (now - oldestCall);
      
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return this.wait(); // Recursive call after waiting
      }
    }
    
    // Record this call
    this.calls.push(now);
  }
}

// Create rate limiters for different APIs
const yahooRateLimiter = new RateLimiter(10, 60000); // 10 calls per minute
const coinGeckoRateLimiter = new RateLimiter(30, 60000); // 30 calls per minute

// Rate-limited API calls
export const fetchMarketDataWithRateLimit = async (symbols: string[]): Promise<MarketData[]> => {
  try {
    // Use mock data in development or if APIs fail
    if (process.env.NODE_ENV === 'development') {
      return getMockMarketData(symbols);
    }
    
    const stockSymbols = symbols.filter(symbol => 
      !['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'MATIC', 'AVAX', 'LINK'].includes(symbol)
    );
    const cryptoSymbols = symbols.filter(symbol => 
      ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'MATIC', 'AVAX', 'LINK'].includes(symbol)
    );
    
    const [stockData, cryptoData] = await Promise.all([
      stockSymbols.length > 0 ? (async () => {
        await yahooRateLimiter.wait();
        return getStockData(stockSymbols);
      })() : Promise.resolve([]),
      cryptoSymbols.length > 0 ? (async () => {
        await coinGeckoRateLimiter.wait();
        return getCryptoData(cryptoSymbols);
      })() : Promise.resolve([])
    ]);
    
    return [...stockData, ...cryptoData];
  } catch (error) {
    console.error('Error fetching market data, using mock data:', error);
    return getMockMarketData(symbols);
  }
};
