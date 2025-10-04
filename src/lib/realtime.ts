import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchMarketDataWithRateLimit } from './marketData';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

interface WebSocketHook {
  data: MarketData | null;
  isConnected: boolean;
  error: string | null;
  lastUpdate: string | null;
}

// Safe WebSocket URL with fallback
const getWSURL = () => {
  if (typeof window === 'undefined') return null;
  return process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
};

export const useRealtimeAsset = (symbol: string): WebSocketHook => {
  const [data, setData] = useState<MarketData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        setError('WebSocket not available in server environment');
        return;
      }

      // Check if WebSocket is supported
      if (typeof WebSocket === 'undefined') {
        setError('WebSocket not supported in this environment');
        return;
      }

      const wsURL = getWSURL();
      if (!wsURL) {
        setError('WebSocket URL not configured');
        return;
      }
      
      const ws = new WebSocket(wsURL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log(`WebSocket connected for ${symbol}`);
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
        
        // Subscribe to the symbol
        ws.send(JSON.stringify({ type: 'subscribe', symbol: symbol.toUpperCase() }));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.symbol === symbol.toUpperCase()) {
            setData(message);
            setLastUpdate(new Date().toISOString());
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onclose = (event) => {
        console.log(`WebSocket closed for ${symbol}:`, event.code, event.reason);
        setIsConnected(false);
        
        // Attempt reconnection with exponential backoff
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.pow(2, reconnectAttempts.current) * 1000;
          console.log(`Reconnecting in ${delay}ms...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++;
            connect();
          }, delay);
        } else {
          setError('Connection lost. Please refresh the page.');
        }
      };

      ws.onerror = (err) => {
        console.error(`WebSocket error for ${symbol}:`, err);
        setError('Connection error occurred');
      };

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError('Failed to connect to real-time data');
    }
  }, [symbol]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol.toUpperCase() }));
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setIsConnected(false);
  }, [symbol]);

  useEffect(() => {
    // Only connect in browser environment
    if (typeof window !== 'undefined') {
      connect();
    }
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    data,
    isConnected,
    error,
    lastUpdate
  };
};

// Hook for multiple assets with polling-based updates
export const useRealtimePortfolio = (symbols: string[]) => {
  const [portfolioData, setPortfolioData] = useState<Map<string, MarketData>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (isPollingRef.current) return;
    
    try {
      isPollingRef.current = true;
      const data = await fetchMarketDataWithRateLimit(symbols);
      
      if (data.length > 0) {
        const newDataMap = new Map<string, MarketData>();
        data.forEach(item => {
          newDataMap.set(item.symbol, item);
        });
        
        setPortfolioData(newDataMap);
        setIsConnected(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to fetch market data');
      setIsConnected(false);
    } finally {
      isPollingRef.current = false;
    }
  }, [symbols]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;
    
    // Initial fetch
    fetchData();
    
    // Check if we have crypto assets for more frequent updates
    const hasCrypto = symbols.some(symbol => ['BTC', 'ETH', 'SOL'].includes(symbol));
    const interval = hasCrypto ? 15000 : 30000; // 15 seconds for crypto, 30 seconds for stocks
    
    // Set up polling
    intervalRef.current = setInterval(fetchData, interval);
    setIsConnected(true);
  }, [fetchData, symbols]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsConnected(false);
  }, []);

  useEffect(() => {
    // Only start polling in browser environment and if symbols array is not empty
    if (typeof window !== 'undefined' && symbols.length > 0) {
      startPolling();
    }
    
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling, symbols]);

  return {
    data: portfolioData,
    isConnected,
    error
  };
};

// Utility function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Utility function to format percentage
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Utility function to get change color class
export const getChangeColorClass = (change: number): string => {
  return change >= 0 ? 'text-green-600' : 'text-red-600';
};