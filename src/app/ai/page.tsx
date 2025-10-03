"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { financialDataService, type MarketData } from "@/lib/financial-apis"
import { 
  Bot, 
  Send, 
  User, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  Lightbulb,
  BookOpen,
  TrendingDown,
  ExternalLink,
  Loader2,
  RefreshCw,
  Info
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  marketData?: MarketData
  dataSources?: string[]
  isLoading?: boolean
}

// Portfolio context
const portfolioContext = {
  totalValue: 125000,
  healthScore: 78,
  topHolding: "BTC",
  riskLevel: "Moderate",
  recentNews: "Bitcoin volatility increases"
}

// Enhanced AI response generator with live data
const generateAIResponse = async (userMessage: string, marketData?: MarketData): Promise<string> => {
  const message = userMessage.toLowerCase()
  
  // Check if user is asking about specific assets
  const assetMatches = userMessage.match(/\b([A-Z]{1,5})\b/g)
  const symbols = assetMatches || []
  
  let response = ""
  
  if (marketData) {
    const { stock, crypto, news, sentiment } = marketData
    
    if (message.includes('price') || message.includes('value') || message.includes('quote')) {
      if (stock) {
        response = `Based on live market data, ${stock.symbol} is currently trading at ${formatCurrency(stock.price)} `
        response += stock.change > 0 ? '(up' : '(down'
        response += ` ${formatPercentage(Math.abs(stock.changePercent))} today). `
        response += `Volume: ${stock.volume.toLocaleString()} shares. `
        if (stock.marketCap) {
          response += `Market cap: ${formatCurrency(stock.marketCap)}. `
        }
        response += `Overall sentiment is ${sentiment.overall} with a score of ${sentiment.score.toFixed(2)}.`
      } else if (crypto) {
        response = `${crypto.symbol} is currently at ${formatCurrency(crypto.price)} `
        response += crypto.change24h > 0 ? '(up' : '(down'
        response += ` ${formatPercentage(Math.abs(crypto.changePercent24h))} in 24h). `
        response += `24h volume: ${formatCurrency(crypto.volume24h)}. `
        response += `Market sentiment is ${sentiment.overall}.`
      }
    } else if (message.includes('analysis') || message.includes('insight') || message.includes('trend')) {
      response = `Here's my analysis based on current market data:\n\n`
      if (stock || crypto) {
        const asset = stock || crypto
        response += `• Current price: ${formatCurrency(asset?.price || 0)}\n`
        response += `• Price movement: ${(asset as any)?.change > 0 ? 'Bullish' : 'Bearish'} trend\n`
        response += `• Market sentiment: ${sentiment.overall} (${sentiment.score.toFixed(2)})\n`
      }
      response += `\nRecent news sentiment analysis shows ${news.filter(n => n.sentiment === 'positive').length} positive, ${news.filter(n => n.sentiment === 'negative').length} negative stories. `
      response += `This suggests ${sentiment.overall} market conditions. Consider your risk tolerance and investment timeline.`
    } else if (message.includes('news') || message.includes('update')) {
      response = `Here are the latest market updates:\n\n`
      news.slice(0, 3).forEach((item, index) => {
        response += `${index + 1}. ${item.title}\n`
        response += `   Sentiment: ${item.sentiment} | Source: ${item.source}\n\n`
      })
      response += `Overall market sentiment: ${sentiment.overall}`
    } else {
      response = `Based on current market conditions, I can see ${sentiment.overall} sentiment with a score of ${sentiment.score.toFixed(2)}. `
      if (stock) {
        response += `${stock.symbol} is at ${formatCurrency(stock.price)} with ${formatPercentage(stock.changePercent)} change today. `
      }
      response += `Would you like me to dive deeper into specific aspects of this analysis?`
    }
  } else {
    // Fallback responses when no market data
    const fallbackResponses = [
      "I'd be happy to provide detailed analysis! Please specify which asset or topic you'd like me to analyze, and I'll fetch the latest market data.",
      "To give you the most accurate insights, please mention a specific stock symbol (like AAPL, TSLA) or crypto (like BTC, ETH) you're interested in.",
      "I can analyze current market conditions, provide price updates, sentiment analysis, and news summaries. What would you like to explore?",
      "Based on your portfolio context, I notice you have exposure to both traditional and digital assets. Would you like me to analyze any specific holdings or market trends?"
    ]
    response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
  
  return response
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Prism AI Assistant with live market data integration. I can provide real-time analysis of stocks, crypto, and market sentiment. Try asking about a specific asset like 'What's the current price of AAPL?' or 'Analyze BTC trends'.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Extract symbols from user message
      const symbolMatches = input.match(/\b([A-Z]{1,5})\b/g)
      const symbols = symbolMatches || []
      
      let marketData: MarketData | undefined
      let dataSources: string[] = []
      
      // Fetch market data for mentioned symbols
      if (symbols.length > 0) {
        const symbol = symbols[0] // Focus on first mentioned symbol
        const isCrypto = ['BTC', 'ETH', 'ADA', 'DOT', 'LINK', 'UNI', 'AAVE'].includes(symbol || '')
        
        marketData = await financialDataService.getMarketData(symbol || '', isCrypto)
        dataSources = financialDataService.getDataSources()
      }
      
      // Generate AI response with live data
      const responseContent = await generateAIResponse(input, marketData)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        marketData,
        dataSources
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setLastRefresh(new Date())
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error fetching live market data. Please try again in a moment, or ask about general investing concepts.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="w-8 h-8 text-primary" />
          Prism AI Assistant
        </h1>
        <p className="text-muted-foreground">Your personal investing education companion</p>
      </div>

      {/* Compliance Banner */}
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Educational Content Only
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This AI provides analytics and educational information only. Not financial advice. 
              Always consult with qualified professionals for investment decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Portfolio Context Cards */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Portfolio Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="font-medium">{formatCurrency(portfolioContext.totalValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Health Score</span>
                <Badge variant="outline">{portfolioContext.healthScore}/100</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <Badge variant="secondary">{portfolioContext.riskLevel}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Top Holding</span>
                <span className="font-medium">{portfolioContext.topHolding}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setInput("Explain my portfolio health score")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze Portfolio
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setInput("What is diversification and why is it important?")}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Learn Concepts
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setInput("How do market trends affect my holdings?")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Market Insights
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setInput("Recommend educational resources for beginners")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Study Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Chat with AI Assistant</CardTitle>
              <CardDescription>
                Ask questions about your portfolio, investing concepts, or market analysis
              </CardDescription>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      
                      {/* Market Data Display */}
                      {message.marketData && message.role === 'assistant' && (
                        <div className="mt-3 p-3 bg-background/50 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium">Live Market Data</span>
                          </div>
                          
                          {message.marketData.stock && (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{message.marketData.stock.symbol}</span>
                                <span className="text-lg font-bold">{formatCurrency(message.marketData.stock.price)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {message.marketData.stock.change > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                                <span className={message.marketData.stock.change > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {message.marketData.stock.change > 0 ? '+' : ''}{formatPercentage(message.marketData.stock.changePercent)}
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">Vol: {message.marketData.stock.volume.toLocaleString()}</span>
                              </div>
                            </div>
                          )}
                          
                          {message.marketData.crypto && (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{message.marketData.crypto.symbol}</span>
                                <span className="text-lg font-bold">{formatCurrency(message.marketData.crypto.price)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {message.marketData.crypto.change24h > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                                <span className={message.marketData.crypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {message.marketData.crypto.change24h > 0 ? '+' : ''}{formatPercentage(message.marketData.crypto.changePercent24h)} (24h)
                                </span>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-2 pt-2 border-t">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Sentiment: {message.marketData.sentiment.overall}</span>
                              <Badge variant="outline" className="text-xs">
                                {message.marketData.sentiment.score.toFixed(2)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                        {message.dataSources && (
                          <div className="flex items-center gap-1 text-xs opacity-70">
                            <Info className="w-3 h-3" />
                            <span>Sources: {message.dataSources.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  className="flex gap-3 justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Analyzing market data...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about stock prices (AAPL, TSLA), crypto (BTC, ETH), or market analysis..."
                  className="flex-1 min-h-[40px] max-h-[120px] p-2 border rounded-md resize-none bg-background"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3" />
                  <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
