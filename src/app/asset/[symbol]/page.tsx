"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { 
  ArrowLeft,
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon,
  Activity,
  Calendar,
  BarChart3,
  ExternalLink,
  RefreshCw,
  Info,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import { motion } from "framer-motion"

export default function AssetDetailsPage() {
  const params = useParams()
  const symbol = params.symbol as string
  const [timeRange, setTimeRange] = useState('1M')
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for the asset
  const assetData = {
    symbol: symbol.toUpperCase(),
    name: getAssetName(symbol),
    currentPrice: getCurrentPrice(symbol),
    change: getAssetChange(symbol),
    investedAmount: getInvestedAmount(symbol),
    quantity: getQuantity(symbol),
    allocation: getAllocation(symbol),
    category: getCategory(symbol),
    volatility: getVolatility(symbol),
    marketCap: getMarketCap(symbol),
    volume: getVolume(symbol),
    high52Week: getHigh52Week(symbol),
    low52Week: getLow52Week(symbol),
    peRatio: getPERatio(symbol),
    dividendYield: getDividendYield(symbol)
  }

  // Generate historical data for the chart
  const generateHistoricalData = (range: string) => {
    const days = range === '1M' ? 30 : range === '3M' ? 90 : range === '6M' ? 180 : 365
    const data = []
    const startPrice = assetData.currentPrice
    const baseGrowth = 0.0008
    
    for (let i = 0; i <= days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i))
      const progress = i / days
      
      const randomNoise = (Math.random() - 0.5) * 0.02
      const dailyChange = baseGrowth + randomNoise
      const currentPrice: number = i === 0 ? startPrice : data[i - 1].price * (1 + dailyChange)
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(currentPrice * 100) / 100,
        change: ((currentPrice - startPrice) / startPrice) * 100
      })
    }
    
    return data
  }

  const historicalData = generateHistoricalData(timeRange)
  const isPositive = assetData.change >= 0

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#E5E8FF] mb-2">
                {assetData.name} ({assetData.symbol})
              </h1>
              <p className="text-[#E5E8FF]/70">
                {assetData.category} • {assetData.marketCap} Market Cap
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#E5E8FF]">
                ${assetData.currentPrice.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#00E0C6]' : 'text-[#ff3b30]'}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {formatPercentage(assetData.change)}
                <span className="text-[#E5E8FF]/60">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Price Performance
                  </CardTitle>
                  <div className="flex gap-2">
                    {['1M', '3M', '6M', '1Y'].map((range) => (
                      <Button
                        key={range}
                        variant={timeRange === range ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimeRange(range)}
                        className={timeRange === range ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"}
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00BFFF" stopOpacity={0.3}/>
                          <stop offset="100%" stopColor="#00BFFF" stopOpacity={0.02}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="2 4" stroke="#374151" opacity={0.15} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        }}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        formatter={(value: any) => [
                          <div key="tooltip" className="space-y-2">
                            <div className="font-bold text-lg text-white">${value}</div>
                            <div className="text-sm text-gray-400">
                              {new Date().toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        ]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.98)', 
                          border: '1px solid rgba(59, 130, 246, 0.4)',
                          borderRadius: '8px',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#00BFFF"
                        strokeWidth={2}
                        fill="url(#assetGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset Details */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Invested Amount:</span>
                    <span className="font-semibold">{formatCurrency(assetData.investedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quantity:</span>
                    <span className="font-semibold">{assetData.quantity.toFixed(assetData.quantity < 1 ? 3 : 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Allocation:</span>
                    <span className="font-semibold text-blue-400">{assetData.allocation}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Value:</span>
                    <span className="font-semibold">{formatCurrency(assetData.quantity * assetData.currentPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">P&L:</span>
                    <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency((assetData.quantity * assetData.currentPrice) - assetData.investedAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Market Cap:</span>
                    <span className="font-semibold">{assetData.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume (24h):</span>
                    <span className="font-semibold">{assetData.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">52W High:</span>
                    <span className="font-semibold text-green-400">${assetData.high52Week}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">52W Low:</span>
                    <span className="font-semibold text-red-400">${assetData.low52Week}</span>
                  </div>
                  {assetData.peRatio && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">P/E Ratio:</span>
                      <span className="font-semibold">{assetData.peRatio}</span>
                    </div>
                  )}
                  {assetData.dividendYield && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dividend Yield:</span>
                      <span className="font-semibold text-green-400">{assetData.dividendYield}%</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Risk Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Volatility:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={assetData.volatility} className="w-20 h-2" />
                      <span className="font-semibold">{assetData.volatility}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Level:</span>
                    <Badge className={getRiskLevelColor(assetData.volatility)}>
                      {getRiskLevel(assetData.volatility)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related News */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getRelatedNews(assetData.symbol).map((news, index) => (
                    <div key={index} className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white mb-1">{news.title}</h4>
                          <p className="text-xs text-slate-400">{news.source} • {news.time}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions for mock data
function getAssetName(symbol: string): string {
  const names: { [key: string]: string } = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'NVDA': 'NVIDIA Corporation',
    'META': 'Meta Platforms Inc.',
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'SOL': 'Solana',
    'AVAX': 'Avalanche',
    'MATIC': 'Polygon'
  }
  return names[symbol.toUpperCase()] || `${symbol} Asset`
}

function getCurrentPrice(symbol: string): number {
  const prices: { [key: string]: number } = {
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
  return prices[symbol.toUpperCase()] || 100.00
}

function getAssetChange(symbol: string): number {
  const changes: { [key: string]: number } = {
    'AAPL': 2.5,
    'MSFT': -1.2,
    'GOOGL': 3.8,
    'AMZN': -0.5,
    'TSLA': 5.2,
    'NVDA': 8.1,
    'META': -2.3,
    'BTC': 12.5,
    'ETH': 15.2,
    'SOL': 8.7,
    'AVAX': 6.3,
    'MATIC': 4.1
  }
  return changes[symbol.toUpperCase()] || 0.0
}

function getInvestedAmount(symbol: string): number {
  const amounts: { [key: string]: number } = {
    'AAPL': 25000,
    'MSFT': 18000,
    'GOOGL': 15000,
    'AMZN': 12000,
    'TSLA': 20000,
    'NVDA': 30000,
    'META': 8000,
    'BTC': 50000,
    'ETH': 25000,
    'SOL': 15000,
    'AVAX': 10000,
    'MATIC': 5000
  }
  return amounts[symbol.toUpperCase()] || 10000
}

function getQuantity(symbol: string): number {
  const invested = getInvestedAmount(symbol)
  const currentPrice = getCurrentPrice(symbol)
  return invested / currentPrice
}

function getAllocation(symbol: string): number {
  const allocations: { [key: string]: number } = {
    'AAPL': 8.5,
    'MSFT': 6.2,
    'GOOGL': 5.1,
    'AMZN': 4.1,
    'TSLA': 6.8,
    'NVDA': 10.2,
    'META': 2.7,
    'BTC': 17.0,
    'ETH': 8.5,
    'SOL': 5.1,
    'AVAX': 3.4,
    'MATIC': 1.7
  }
  return allocations[symbol.toUpperCase()] || 5.0
}

function getCategory(symbol: string): string {
  const categories: { [key: string]: string } = {
    'AAPL': 'Stocks',
    'MSFT': 'Stocks',
    'GOOGL': 'Stocks',
    'AMZN': 'Stocks',
    'TSLA': 'Stocks',
    'NVDA': 'Stocks',
    'META': 'Stocks',
    'BTC': 'Crypto',
    'ETH': 'Crypto',
    'SOL': 'Crypto',
    'AVAX': 'Crypto',
    'MATIC': 'Crypto'
  }
  return categories[symbol.toUpperCase()] || 'Stocks'
}

function getVolatility(symbol: string): number {
  const volatilities: { [key: string]: number } = {
    'AAPL': 25,
    'MSFT': 22,
    'GOOGL': 28,
    'AMZN': 30,
    'TSLA': 45,
    'NVDA': 35,
    'META': 32,
    'BTC': 65,
    'ETH': 55,
    'SOL': 70,
    'AVAX': 75,
    'MATIC': 80
  }
  return volatilities[symbol.toUpperCase()] || 30
}

function getMarketCap(symbol: string): string {
  const caps: { [key: string]: string } = {
    'AAPL': '$2.8T',
    'MSFT': '$3.1T',
    'GOOGL': '$1.8T',
    'AMZN': '$1.6T',
    'TSLA': '$780B',
    'NVDA': '$2.1T',
    'META': '$1.2T',
    'BTC': '$850B',
    'ETH': '$320B',
    'SOL': '$45B',
    'AVAX': '$13B',
    'MATIC': '$8B'
  }
  return caps[symbol.toUpperCase()] || '$100B'
}

function getVolume(symbol: string): string {
  const volumes: { [key: string]: string } = {
    'AAPL': '$8.2B',
    'MSFT': '$5.1B',
    'GOOGL': '$3.8B',
    'AMZN': '$4.2B',
    'TSLA': '$12.5B',
    'NVDA': '$15.8B',
    'META': '$2.1B',
    'BTC': '$25.2B',
    'ETH': '$18.5B',
    'SOL': '$1.8B',
    'AVAX': '$450M',
    'MATIC': '$280M'
  }
  return volumes[symbol.toUpperCase()] || '$1B'
}

function getHigh52Week(symbol: string): number {
  const highs: { [key: string]: number } = {
    'AAPL': 198.50,
    'MSFT': 450.00,
    'GOOGL': 155.80,
    'AMZN': 170.20,
    'TSLA': 280.00,
    'NVDA': 950.00,
    'META': 520.00,
    'BTC': 69000.00,
    'ETH': 4800.00,
    'SOL': 260.00,
    'AVAX': 147.00,
    'MATIC': 2.90
  }
  return highs[symbol.toUpperCase()] || 150.00
}

function getLow52Week(symbol: string): number {
  const lows: { [key: string]: number } = {
    'AAPL': 124.20,
    'MSFT': 309.45,
    'GOOGL': 83.34,
    'AMZN': 101.15,
    'TSLA': 101.81,
    'NVDA': 200.00,
    'META': 88.09,
    'BTC': 15500.00,
    'ETH': 1000.00,
    'SOL': 8.00,
    'AVAX': 8.78,
    'MATIC': 0.32
  }
  return lows[symbol.toUpperCase()] || 50.00
}

function getPERatio(symbol: string): string | null {
  const ratios: { [key: string]: string } = {
    'AAPL': '28.5',
    'MSFT': '32.1',
    'GOOGL': '24.8',
    'AMZN': '45.2',
    'TSLA': '65.3',
    'NVDA': '58.7',
    'META': '22.4'
  }
  return ratios[symbol.toUpperCase()] || null
}

function getDividendYield(symbol: string): string | null {
  const yields: { [key: string]: string | null } = {
    'AAPL': '0.5',
    'MSFT': '0.7',
    'GOOGL': null,
    'AMZN': null,
    'TSLA': null,
    'NVDA': '0.1',
    'META': null
  }
  return yields[symbol.toUpperCase()] || null
}

function getRiskLevel(volatility: number): string {
  if (volatility < 20) return 'Low'
  if (volatility < 40) return 'Moderate'
  if (volatility < 60) return 'High'
  return 'Very High'
}

function getRiskLevelColor(volatility: number): string {
  if (volatility < 20) return 'bg-green-600 text-white'
  if (volatility < 40) return 'bg-yellow-600 text-white'
  if (volatility < 60) return 'bg-orange-600 text-white'
  return 'bg-red-600 text-white'
}

function getRelatedNews(symbol: string): Array<{title: string, source: string, time: string}> {
  const news: { [key: string]: Array<{title: string, source: string, time: string}> } = {
    'AAPL': [
      { title: 'Apple Reports Strong Q4 Earnings', source: 'Reuters', time: '2 hours ago' },
      { title: 'iPhone 15 Sales Exceed Expectations', source: 'Bloomberg', time: '1 day ago' }
    ],
    'MSFT': [
      { title: 'Microsoft Azure Growth Accelerates', source: 'TechCrunch', time: '3 hours ago' },
      { title: 'Office 365 Subscriptions Reach New High', source: 'CNBC', time: '2 days ago' }
    ],
    'BTC': [
      { title: 'Bitcoin ETF Approval Expected Soon', source: 'CoinDesk', time: '1 hour ago' },
      { title: 'Institutional Bitcoin Adoption Grows', source: 'CryptoNews', time: '4 hours ago' }
    ]
  }
  return news[symbol.toUpperCase()] || [
    { title: 'Market Analysis Update', source: 'Financial Times', time: '2 hours ago' },
    { title: 'Industry Trends Report', source: 'MarketWatch', time: '1 day ago' }
  ]
}