"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { useRealtimeAsset, formatCurrency as rtFormatCurrency, formatPercentage as rtFormatPercentage, getChangeColorClass } from '@/lib/realtime'
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
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  DollarSign,
  Activity,
  BarChart3,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info,
  Wifi,
  WifiOff
} from "lucide-react"

// Mock data for asset details
const getAssetData = (symbol: string) => {
  const assets = {
    'AAPL': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 175.43,
      investedAmount: 12000,
      quantity: 68.4,
      change: 2.5,
      allocation: 15.0,
      category: 'Stocks',
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
      marketCap: '2.8T',
      pe: 28.5,
      dividend: 0.96,
      volatility: 'Medium',
      performance: [
        { date: '2024-01-01', price: 170.12, volume: 45000000 },
        { date: '2024-01-02', price: 172.34, volume: 52000000 },
        { date: '2024-01-03', price: 171.89, volume: 48000000 },
        { date: '2024-01-04', price: 173.56, volume: 51000000 },
        { date: '2024-01-05', price: 174.23, volume: 49000000 },
        { date: '2024-01-06', price: 175.43, volume: 46000000 },
      ],
      news: [
        {
          title: 'Apple reports strong Q1 earnings',
          summary: 'Apple Inc. reported better-than-expected quarterly earnings driven by strong iPhone sales.',
          sentiment: 'positive',
          time: '2 hours ago',
          impact: 'high'
        },
        {
          title: 'Apple announces new AI features',
          summary: 'The company unveiled new artificial intelligence capabilities across its product lineup.',
          sentiment: 'positive',
          time: '1 day ago',
          impact: 'medium'
        }
      ]
    },
    'MSFT': {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      currentPrice: 378.85,
      investedAmount: 8500,
      quantity: 22.4,
      change: 1.8,
      allocation: 10.6,
      category: 'Stocks',
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
      marketCap: '2.8T',
      pe: 32.1,
      dividend: 0.75,
      volatility: 'Medium',
      performance: [
        { date: '2024-01-01', price: 372.50, volume: 32000000 },
        { date: '2024-01-02', price: 375.20, volume: 38000000 },
        { date: '2024-01-03', price: 374.80, volume: 35000000 },
        { date: '2024-01-04', price: 376.90, volume: 39000000 },
        { date: '2024-01-05', price: 377.50, volume: 36000000 },
        { date: '2024-01-06', price: 378.85, volume: 34000000 },
      ],
      news: [
        {
          title: 'Microsoft Azure growth accelerates',
          summary: 'Microsoft reports strong cloud revenue growth driven by Azure adoption.',
          sentiment: 'positive',
          time: '1 hour ago',
          impact: 'high'
        }
      ]
    },
    'GOOGL': {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      currentPrice: 142.56,
      investedAmount: 6000,
      quantity: 42.1,
      change: 0.9,
      allocation: 7.5,
      category: 'Stocks',
      description: 'Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.',
      marketCap: '1.7T',
      pe: 25.3,
      dividend: null,
      volatility: 'Medium',
      performance: [
        { date: '2024-01-01', price: 141.20, volume: 28000000 },
        { date: '2024-01-02', price: 141.80, volume: 32000000 },
        { date: '2024-01-03', price: 141.50, volume: 29000000 },
        { date: '2024-01-04', price: 142.10, volume: 31000000 },
        { date: '2024-01-05', price: 142.30, volume: 30000000 },
        { date: '2024-01-06', price: 142.56, volume: 27000000 },
      ],
      news: [
        {
          title: 'Google AI advancements drive growth',
          summary: 'Alphabet reports strong performance in AI and cloud services.',
          sentiment: 'positive',
          time: '2 hours ago',
          impact: 'medium'
        }
      ]
    },
    'TSLA': {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      currentPrice: 248.42,
      investedAmount: 3500,
      quantity: 14.1,
      change: 3.2,
      allocation: 4.4,
      category: 'Stocks',
      description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.',
      marketCap: '790B',
      pe: 65.2,
      dividend: null,
      volatility: 'High',
      performance: [
        { date: '2024-01-01', price: 240.80, volume: 45000000 },
        { date: '2024-01-02', price: 242.50, volume: 48000000 },
        { date: '2024-01-03', price: 245.20, volume: 52000000 },
        { date: '2024-01-04', price: 246.80, volume: 49000000 },
        { date: '2024-01-05', price: 247.50, volume: 47000000 },
        { date: '2024-01-06', price: 248.42, volume: 46000000 },
      ],
      news: [
        {
          title: 'Tesla delivery numbers exceed expectations',
          summary: 'Tesla reports record quarterly deliveries, beating analyst estimates.',
          sentiment: 'positive',
          time: '4 hours ago',
          impact: 'high'
        }
      ]
    },
    'BTC': {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 43250.00,
      investedAmount: 15000,
      quantity: 0.347,
      change: -1.2,
      allocation: 18.8,
      category: 'Crypto',
      description: 'Bitcoin is a decentralized digital currency without a central bank or single administrator.',
      marketCap: '850B',
      pe: null,
      dividend: null,
      volatility: 'High',
      performance: [
        { date: '2024-01-01', price: 42000, volume: 25000000000 },
        { date: '2024-01-02', price: 43500, volume: 28000000000 },
        { date: '2024-01-03', price: 42800, volume: 26000000000 },
        { date: '2024-01-04', price: 44100, volume: 29000000000 },
        { date: '2024-01-05', price: 43800, volume: 27000000000 },
        { date: '2024-01-06', price: 43250, volume: 25500000000 },
      ],
      news: [
        {
          title: 'Bitcoin ETF approval speculation grows',
          summary: 'Market analysts are increasingly optimistic about Bitcoin ETF approval following recent regulatory developments.',
          sentiment: 'positive',
          time: '3 hours ago',
          impact: 'high'
        },
        {
          title: 'Institutional Bitcoin adoption accelerates',
          summary: 'Major corporations continue to add Bitcoin to their treasury reserves.',
          sentiment: 'positive',
          time: '2 days ago',
          impact: 'medium'
        }
      ]
    },
    'ETH': {
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 2650.00,
      investedAmount: 7000,
      quantity: 2.64,
      change: -2.1,
      allocation: 8.8,
      category: 'Crypto',
      description: 'Ethereum is a decentralized platform that runs smart contracts.',
      marketCap: '320B',
      pe: null,
      dividend: null,
      volatility: 'High',
      performance: [
        { date: '2024-01-01', price: 2700, volume: 15000000000 },
        { date: '2024-01-02', price: 2680, volume: 16000000000 },
        { date: '2024-01-03', price: 2690, volume: 15500000000 },
        { date: '2024-01-04', price: 2670, volume: 16500000000 },
        { date: '2024-01-05', price: 2660, volume: 15800000000 },
        { date: '2024-01-06', price: 2650, volume: 15200000000 },
      ],
      news: [
        {
          title: 'Ethereum network upgrades continue',
          summary: 'Latest Ethereum improvements enhance scalability and reduce transaction costs.',
          sentiment: 'positive',
          time: '5 hours ago',
          impact: 'medium'
        }
      ]
    },
    'AMZN': {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      currentPrice: 151.94,
      investedAmount: 4500,
      quantity: 29.6,
      change: -0.5,
      allocation: 5.6,
      category: 'Stocks',
      description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.',
      marketCap: '1.6T',
      pe: 52.8,
      dividend: null,
      volatility: 'Medium',
      performance: [
        { date: '2024-01-01', price: 152.80, volume: 35000000 },
        { date: '2024-01-02', price: 152.50, volume: 38000000 },
        { date: '2024-01-03', price: 152.20, volume: 36000000 },
        { date: '2024-01-04', price: 151.80, volume: 39000000 },
        { date: '2024-01-05', price: 151.60, volume: 37000000 },
        { date: '2024-01-06', price: 151.94, volume: 34000000 },
      ],
      news: [
        {
          title: 'Amazon Web Services growth continues',
          summary: 'AWS reports strong quarterly performance with increased enterprise adoption.',
          sentiment: 'positive',
          time: '6 hours ago',
          impact: 'medium'
        }
      ]
    },
    'NVDA': {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      currentPrice: 875.28,
      investedAmount: 5500,
      quantity: 6.3,
      change: 4.2,
      allocation: 6.9,
      category: 'Stocks',
      description: 'NVIDIA Corporation operates as a computing company in the United States, Taiwan, China, Hong Kong, and internationally.',
      marketCap: '2.1T',
      pe: 65.4,
      dividend: 0.16,
      volatility: 'High',
      performance: [
        { date: '2024-01-01', price: 840.50, volume: 45000000 },
        { date: '2024-01-02', price: 850.20, volume: 48000000 },
        { date: '2024-01-03', price: 855.80, volume: 52000000 },
        { date: '2024-01-04', price: 860.50, volume: 49000000 },
        { date: '2024-01-05', price: 865.20, volume: 47000000 },
        { date: '2024-01-06', price: 875.28, volume: 46000000 },
      ],
      news: [
        {
          title: 'NVIDIA AI chip demand surges',
          summary: 'Strong demand for AI chips drives NVIDIA revenue growth.',
          sentiment: 'positive',
          time: '3 hours ago',
          impact: 'high'
        }
      ]
    }
  }
  
  return assets[symbol as keyof typeof assets] || null
}

export default function AssetDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params.symbol as string
  const [asset, setAsset] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Real-time data integration
  const { data: realtimeData, isConnected, error: realtimeError, lastUpdate } = useRealtimeAsset(symbol)

  useEffect(() => {
    const assetData = getAssetData(symbol)
    setAsset(assetData)
    setLoading(false)
  }, [symbol])

  // Update asset data when real-time data changes
  useEffect(() => {
    if (realtimeData && asset) {
      setAsset((prevAsset: any) => ({
        ...prevAsset,
        currentPrice: realtimeData.price,
        change: realtimeData.changePercent,
        timestamp: realtimeData.timestamp
      }))
    }
  }, [realtimeData, asset])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BFBFBF] mx-auto mb-4"></div>
          <p className="text-[#E5E8FF]/60">Loading asset details...</p>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#E5E8FF] mb-4">Asset Not Found</h1>
          <p className="text-[#E5E8FF]/60 mb-6">The asset "{symbol}" could not be found.</p>
          <Button onClick={() => router.back()} variant="outline" className="border-[#BFBFBF] text-[#BFBFBF] hover:bg-[#BFBFBF]/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const totalValue = asset.investedAmount
  const currentValue = asset.currentPrice * asset.quantity
  const profitLoss = currentValue - totalValue
  const profitLossPercent = (profitLoss / totalValue) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => router.back()} className="border-[#BFBFBF] text-[#BFBFBF] hover:bg-[#BFBFBF]/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-400" />
                  <Badge variant="outline" className="border-green-400 text-green-400">
                    LIVE
                  </Badge>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-400" />
                  <Badge variant="outline" className="border-red-400 text-red-400">
                    OFFLINE
                  </Badge>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-[#BFBFBF]/20 rounded-full flex items-center justify-center text-lg font-bold text-[#BFBFBF] border border-[#BFBFBF]/30">
                  {asset.symbol}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#E5E8FF]">{asset.name}</h1>
                  <p className="text-[#E5E8FF]/60">{asset.symbol} • {asset.category}</p>
                </div>
              </div>
              <p className="text-[#E5E8FF]/70 max-w-2xl">{asset.description}</p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-[#E5E8FF] mb-1">
                {asset.category === 'Crypto' ? `$${asset.currentPrice.toLocaleString()}` : `$${asset.currentPrice.toFixed(2)}`}
              </div>
              <div className={`flex items-center gap-1 text-sm ${asset.change >= 0 ? 'text-[#2E3A59]' : 'text-[#8B4513]'}`}>
                {asset.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {formatPercentage(asset.change)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(asset.investedAmount)}</div>
              <div className="text-xs text-muted-foreground">Quantity: {asset.quantity.toFixed(asset.quantity < 1 ? 3 : 0)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(currentValue)}</div>
              <div className="text-xs text-muted-foreground">Based on current price</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitLoss >= 0 ? '+' : ''}{formatCurrency(profitLoss)}
              </div>
              <div className={`text-xs ${profitLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitLossPercent >= 0 ? '+' : ''}{formatPercentage(profitLossPercent)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Portfolio Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{asset.allocation}%</div>
              <Progress value={asset.allocation} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts and Details */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Price Performance (7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={asset.performance}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: '#9CA3AF' }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#9CA3AF' }}
                      tickFormatter={(value) => asset.category === 'Crypto' ? `$${(value/1000).toFixed(0)}k` : `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                      formatter={(value: any) => [asset.category === 'Crypto' ? `$${value.toLocaleString()}` : `$${value.toFixed(2)}`, 'Price']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      fill="url(#colorGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Asset Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Asset Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
                  <div className="font-semibold">{asset.marketCap}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Volatility</div>
                  <Badge variant={asset.volatility === 'High' ? 'destructive' : asset.volatility === 'Medium' ? 'default' : 'secondary'}>
                    {asset.volatility}
                  </Badge>
                </div>
                {asset.pe && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">P/E Ratio</div>
                    <div className="font-semibold">{asset.pe}</div>
                  </div>
                )}
                {asset.dividend && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Dividend Yield</div>
                    <div className="font-semibold">{asset.dividend}%</div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Portfolio Allocation</span>
                  <span className="text-sm text-muted-foreground">{asset.allocation}%</span>
                </div>
                <Progress value={asset.allocation} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* News and Events */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Related News */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Related News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {asset.news.map((newsItem: any, index: number) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{newsItem.title}</h4>
                      <Badge 
                        variant={newsItem.sentiment === 'positive' ? 'default' : newsItem.sentiment === 'negative' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {newsItem.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{newsItem.summary}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{newsItem.time}</span>
                      <span className="capitalize">{newsItem.impact} impact</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Portfolio Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Performance Impact</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Your {asset.symbol} position has {profitLoss >= 0 ? 'contributed positively' : 'experienced losses'} to your portfolio, 
                    {profitLoss >= 0 ? ' adding' : ' reducing'} {formatCurrency(Math.abs(profitLoss))} in value.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Allocation Status</span>
                    <Badge variant={asset.allocation > 20 ? 'destructive' : asset.allocation > 10 ? 'default' : 'secondary'}>
                      {asset.allocation > 20 ? 'High' : asset.allocation > 10 ? 'Moderate' : 'Low'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge variant={asset.volatility === 'High' ? 'destructive' : asset.volatility === 'Medium' ? 'default' : 'secondary'}>
                      {asset.volatility}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Recommendation</span>
                    <span className="text-sm font-medium">
                      {asset.allocation > 20 ? 'Consider reducing position' : 
                       asset.allocation < 5 ? 'Consider increasing position' : 
                       'Position is well-balanced'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}