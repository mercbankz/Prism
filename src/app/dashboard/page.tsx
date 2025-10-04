"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SetAlertDialog } from "@/components/SetAlertDialog"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { useRealtimePortfolio, formatCurrency as rtFormatCurrency, formatPercentage as rtFormatPercentage, getChangeColorClass } from '@/lib/realtime'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ReferenceLine
} from "recharts"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Calendar,
  Clock,
  Target,
  Activity,
  ExternalLink,
  ChevronLeft,
  RefreshCw,
  Info,
  Wifi,
  WifiOff
} from "lucide-react"

// TradingView-style realistic market data generation
const generatePortfolioData = (range: string) => {
  const days = range === '1M' ? 30 : range === '3M' ? 90 : range === '6M' ? 180 : 365
  const data = []
  const startValue = 1000000
  const baseGrowth = 0.0008 // Daily base growth rate
  
  // Market cycle parameters for realistic fluctuations
  const longCycle = Math.sin((Date.now() / (365 * 24 * 60 * 60 * 1000)) * 2 * Math.PI) * 0.0003
  const 
  mediumCycle = Math.sin((Date.now() / (90 * 24 * 60 * 60 * 1000)) * 2 * Math.PI) * 0.0005
  const shortCycle = Math.sin((Date.now() / (30 * 24 * 60 * 60 * 1000)) * 2 * Math.PI) * 0.0008
  
  for (let i = 0; i <= days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))
    const progress = i / days
    
    // Calculate time-based cycles
    const timeOffset = (days - i) * 24 * 60 * 60 * 1000
    const longWave = Math.sin((timeOffset / (365 * 24 * 60 * 60 * 1000)) * 2 * Math.PI) * 0.0003
    const mediumWave = Math.sin((timeOffset / (90 * 24 * 60 * 60 * 1000)) * 2 * Math.PI) * 0.0005
    const shortWave = Math.sin((timeOffset / (30 * 24 * 60 * 60 * 1000)) * 2 * Math.PI) * 0.0008
    
    // Random noise component
    const randomNoise = (Math.random() - 0.5) * 0.002
    
    // Volatility adjustment based on time range
    let volatilityMultiplier = 1
    if (range === '1Y') {
      volatilityMultiplier = progress < 0.25 ? 1.5 : progress < 0.5 ? 1.2 : progress < 0.75 ? 1.1 : 1.3
    } else if (range === '6M') {
      volatilityMultiplier = progress < 0.33 ? 1.3 : progress < 0.66 ? 1.1 : 1.0
    } else if (range === '3M') {
      volatilityMultiplier = progress < 0.5 ? 1.2 : 1.0
    }
    
    // Calculate daily change
    const dailyChange = (baseGrowth + longWave + mediumWave + shortWave + randomNoise) * volatilityMultiplier
    
    // Apply change to current value
    const currentValue: number = i === 0 ? startValue : data[i - 1].value * (1 + dailyChange)
    
    // Calculate total change from start
    const totalChange = ((currentValue - startValue) / startValue) * 100
    
    const changePercent = ((currentValue - startValue) / startValue) * 100
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue),
      change: Math.round(changePercent * 100) / 100,
      dailyChange: Math.round(dailyChange * 10000) / 100 // Daily % change
    })
  }
  
  return data
}

const portfolioData = [
  { 
    name: 'Stocks', 
    value: 400000, 
    color: '#7C3AED', // Purple for Stocks
    assets: [
      { name: 'Apple Inc.', symbol: 'AAPL', value: 80000, percentage: 20.0, change: 2.5 },
      { name: 'Microsoft Corp.', symbol: 'MSFT', value: 60000, percentage: 15.0, change: 1.8 },
      { name: 'Alphabet Inc.', symbol: 'GOOGL', value: 50000, percentage: 12.5, change: 0.9 },
      { name: 'Amazon.com Inc.', symbol: 'AMZN', value: 45000, percentage: 11.3, change: -0.5 },
      { name: 'Tesla Inc.', symbol: 'TSLA', value: 35000, percentage: 8.8, change: 3.2 },
      { name: 'Others', symbol: 'OTHER', value: 130000, percentage: 32.4, change: 1.1 }
    ]
  },
  { 
    name: 'Crypto', 
    value: 250000, 
    color: '#22C55E', // Green for Crypto
    assets: [
      { name: 'Bitcoin', symbol: 'BTC', value: 150000, percentage: 60.0, change: -1.2 },
      { name: 'Ethereum', symbol: 'ETH', value: 70000, percentage: 28.0, change: -2.1 },
      { name: 'Solana', symbol: 'SOL', value: 15000, percentage: 6.0, change: 2.8 },
      { name: 'Others', symbol: 'OTHER', value: 15000, percentage: 6.0, change: 0.8 }
    ]
  },
  { 
    name: 'Bonds', 
    value: 200000, 
    color: '#3B82F6', // Blue for Bonds
    assets: [
      { name: 'US Treasury 10Y', symbol: 'UST10Y', value: 100000, percentage: 50.0, change: 0.3 },
      { name: 'Corporate Bonds', symbol: 'CORP', value: 80000, percentage: 40.0, change: 0.5 },
      { name: 'Municipal Bonds', symbol: 'MUNI', value: 20000, percentage: 10.0, change: 0.2 }
    ]
  },
  { 
    name: 'Cash', 
    value: 100000, 
    color: '#F59E0B', // Yellow for Cash
    assets: [
      { name: 'High Yield Savings', symbol: 'HYSA', value: 60000, percentage: 60.0, change: 0.1 },
      { name: 'Money Market', symbol: 'MM', value: 40000, percentage: 40.0, change: 0.1 }
    ]
  },
  { 
    name: 'Real Estate', 
    value: 50000, 
    color: '#EF4444', // Red for Real Estate (original theme)
    assets: [
      { name: 'Real Estate Trust', symbol: 'REIT', value: 5000, percentage: 100.0, change: 1.2 }
    ]
  },
]

const entirePortfolio = [
  // Stock Holdings
  { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175.43, investedAmount: 12000, quantity: 68.4, change: 2.5, allocation: 15.0, category: 'Stocks' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', currentPrice: 378.85, investedAmount: 8500, quantity: 22.4, change: 1.8, allocation: 10.6, category: 'Stocks' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 142.56, investedAmount: 6000, quantity: 42.1, change: 0.9, allocation: 7.5, category: 'Stocks' },
  { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 248.42, investedAmount: 3500, quantity: 14.1, change: 3.2, allocation: 4.4, category: 'Stocks' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', currentPrice: 155.86, investedAmount: 2800, quantity: 18.0, change: -0.5, allocation: 3.5, category: 'Stocks' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', currentPrice: 875.28, investedAmount: 2200, quantity: 2.5, change: 5.1, allocation: 2.8, category: 'Stocks' },
  { symbol: 'META', name: 'Meta Platforms Inc.', currentPrice: 485.22, investedAmount: 1800, quantity: 3.7, change: 1.3, allocation: 2.3, category: 'Stocks' },
  { symbol: 'NFLX', name: 'Netflix Inc.', currentPrice: 612.77, investedAmount: 1200, quantity: 2.0, change: -2.1, allocation: 1.5, category: 'Stocks' },
  
  // Crypto Holdings
  { symbol: 'BTC', name: 'Bitcoin', currentPrice: 43250.00, investedAmount: 15000, quantity: 0.347, change: -1.2, allocation: 18.8, category: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', currentPrice: 2580.45, investedAmount: 7000, quantity: 2.71, change: -2.1, allocation: 8.8, category: 'Crypto' },
  { symbol: 'SOL', name: 'Solana', currentPrice: 98.76, investedAmount: 2500, quantity: 25.3, change: 2.8, allocation: 3.1, category: 'Crypto' },
  { symbol: 'AVAX', name: 'Avalanche', currentPrice: 35.62, investedAmount: 900, quantity: 25.3, change: 4.2, allocation: 1.1, category: 'Crypto' },
  { symbol: 'MATIC', name: 'Polygon', currentPrice: 0.89, investedAmount: 500, quantity: 561.8, change: 2.3, allocation: 0.6, category: 'Crypto' },
  { symbol: 'ADA', name: 'Cardano', currentPrice: 0.48, investedAmount: 400, quantity: 833.3, change: 1.5, allocation: 0.5, category: 'Crypto' },
  { symbol: 'DOT', name: 'Polkadot', currentPrice: 6.78, investedAmount: 350, quantity: 51.6, change: -0.8, allocation: 0.4, category: 'Crypto' },
  { symbol: 'LINK', name: 'Chainlink', currentPrice: 14.22, investedAmount: 300, quantity: 21.1, change: 0.7, allocation: 0.4, category: 'Crypto' },
  
  // Bond Holdings
  { symbol: 'UST10Y', name: 'US Treasury 10Y', currentPrice: 102.45, investedAmount: 5000, quantity: 48.8, change: 0.3, allocation: 6.3, category: 'Bonds' },
  { symbol: 'CORP', name: 'Corporate Bonds', currentPrice: 98.76, investedAmount: 4000, quantity: 40.5, change: 0.5, allocation: 5.0, category: 'Bonds' },
  { symbol: 'MUNI', name: 'Municipal Bonds', currentPrice: 101.23, investedAmount: 2000, quantity: 19.8, change: 0.2, allocation: 2.5, category: 'Bonds' },
  
  // Cash Holdings
  { symbol: 'HYSA', name: 'High Yield Savings', currentPrice: 1.00, investedAmount: 4000, quantity: 4000, change: 0.1, allocation: 5.0, category: 'Cash' },
  { symbol: 'MM', name: 'Money Market', currentPrice: 1.00, investedAmount: 2000, quantity: 2000, change: 0.1, allocation: 2.5, category: 'Cash' },
  
  // Real Estate Holdings
  { symbol: 'REIT', name: 'Real Estate Trust', currentPrice: 85.67, investedAmount: 5000, quantity: 58.4, change: 1.2, allocation: 6.3, category: 'Real Estate' },
]

const financialEvents = [
  {
    title: "FOMC Rate Decision",
    date: "Jan 31, 2024",
    type: "negative",
    description: "Federal Reserve interest rate announcement"
  },
  {
    title: "CPI Inflation Report",
    date: "Feb 14, 2024", 
    type: "neutral",
    description: "Consumer Price Index data release"
  },
  {
    title: "Tech Earnings Season",
    date: "Feb 20-28, 2024",
    type: "positive", 
    description: "Major tech companies Q4 earnings"
  },
  {
    title: "Jobs Report",
    date: "Mar 8, 2024",
    type: "neutral",
    description: "Non-farm payroll employment data"
  },
  {
    title: "Bitcoin Halving",
    date: "Apr 15, 2024",
    type: "positive",
    description: "Bitcoin block reward reduction event"
  }
]


const rebalanceSuggestions = [
  {
    id: 1,
    action: 'Reduce crypto allocation',
    reason: 'Current allocation exceeds recommended 20% threshold',
    impact: 'Risk reduction',
    priority: 'high',
    currentAllocation: 31.3,
    recommendedAllocation: 20.0,
    totalAmount: 11000,
    changes: [
      { 
        asset: 'Crypto', 
        from: 31.3, 
        to: 20.0, 
        amount: -11000,
        explanation: '$11,000 removed from Crypto to reduce risk exposure'
      },
      { 
        asset: 'Stocks', 
        from: 56.3, 
        to: 62.5, 
        amount: +6000,
        explanation: '$6,000 allocated to Stocks for continued growth potential'
      },
      { 
        asset: 'Bonds', 
        from: 18.8, 
        to: 22.5, 
        amount: +3000,
        explanation: '$3,000 moved to Bonds to increase stability'
      },
      { 
        asset: 'Cash', 
        from: 12.5, 
        to: 10.0, 
        amount: -2000,
        explanation: '$2,000 reduced from Cash to fund other allocations'
      }
    ],
    expectedImpact: 'Reduces portfolio volatility by 15% while maintaining growth potential',
    fundFlow: [
      { from: 'Crypto', to: 'Stocks', amount: 6000 },
      { from: 'Crypto', to: 'Bonds', amount: 3000 },
      { from: 'Cash', to: 'Stocks', amount: 2000 }
    ]
  },
  {
    id: 2,
    action: 'Increase bond exposure',
    reason: 'Low bond allocation may increase portfolio volatility',
    impact: 'Stability improvement',
    priority: 'medium',
    currentAllocation: 18.8,
    recommendedAllocation: 25.0,
    totalAmount: 5000,
    changes: [
      { 
        asset: 'Bonds', 
        from: 18.8, 
        to: 25.0, 
        amount: +5000,
        explanation: '$5,000 added to Bonds for increased stability'
      },
      { 
        asset: 'Stocks', 
        from: 56.3, 
        to: 52.5, 
        amount: -3000,
        explanation: '$3,000 reallocated from Stocks to Bonds'
      },
      { 
        asset: 'Cash', 
        from: 12.5, 
        to: 9.4, 
        amount: -2500,
        explanation: '$2,500 from Cash reserves to fund Bond purchase'
      }
    ],
    expectedImpact: 'Increases portfolio stability and provides better downside protection',
    fundFlow: [
      { from: 'Stocks', to: 'Bonds', amount: 3000 },
      { from: 'Cash', to: 'Bonds', amount: 2500 }
    ]
  },
  {
    id: 3,
    action: 'Portfolio stable — no rebalancing needed',
    reason: 'Current allocation is within optimal ranges',
    impact: 'Maintain current strategy',
    priority: 'low',
    currentAllocation: 0,
    recommendedAllocation: 0,
    totalAmount: 0,
    changes: [],
    expectedImpact: 'Continue monitoring for future rebalancing opportunities',
    fundFlow: []
  },
]

export default function Page() {
  const [selectedRange, setSelectedRange] = useState('1M')
  const [portfolioPerformanceData, setPortfolioPerformanceData] = useState(generatePortfolioData('1M'))
  
  // New state for interactive features
  const [selectedPieSlice, setSelectedPieSlice] = useState<string | null>(null)
  const [selectedRebalanceSuggestion, setSelectedRebalanceSuggestion] = useState<any>(null)
  const [showRebalanceConfirm, setShowRebalanceConfirm] = useState(false)
  
  // Alert management state
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [selectedEventForAlert, setSelectedEventForAlert] = useState<any>(null)
  const [userAlerts, setUserAlerts] = useState<any[]>([])
  
  // State for live portfolio data that can be updated
  const [livePortfolioData, setLivePortfolioData] = useState(portfolioData)
  const [rebalanceHistory, setRebalanceHistory] = useState<any[]>([])

  // Real-time data integration with safe fallback
  const portfolioSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NVDA', 'BTC', 'ETH', 'SOL']
  
  // Always call the hook, but handle SSR safely inside the hook
  const realtimeHook = useRealtimePortfolio(portfolioSymbols);
  const realtimeData = realtimeHook.data || new Map();
  const isConnected = realtimeHook.isConnected || false;
  const realtimeError = realtimeHook.error || null;

  useEffect(() => {
    setPortfolioPerformanceData(generatePortfolioData(selectedRange))
  }, [selectedRange])

  // SSR-safe localStorage access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRange = localStorage.getItem('portfolio-range')
      if (savedRange && ['1M', '3M', '6M', '1Y', 'ALL'].includes(savedRange)) {
        setSelectedRange(savedRange as '1M' | '3M' | '6M' | '1Y' | 'ALL')
      }
    }
  }, [])

  // Update portfolio data when real-time data changes
  useEffect(() => {
    if (realtimeData && realtimeData.size > 0) {
      const updatedPortfolioData = livePortfolioData.map(category => ({
        ...category,
        assets: category.assets.map(asset => {
          const realtimeAsset = realtimeData.get(asset.symbol)
          if (realtimeAsset) {
            const currentValue = realtimeAsset.price * (asset as any).quantity || asset.value
            return {
              ...asset,
              currentPrice: realtimeAsset.price,
              change: realtimeAsset.changePercent,
              value: currentValue
            }
          }
          return asset
        })
      }))
      setLivePortfolioData(updatedPortfolioData)
    }
  }, [realtimeData, livePortfolioData])

  // Function to apply rebalancing changes
  const applyRebalancing = (suggestion: any) => {
    const newPortfolioData = [...livePortfolioData]
    
    // Apply each change to the portfolio
    suggestion.changes.forEach((change: any) => {
      const assetIndex = newPortfolioData.findIndex(item => item.name === change.asset)
      if (assetIndex !== -1) {
        newPortfolioData[assetIndex] = {
          ...newPortfolioData[assetIndex],
          value: Math.max(0, newPortfolioData[assetIndex].value + change.amount)
        }
      }
    })
    
    // Update the live portfolio data
    setLivePortfolioData(newPortfolioData)
    
    // Add to rebalance history
    const historyEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action: suggestion.action,
      changes: suggestion.changes,
      beforeData: livePortfolioData,
      afterData: newPortfolioData
    }
    setRebalanceHistory(prev => [historyEntry, ...prev])
    
    setShowRebalanceConfirm(false)
    setSelectedRebalanceSuggestion(null)
  }

  const totalValue = livePortfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalChange = 2.3 // Mock change percentage
  const isPositive = totalChange >= 0

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6 bg-gradient-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#E5E8FF]">Portfolio Dashboard</h1>
          <p className="text-[#E5E8FF]/70">Track your investments and optimize your strategy</p>
        </div>
        <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#E5E8FF]/60" />
            <span className="text-sm text-[#E5E8FF]/60">
              {isConnected ? 'Live updates active' : 'Last updated 5 minutes ago'}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio Value with Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Total Portfolio Value
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#E5E8FF]">{formatCurrency(totalValue)}</div>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#00E0C6]' : 'text-[#ff3b30]'}`}>
                {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {formatPercentage(totalChange)}
                <span className="text-[#E5E8FF]/60">vs last month</span>
              </div>
            </div>
            <div className="flex gap-2">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRange(range)}
                  className={selectedRange === range ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="h-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* TradingView-style Portfolio Performance Chart */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={portfolioPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  syncId="portfolioChart"
                >
                <defs>
                  <linearGradient id="portfolioGradientPositive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="30%" stopColor="#3B82F6" stopOpacity={0.15}/>
                    <stop offset="70%" stopColor="#3B82F6" stopOpacity={0.08}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02}/>
                  </linearGradient>
                  <linearGradient id="portfolioGradientNegative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="30%" stopColor="#EF4444" stopOpacity={0.15}/>
                    <stop offset="70%" stopColor="#EF4444" stopOpacity={0.08}/>
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02}/>
                  </linearGradient>
                  <linearGradient id="portfolioGradientNeutral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B7280" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#6B7280" stopOpacity={0.02}/>
                  </linearGradient>
                  <linearGradient id="portfolioLinePositive" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="50%" stopColor="#2563EB"/>
                    <stop offset="100%" stopColor="#1D4ED8"/>
                  </linearGradient>
                  <linearGradient id="portfolioLineNegative" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EF4444"/>
                    <stop offset="50%" stopColor="#DC2626"/>
                    <stop offset="100%" stopColor="#B91C1C"/>
                  </linearGradient>
                  <linearGradient id="portfolioLineNeutral" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7C5CFF"/>
                    <stop offset="50%" stopColor="#6366F1"/>
                    <stop offset="100%" stopColor="#4F46E5"/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="2 4" 
                  stroke="#374151" 
                  opacity={0.15}
                  horizontal={true}
                  vertical={false}
                />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: '500' }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    const range = selectedRange || '1M'
                    if (range === '1M') {
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    } else if (range === '3M') {
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    } else if (range === '6M') {
                      return date.toLocaleDateString('en-US', { month: 'short' })
                    } else {
                      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                    }
                  }}
                  axisLine={{ stroke: '#374151', strokeWidth: 0.5 }}
                  tickLine={{ stroke: '#374151', strokeWidth: 0.5 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: '500' }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) {
                      return `$${(value / 1000000).toFixed(1)}M`
                    } else if (value >= 1000) {
                      return `$${(value / 1000).toFixed(0)}k`
                    }
                    return `$${value}`
                  }}
                  axisLine={{ stroke: '#374151', strokeWidth: 0.5 }}
                  tickLine={{ stroke: '#374151', strokeWidth: 0.5 }}
                  domain={['dataMin - 50000', 'dataMax + 50000']}
                />
                <Tooltip 
                  formatter={(value: any, name: string, props: any) => [
                    <div key="tooltip" className="space-y-3 min-w-[200px]">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400 font-medium">Portfolio Value</div>
                        <div className="text-xs text-gray-500">
                          {new Date(props.payload.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className="font-bold text-xl text-white">{formatCurrency(value)}</div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#E5E8FF]/60">Total Change</span>
                          <span className={`font-semibold ${props.payload.change >= 0 ? 'text-[#00BFFF]' : 'text-[#EF4444]'}`}>
                            {props.payload.change >= 0 ? '+' : ''}{props.payload.change.toFixed(2)}%
                          </span>
                        </div>
                        {props.payload.dailyChange !== undefined && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#E5E8FF]/60">Daily Change</span>
                            <span className={`font-semibold ${props.payload.dailyChange >= 0 ? 'text-[#00BFFF]' : 'text-[#EF4444]'}`}>
                              {props.payload.dailyChange >= 0 ? '+' : ''}{props.payload.dailyChange.toFixed(2)}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2 border-t border-gray-600">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${props.payload.change >= 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span className="text-xs text-gray-400">
                            {props.payload.change >= 0 ? 'Uptrend' : 'Downtrend'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.98)', 
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                    padding: '16px',
                    backdropFilter: 'blur(12px)'
                  }}
                  cursor={{ 
                    stroke: '#3B82F6', 
                    strokeWidth: 1, 
                    strokeDasharray: '4 4',
                    opacity: 0.6
                  }}
                />
                <Area
                  type="monotoneX" 
                  dataKey="value" 
                  stroke={portfolioPerformanceData[portfolioPerformanceData.length - 1]?.change >= 0 ? 
                    "url(#portfolioLinePositive)" : 
                    portfolioPerformanceData[portfolioPerformanceData.length - 1]?.change <= -5 ? 
                    "url(#portfolioLineNegative)" : 
                    "url(#portfolioLineNeutral)"
                  }
                  strokeWidth={2.5}
                  fill={portfolioPerformanceData[portfolioPerformanceData.length - 1]?.change >= 0 ? 
                    "url(#portfolioGradientPositive)" : 
                    portfolioPerformanceData[portfolioPerformanceData.length - 1]?.change <= -5 ?
                    "url(#portfolioGradientNegative)" :
                    "url(#portfolioGradientNeutral)"
                  }
                  dot={false}
                  connectNulls={false}
                  activeDot={{ 
                    r: 5, 
                    fill: portfolioPerformanceData[portfolioPerformanceData.length - 1]?.change >= 0 ? '#1E90FF' : '#EF4444',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    filter: `drop-shadow(0 0 8px ${portfolioPerformanceData[portfolioPerformanceData.length - 1]?.change >= 0 ? 'rgba(30, 144, 255, 0.8)' : 'rgba(239, 68, 68, 0.8)'})`,
                    style: { cursor: 'pointer' }
                  }}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
                />
                
                {/* Market Event Annotations */}
                {portfolioPerformanceData.map((point, index) => {
                  // Add major dip annotation (example: FOMC Rate Hike)
                  if (point.dailyChange && point.dailyChange <= -3) {
                    return (
                      <ReferenceLine 
                        key={`dip-${index}`}
                        x={point.date} 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        strokeDasharray="4 4"
                      />
                    )
                  }
                  // Add major spike annotation (example: Tech Rally)
                  if (point.dailyChange && point.dailyChange >= 4) {
                    return (
                      <ReferenceLine 
                        key={`spike-${index}`}
                        x={point.date} 
                        stroke="#22C55E" 
                        strokeWidth={2}
                        strokeDasharray="4 4"
                      />
                    )
                  }
                  return null
                })}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>

      {/* Charts and Assets */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Portfolio Allocation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Portfolio Allocation
              {selectedPieSlice && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPieSlice(null)}
                  className="ml-auto"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80 relative overflow-visible">
              {/* Portfolio Allocation Chart with Connection Lines */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedPieSlice ? livePortfolioData.find(d => d.name === selectedPieSlice)?.assets || [] : livePortfolioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={selectedPieSlice ? 70 : 80}
                    innerRadius={selectedPieSlice ? 20 : 0}
                    dataKey="value"
                    label={false}
                    labelLine={false}
                    onClick={(data) => {
                      if (!selectedPieSlice && data.name && livePortfolioData.find(d => d.name === data.name)?.assets) {
                        setSelectedPieSlice(data.name)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {(selectedPieSlice ? livePortfolioData.find(d => d.name === selectedPieSlice)?.assets || [] : livePortfolioData).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={selectedPieSlice ? 
                          `hsl(${index * 60}, 70%, 60%)` : 
                          (entry as any).color
                        } 
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: string, props: any) => [
                    <div key="tooltip" className="space-y-1">
                      <div className="font-semibold text-white">{formatCurrency(value)}</div>
                      <div className="text-sm text-cyan-300">
                        {selectedPieSlice ? `${selectedPieSlice} - ${name}` : name}
                      </div>
                      {selectedPieSlice && props.percentage && (
                        <div className="text-xs text-green-400">
                          {props.percentage.toFixed(1)}% of {selectedPieSlice}
                        </div>
                      )}
                      {!selectedPieSlice && (
                        <div className="text-xs text-green-400">
                          {((props.value / totalValue) * 100).toFixed(1)}% of portfolio
                        </div>
                      )}
                    </div>
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                    padding: '12px',
                    color: '#ffffff'
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Connection Lines and Outside Labels */}
              {!selectedPieSlice && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    {livePortfolioData.map((item, index) => {
                      const percentage = (item.value / totalValue) * 100
                      
                      // Calculate cumulative percentage for accurate positioning
                      const cumulativePercentage = livePortfolioData
                        .slice(0, index)
                        .reduce((sum, prevItem) => sum + (prevItem.value / totalValue) * 100, 0)
                      
                      // Calculate the middle angle of this slice
                      const startAngle = (cumulativePercentage / 100) * 360 - 90 // Start from top (-90 degrees)
                      const endAngle = ((cumulativePercentage + percentage) / 100) * 360 - 90
                      const middleAngle = (startAngle + endAngle) / 2
                      const radians = (middleAngle * Math.PI) / 180
                      
                      // Calculate positions with responsive adjustments
                      const centerX = 50
                      const centerY = 50
                      const pieRadius = 40 // Pie chart outer radius
                      const labelRadius = 48 // Distance from center to label
                      const labelOffset = 15
                      
                      // Start point on pie slice edge (outer edge)
                      const startX = centerX + pieRadius * Math.cos(radians)
                      const startY = centerY + pieRadius * Math.sin(radians)
                      
                      // End point for connection line
                      const endX = centerX + labelRadius * Math.cos(radians)
                      const endY = centerY + labelRadius * Math.sin(radians)
                      
                      // Label position with responsive adjustments
                      const labelX = centerX + (labelRadius + labelOffset) * Math.cos(radians)
                      const labelY = centerY + (labelRadius + labelOffset) * Math.sin(radians)
                      
                      // Adjust label positioning for better readability
                      const isRightSide = labelX > 50
                      const isBottomSide = labelY > 50
                      
                      return (
                        <g key={index}>
                          {/* Connection line with enhanced styling */}
                          <line
                            x1={`${startX}%`}
                            y1={`${startY}%`}
                            x2={`${endX}%`}
                            y2={`${endY}%`}
                            stroke={item.color}
                            strokeWidth="2.5"
                            opacity="0.9"
                            strokeDasharray="0"
                            className="portfolio-chart-lines transition-all duration-300 ease-in-out hover:opacity-100 hover:stroke-width-3"
                          />
                          
                          {/* Outside label with enhanced styling */}
                          <text
                            x={`${labelX}%`}
                            y={`${labelY}%`}
                            textAnchor={isRightSide ? "start" : "end"}
                            dominantBaseline={isBottomSide ? "auto" : "middle"}
                            fill={item.color}
                            fontSize="12"
                            fontWeight="800"
                            className="portfolio-chart-labels drop-shadow-lg select-none transition-all duration-200"
                            style={{ 
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))'
                            }}
                          >
                            {item.name} {percentage.toFixed(0)}%
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              )}
            </div>
            
            {/* Enhanced Category Legend with Connecting Lines */}
            {!selectedPieSlice && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-semibold text-white mb-3">Portfolio Allocation</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {livePortfolioData.map((item, index) => {
                    const percentage = ((item.value / totalValue) * 100).toFixed(0)
                    const categoryEmoji = {
                      'Stocks': '🟣',
                      'Crypto': '🟢', 
                      'Bonds': '🟩',
                      'Cash': '🟠',
                      'Real Estate': '🔴'
                    }[item.name] || '⚪'
                    
                    return (
                      <div key={index} className="relative group">
                        <div className="portfolio-hover-effect flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full border-2 border-white/20 shadow-sm"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-lg">{categoryEmoji}</span>
                            <span className="text-white font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-lg">{percentage}%</div>
                            <div className="text-xs text-gray-400">{formatCurrency(item.value)}</div>
                          </div>
                        </div>
                        
                        {/* Enhanced connecting line indicator with glow effect */}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-px h-2 bg-gradient-to-t from-transparent via-slate-400 to-slate-500 opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-px h-2 bg-gradient-to-t from-transparent via-blue-400 to-blue-500 opacity-0 group-hover:opacity-60 transition-opacity duration-200 blur-sm"></div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Total Portfolio Value with enhanced styling */}
                <div className="mt-4 pt-3 border-t border-slate-600">
                  <div className="flex justify-between items-center p-2 bg-slate-800/30 rounded-lg">
                    <span className="text-sm text-gray-400 font-medium">Total Portfolio Value</span>
                    <span className="text-lg font-bold text-white">{formatCurrency(totalValue)}</span>
                  </div>
                </div>
              </div>
            )}
            
            {selectedPieSlice && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-sm text-white">{selectedPieSlice} Breakdown</h4>
                <div className="space-y-1">
                  {livePortfolioData.find(d => d.name === selectedPieSlice)?.assets.map((asset, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                        />
                        <span className="text-cyan-300">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{formatCurrency(asset.value)}</div>
                        <div className={`text-xs ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>


        {/* Enhanced Financial Events & Alerts */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Financial Events & Alerts
            </CardTitle>
            <CardDescription>
              Automated quarterly events based on your portfolio assets with intelligent signal analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portfolio-Based Events */}
              <div className="space-y-3">
                <h4 className="font-semibold text-base mb-3">Q1 2024 Events Impacting Your Portfolio</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-4 border-green-500 hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">CPI Release</span>
                        <Badge className="bg-green-600 text-white text-xs">Positive 📈</Badge>
                      </div>
                      <div className="text-xs text-green-400 mb-1">Jan 15, 2024 • 8:30 AM EST</div>
                      <div className="text-xs text-slate-300">Impacts: AAPL, MSFT, BTC, Bonds</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400">Completed</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-4 border-blue-500 hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">Fed Meeting</span>
                        <Badge className="bg-slate-600 text-white text-xs">Neutral 📊</Badge>
                      </div>
                      <div className="text-xs text-blue-400 mb-1">Jan 31, 2024 • 2:00 PM EST</div>
                      <div className="text-xs text-slate-300">Impacts: Bonds, Cash, REIT, All Assets</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-400 border-blue-400">Upcoming</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs px-2 py-1 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                        onClick={() => {
                          setSelectedEventForAlert({
                            title: 'Fed Meeting',
                            date: 'Jan 31, 2024',
                            time: '2:00 PM EST',
                            status: 'upcoming',
                            signal: 'neutral',
                            impacts: 'Bonds, Cash, REIT, All Assets'
                          })
                          setShowAlertModal(true)
                        }}
                      >
                        Set Alert
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-4 border-green-500 hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">Tech Earnings Season</span>
                        <Badge className="bg-green-600 text-white text-xs">Positive 📈</Badge>
                      </div>
                      <div className="text-xs text-green-400 mb-1">Feb 5-15, 2024</div>
                      <div className="text-xs text-slate-300">Impacts: AAPL, MSFT, GOOGL, AMZN, NVDA, META</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400">Upcoming</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs px-2 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                        onClick={() => {
                          setSelectedEventForAlert({
                            title: 'Tech Earnings Season',
                            date: 'Feb 5-15, 2024',
                            time: 'Various times',
                            status: 'upcoming',
                            signal: 'positive',
                            impacts: 'AAPL, MSFT, GOOGL, AMZN, NVDA, META'
                          })
                          setShowAlertModal(true)
                        }}
                      >
                        Set Alert
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-4 border-green-500 hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">Bitcoin ETF Decision</span>
                        <Badge className="bg-green-600 text-white text-xs">Positive 📈</Badge>
                      </div>
                      <div className="text-xs text-green-400 mb-1">Feb 20, 2024 • 4:00 PM EST</div>
                      <div className="text-xs text-slate-300">Impacts: BTC, ETH, SOL, AVAX, MATIC</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400">Upcoming</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs px-2 py-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                        onClick={() => {
                          setSelectedEventForAlert({
                            title: 'Bitcoin ETF Decision',
                            date: 'Feb 20, 2024',
                            time: '4:00 PM EST',
                            status: 'upcoming',
                            signal: 'positive',
                            impacts: 'BTC, ETH, SOL, AVAX, MATIC'
                          })
                          setShowAlertModal(true)
                        }}
                      >
                        Set Alert
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border-l-4 border-red-500 hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 ease-out cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">Jobs Report</span>
                        <Badge className="bg-red-600 text-white text-xs">Negative 📉</Badge>
                      </div>
                      <div className="text-xs text-red-400 mb-1">Mar 8, 2024 • 8:30 AM EST</div>
                      <div className="text-xs text-slate-300">Impacts: All assets, Market volatility</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-red-400 border-red-400">Upcoming</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs px-2 py-1 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                        onClick={() => {
                          setSelectedEventForAlert({
                            title: 'Jobs Report',
                            date: 'Mar 8, 2024',
                            time: '8:30 AM EST',
                            status: 'upcoming',
                            signal: 'negative',
                            impacts: 'All assets, Market volatility'
                          })
                          setShowAlertModal(true)
                        }}
                      >
                        Set Alert
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Active Alerts */}
              <div className="space-y-3">
                <h4 className="font-semibold text-base mb-3">Your Active Alerts</h4>
                <div className="space-y-3">
                  {userAlerts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-medium mb-1">No alerts set</p>
                      <p className="text-xs">Set alerts for events impacting your portfolio</p>
                    </div>
                  ) : (
                    userAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-green-800">{alert.eventTitle}</span>
                            <Badge variant="outline" className="text-green-700 border-green-300 text-xs">
                              {alert.signal === 'positive' ? '📈' : alert.signal === 'negative' ? '📉' : '📊'}
                            </Badge>
                          </div>
                          <div className="text-xs text-green-600 mb-1">{alert.deliveryMethod} • {alert.date}</div>
                          <div className="text-xs text-green-700">{alert.impacts}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-700">Active</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-xs text-muted-foreground text-center">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Positive Signal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Negative Signal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Neutral Signal</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entire Portfolio */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Entire Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {entirePortfolio.map((asset, index) => (
                <Link 
                  key={index} 
                  href={`/asset/${asset.symbol}`}
                  className="block bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 hover:border-blue-400 hover:scale-[1.02] hover:shadow-blue-500/20 transition-all duration-300 ease-out cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-semibold">
                        {asset.symbol}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">${asset.currentPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className={`text-xs font-medium ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invested:</span>
                      <span className="text-white font-medium">{formatCurrency(asset.investedAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="text-white font-medium">{asset.quantity.toFixed(asset.quantity < 1 ? 3 : 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allocation:</span>
                      <span className="text-blue-400 font-medium">{asset.allocation}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Category:</span>
                      <div className="flex items-center gap-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          asset.category === 'Stocks' ? 'bg-purple-900/50 text-purple-300' :
                          asset.category === 'Crypto' ? 'bg-green-900/50 text-green-300' :
                          asset.category === 'Bonds' ? 'bg-emerald-900/50 text-emerald-300' :
                          asset.category === 'Cash' ? 'bg-orange-900/50 text-orange-300' :
                          'bg-red-900/50 text-red-300'
                        }`}>
                          {asset.category}
                        </span>
                        {asset.category === 'Crypto' && isConnected && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Live updating"></div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <div className="text-xs text-muted-foreground group-hover:text-white transition-colors">
                      Click to view details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk and Health Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-white">Balanced</div>
                  <div className="text-sm text-slate-300">Risk Score: 65/100</div>
                </div>
                <Badge className="bg-blue-600 text-white font-semibold px-3 py-1">
                  Advanced
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Progress value={65} className="h-4 bg-slate-700" />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Conservative</span>
                  <span className="font-medium text-blue-400">65/100</span>
                  <span>Aggressive</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-300">Current Level:</span>
                  <span className="font-semibold text-blue-400">Advanced (61-80)</span>
                </div>
                
                <div className="text-xs text-slate-400 space-y-2">
                  <div className="font-medium text-slate-300 mb-2">Risk Level Rankings:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between items-center p-1 rounded">
                      <span className="text-slate-400">0-20:</span>
                      <Badge variant="outline" className="text-red-400 border-red-400 text-xs">Poor</Badge>
                    </div>
                    <div className="flex justify-between items-center p-1 rounded">
                      <span className="text-slate-400">21-40:</span>
                      <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">Low</Badge>
                    </div>
                    <div className="flex justify-between items-center p-1 rounded">
                      <span className="text-slate-400">41-60:</span>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">Moderate</Badge>
                    </div>
                    <div className="flex justify-between items-center p-1 rounded bg-blue-900/20">
                      <span className="text-slate-300">61-80:</span>
                      <Badge className="bg-blue-600 text-white text-xs">Advanced</Badge>
                    </div>
                    <div className="flex justify-between items-center p-1 rounded">
                      <span className="text-slate-400">81-90:</span>
                      <Badge variant="outline" className="text-purple-400 border-purple-400 text-xs">Elite</Badge>
                    </div>
                    <div className="flex justify-between items-center p-1 rounded">
                      <span className="text-slate-400">91-100:</span>
                      <Badge variant="outline" className="text-green-400 border-green-400 text-xs">Expert</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Portfolio Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Good</span>
                <Badge variant="default" className="bg-green-600">Healthy</Badge>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Health score: 78/100</p>
              
              {/* AI Suggestion Box */}
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="text-xs text-blue-800">
                    <span className="font-medium">AI Tip:</span> Diversify your crypto exposure into stable assets to improve consistency. Not financial advice.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Above Average</span>
                <Badge variant="outline">+15.2%</Badge>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">vs Prism Leaderboard Average</p>
              <div className="text-xs text-muted-foreground mt-2 p-2 bg-slate-800/50 rounded">
                <div className="flex justify-between">
                  <span>Your Ranking:</span>
                  <span className="text-blue-400">Top 23%</span>
                </div>
                <div className="flex justify-between">
                  <span>Leaderboard Avg:</span>
                  <span>+8.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Performer:</span>
                  <span className="text-green-400">+24.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rebalancing Suggestions */}
      <motion.div 
        className="grid grid-cols-1 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {/* Rebalance Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Rebalance Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rebalanceSuggestions.map((suggestion, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{suggestion.action}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                    </div>
                    <Badge 
                      variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Expected impact: {suggestion.impact}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full group relative hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out"
                    onClick={() => {
                      setSelectedRebalanceSuggestion(suggestion)
                      setShowRebalanceConfirm(true)
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Apply Rebalancing
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Click to see detailed fund flow
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>


      {/* Rebalance Confirmation Modal */}
      <Dialog open={showRebalanceConfirm} onOpenChange={setShowRebalanceConfirm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Confirm Portfolio Rebalancing
            </DialogTitle>
            <DialogDescription>
              Review the proposed changes before applying them to your portfolio
            </DialogDescription>
          </DialogHeader>
          {selectedRebalanceSuggestion && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedRebalanceSuggestion.action}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedRebalanceSuggestion.reason}</p>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium mb-1">Expected Impact:</p>
                  <p className="text-sm text-muted-foreground">{selectedRebalanceSuggestion.expectedImpact}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Fund Flow Visualization</h4>
                <div className="space-y-3">
                  {selectedRebalanceSuggestion.fundFlow?.map((flow: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="font-medium text-red-600">{flow.from}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{formatCurrency(flow.amount)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="font-medium text-green-600">{flow.to}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Detailed Allocation Changes</h4>
                <div className="space-y-2">
                  {selectedRebalanceSuggestion.changes.map((change: any, index: number) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-md border-l-4 border-l-primary">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium">{change.asset}</span>
                          <div className="text-xs text-muted-foreground">
                            {change.from}% → {change.to}%
                          </div>
                        </div>
                        <div className={`font-bold text-lg ${change.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change.amount >= 0 ? '+' : ''}{formatCurrency(change.amount)}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{change.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowRebalanceConfirm(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => applyRebalancing(selectedRebalanceSuggestion)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Financial Events & Alerts */}
      <motion.div 
        className="grid grid-cols-1 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Financial Events & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${event.type === 'positive' ? 'bg-green-400' : event.type === 'negative' ? 'bg-red-400' : 'bg-gray-400'}`}></div>
                    <div>
                      <h4 className="font-medium text-white">{event.title}</h4>
                      <p className="text-sm text-gray-400">{event.date}</p>
                    </div>
                    <Badge 
                      variant={event.type === 'positive' ? 'default' : event.type === 'negative' ? 'destructive' : 'secondary'}
                      className={event.type === 'positive' ? 'bg-green-600' : event.type === 'negative' ? 'bg-red-600' : 'bg-gray-600'}
                    >
                      {event.type === 'positive' ? '📈' : event.type === 'negative' ? '📉' : '📊'} {event.type}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedEventForAlert(event)
                      setShowAlertModal(true)
                    }}
                    className="hover:scale-105 transition-all duration-200"
                  >
                    Set Alert
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Alert Creation Modal */}
      <SetAlertDialog 
        open={showAlertModal} 
        onOpenChange={setShowAlertModal}
        eventData={selectedEventForAlert}
      />
      </div>
    </ErrorBoundary>
  )
}