"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatPercentage } from "@/lib/utils"
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
  Legend
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
  Calendar,
  Clock,
  Target,
  Activity
} from "lucide-react"

// Mock data generation functions
const generatePortfolioData = (range: string) => {
  const days = range === '1M' ? 30 : range === '3M' ? 90 : range === '6M' ? 180 : 365
  const data = []
  const startValue = 100000
  let currentValue = startValue
  
  for (let i = 0; i <= days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))
    
    // Add some realistic volatility
    const change = (Math.random() - 0.5) * 0.02
    currentValue = currentValue * (1 + change)
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(currentValue),
      change: Math.round((currentValue - startValue) / startValue * 100 * 100) / 100
    })
  }
  
  return data
}

const portfolioData = [
  { name: 'Stocks', value: 45000, color: '#7C5CFF' },
  { name: 'Crypto', value: 25000, color: '#00E6A8' },
  { name: 'Bonds', value: 15000, color: '#2DD4BF' },
  { name: 'Cash', value: 10000, color: '#F59E0B' },
  { name: 'REITs', value: 5000, color: '#EF4444' },
]

const topHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', value: 12000, change: 2.5, allocation: 15.0 },
  { symbol: 'BTC', name: 'Bitcoin', value: 15000, change: -1.2, allocation: 18.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', value: 8500, change: 1.8, allocation: 10.6 },
  { symbol: 'ETH', name: 'Ethereum', value: 7000, change: -2.1, allocation: 8.8 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 6000, change: 0.9, allocation: 7.5 },
]

const newsItems = [
  {
    title: 'Market volatility continues as inflation concerns persist',
    sentiment: 'negative',
    time: '2 hours ago',
    impact: 'medium'
  },
  {
    title: 'Tech stocks rally on strong earnings reports',
    sentiment: 'positive',
    time: '4 hours ago',
    impact: 'high'
  },
  {
    title: 'Fed hints at potential rate cuts in Q2',
    sentiment: 'positive',
    time: '6 hours ago',
    impact: 'high'
  },
  {
    title: 'Bitcoin reaches new monthly high',
    sentiment: 'positive',
    time: '8 hours ago',
    impact: 'medium'
  },
]

const rebalanceSuggestions = [
  {
    action: 'Reduce crypto allocation',
    reason: 'Current allocation exceeds recommended 20% threshold',
    impact: 'Risk reduction',
    priority: 'high'
  },
  {
    action: 'Increase bond exposure',
    reason: 'Low bond allocation may increase portfolio volatility',
    impact: 'Stability improvement',
    priority: 'medium'
  },
  {
    action: 'Consider international diversification',
    reason: 'Portfolio is heavily weighted toward US markets',
    impact: 'Geographic diversification',
    priority: 'low'
  },
]

export default function Page() {
  const [selectedRange, setSelectedRange] = useState('1M')
  const [portfolioPerformanceData, setPortfolioPerformanceData] = useState(generatePortfolioData('1M'))

  useEffect(() => {
    setPortfolioPerformanceData(generatePortfolioData(selectedRange))
  }, [selectedRange])

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalChange = 2.3 // Mock change percentage
  const isPositive = totalChange >= 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
          <p className="text-muted-foreground">Track your investments and optimize your strategy</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last updated 5 minutes ago</span>
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
              <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {formatPercentage(totalChange)}
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
            <div className="flex gap-2">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), 'Portfolio Value']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Assets */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Portfolio Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Portfolio Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [formatCurrency(value), 'Value']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Holdings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Top Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topHoldings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-semibold">
                      {holding.symbol}
                    </div>
                    <div>
                      <div className="font-medium">{holding.name}</div>
                      <div className="text-sm text-muted-foreground">{formatCurrency(holding.value)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </div>
                    <div className="text-xs text-muted-foreground">{holding.allocation}%</div>
                  </div>
                </div>
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Moderate</span>
                <Badge variant="secondary">Balanced</Badge>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">Risk score: 65/100</p>
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
                <Badge variant="outline">+12.5%</Badge>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">vs S&P 500</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* News and Rebalancing */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {/* Market News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Market News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsItems.map((news, index) => (
                <div key={index} className="border-l-4 border-l-primary pl-4 space-y-1">
                  <p className="text-sm font-medium">{news.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge 
                      variant={news.sentiment === 'positive' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {news.sentiment}
                    </Badge>
                    <span>{news.time}</span>
                    <span className="capitalize">{news.impact} impact</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}