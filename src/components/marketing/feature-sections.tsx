"use client"

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Bot, 
  Crown, 
  BookOpen,
  TrendingUp,
  PieChart,
  LineChart,
  Calendar,
  Trophy,
  Star,
  Filter,
  Play
} from 'lucide-react'

const features = [
  {
    id: 'portfolio',
    title: 'Portfolio Intelligence',
    subtitle: 'Real-time analytics with AI insights',
    description: 'Get comprehensive portfolio analysis with health scoring, risk assessment, and performance tracking across all your holdings.',
    icon: BarChart3,
    gradient: 'from-blue-500 to-cyan-500',
    preview: 'portfolio',
    highlights: [
      'AI-powered health scoring',
      'Time-range performance charts',
      'Risk level monitoring',
      'Rebalance suggestions'
    ]
  },
  {
    id: 'ai',
    title: 'Prism AI Assistant',
    subtitle: 'Live market data & analysis',
    description: 'Chat with our AI assistant for real-time market insights, portfolio analysis, and educational guidance powered by live financial data.',
    icon: Bot,
    gradient: 'from-purple-500 to-pink-500',
    preview: 'ai',
    highlights: [
      'Live market data integration',
      'Contextual portfolio analysis',
      'Data source transparency',
      'Educational responses'
    ]
  },
  {
    id: 'chess',
    title: 'Financial Chess',
    subtitle: 'Strategy meets gameplay',
    description: 'Master investment strategy through competitive chess gameplay with quarterly seasons, AI opponents, and real market scenarios.',
    icon: Crown,
    gradient: 'from-amber-500 to-orange-500',
    preview: 'chess',
    highlights: [
      'Quarterly competitive seasons',
      'AI-powered opponents',
      'Real market scenarios',
      'Strategy skill building'
    ]
  },
  {
    id: 'library',
    title: 'Financial Library',
    subtitle: 'Curated knowledge hub',
    description: 'Access our comprehensive library of financial education content with progress tracking, highlights, and gamified learning.',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    preview: 'library',
    highlights: [
      'AI & Future of Work',
      'Investment Strategies',
      'Modern Finance',
      'Progress tracking'
    ]
  }
]

const previewComponents = {
  portfolio: () => (
    <div className="space-y-4">
      {/* Portfolio Value Chart */}
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-fg">Portfolio Performance</h4>
          <div className="flex space-x-1">
            {['1M', '3M', '6M', '1Y'].map((range) => (
              <button key={range} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded">
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-24 bg-gradient-to-r from-primary/20 to-primary-2/20 rounded-lg flex items-center justify-center">
          <LineChart className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      {/* Health Score */}
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Health Score</span>
          <span className="text-lg font-bold text-fg">78/100</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '78%' }} />
        </div>
      </div>
    </div>
  ),
  
  ai: () => (
    <div className="space-y-4">
      {/* AI Chat Preview */}
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Bot className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-fg">AI Assistant</span>
        </div>
        <div className="space-y-2">
          <div className="bg-primary/10 rounded-lg p-2 text-xs">
            What's the current price of AAPL?
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-xs">
            AAPL is at $175.43 (+2.1% today). Volume: 45.2M shares...
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
          <span className="text-xs text-muted">Sources: Alpha Vantage, Finnhub</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-500">Live</span>
          </div>
        </div>
      </div>
    </div>
  ),
  
  chess: () => (
    <div className="space-y-4">
      {/* Chess Season Info */}
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-fg">Q4 2024 Season</h4>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary">Active</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-fg">12</div>
            <div className="text-xs text-muted">Games Won</div>
          </div>
          <div>
            <div className="text-lg font-bold text-fg">#47</div>
            <div className="text-xs text-muted">Rank</div>
          </div>
        </div>
      </div>
      
      {/* Chess Board Preview */}
      <div className="glass-card rounded-lg p-4">
        <div className="grid grid-cols-8 gap-1">
          {[...Array(64)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded ${
                (Math.floor(i / 8) + i) % 2 === 0 
                  ? 'bg-white/20' 
                  : 'bg-white/5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  
  library: () => (
    <div className="space-y-4">
      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {['AI & Future of Work', 'Investment Strategies', 'Modern Finance'].map((category) => (
          <span key={category} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
            {category}
          </span>
        ))}
      </div>
      
      {/* Book Progress */}
      <div className="space-y-3">
        {[
          { title: 'AI & Wealth Creation', progress: 65 },
          { title: 'Psychology of Risk', progress: 40 },
          { title: 'Crypto & DeFi Strategies', progress: 100 }
        ].map((book, i) => (
          <div key={i} className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-fg">{book.title}</span>
              <span className="text-xs text-muted">{book.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div 
                className="bg-gradient-primary h-1.5 rounded-full" 
                style={{ width: `${book.progress}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FeatureSections() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fg mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Four powerful tools working together to transform how you understand and manage your investments
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const PreviewComponent = previewComponents[feature.preview as keyof typeof previewComponents]
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <motion.div
                  className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-fg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlight}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + highlightIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full" />
                        <span className="text-sm text-muted">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-4 h-4" />
                    <span>Try {feature.title}</span>
                  </motion.button>
                </motion.div>

                {/* Preview */}
                <motion.div
                  className={`${!isEven ? 'lg:col-start-1' : ''}`}
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="glass-panel rounded-2xl p-6 hover:glow-primary transition-all duration-300">
                    <PreviewComponent />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
