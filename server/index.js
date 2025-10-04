const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Mock market data store (in production, use Redis)
const marketData = new Map();
const subscribers = new Set();

// API Keys (in production, use environment variables)
const API_KEYS = {
  IEX: process.env.IEX_API_KEY || 'demo_key',
  POLYGON: process.env.POLYGON_API_KEY || 'demo_key',
  FINNHUB: process.env.FINNHUB_API_KEY || 'demo_key'
};

// Mock data for demonstration (in production, connect to real APIs)
const mockData = {
  'AAPL': { price: 175.43, change: 2.5, volume: 45000000 },
  'MSFT': { price: 378.85, change: 1.8, volume: 32000000 },
  'GOOGL': { price: 142.56, change: 0.9, volume: 28000000 },
  'TSLA': { price: 248.42, change: 3.2, volume: 45000000 },
  'AMZN': { price: 151.94, change: -0.5, volume: 35000000 },
  'NVDA': { price: 875.28, change: 4.2, volume: 45000000 },
  'BTC': { price: 43250.00, change: -1.2, volume: 25000000000 },
  'ETH': { price: 2650.00, change: -2.1, volume: 15000000000 },
  'SOL': { price: 98.45, change: 2.8, volume: 8000000000 }
};

// Simulate real-time price updates
function simulatePriceUpdates() {
  Object.keys(mockData).forEach(symbol => {
    const baseData = mockData[symbol];
    const priceChange = (Math.random() - 0.5) * 0.02; // ±1% random change
    const newPrice = baseData.price * (1 + priceChange);
    const newChange = ((newPrice - baseData.price) / baseData.price) * 100;
    
    const updatedData = {
      symbol,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(newChange.toFixed(2)),
      changePercent: parseFloat(newChange.toFixed(2)),
      volume: baseData.volume + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
    
    marketData.set(symbol, updatedData);
    
    // Broadcast to subscribers
    io.emit('marketUpdate', updatedData);
  });
}

// Start price simulation every 2 seconds
setInterval(simulatePriceUpdates, 2000);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('subscribe', (symbol) => {
    console.log(`Client ${socket.id} subscribed to ${symbol}`);
    socket.join(symbol);
    
    // Send current data immediately
    const currentData = marketData.get(symbol);
    if (currentData) {
      socket.emit('marketUpdate', currentData);
    }
  });
  
  socket.on('unsubscribe', (symbol) => {
    console.log(`Client ${socket.id} unsubscribed from ${symbol}`);
    socket.leave(symbol);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// REST API endpoints
app.get('/api/assets/:symbol/snapshot', (req, res) => {
  const { symbol } = req.params;
  const data = marketData.get(symbol.toUpperCase());
  
  if (data) {
    res.json({
      success: true,
      data
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Asset not found'
    });
  }
});

app.get('/api/assets/:symbol/history', (req, res) => {
  const { symbol } = req.params;
  
  // Generate mock historical data
  const history = [];
  const basePrice = mockData[symbol.toUpperCase()]?.price || 100;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: basePrice + (Math.random() - 0.5) * 20,
      volume: Math.floor(Math.random() * 1000000) + 100000
    });
  }
  
  res.json({
    success: true,
    data: history
  });
});

app.get('/api/portfolio/summary', (req, res) => {
  // Mock portfolio summary
  const portfolioSummary = {
    totalValue: 1000000,
    totalChange: 2.3,
    totalChangePercent: 2.3,
    assets: Array.from(marketData.entries()).map(([symbol, data]) => ({
      symbol,
      ...data,
      allocation: Math.random() * 20 + 5 // Mock allocation %
    }))
  };
  
  res.json({
    success: true,
    data: portfolioSummary
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    connectedClients: io.engine.clientsCount
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for connections`);
  
  // Initialize with mock data
  Object.keys(mockData).forEach(symbol => {
    const baseData = mockData[symbol];
    marketData.set(symbol, {
      symbol,
      price: baseData.price,
      change: baseData.change,
      changePercent: baseData.change,
      volume: baseData.volume,
      timestamp: new Date().toISOString()
    });
  });
});
