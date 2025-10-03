"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Star,
  Play,
  Bookmark
} from "lucide-react"

// Mock books data with expanded categories
const booksData = [
  // AI & Future of Work (10 books)
  {
    id: 'ai-1',
    title: 'Artificial Intelligence & Wealth Creation',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'How AI is transforming investment strategies and creating new wealth opportunities.',
    readTime: '6 hours',
    rating: 4.7,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-purple-500 to-blue-500'
  },
  {
    id: 'ai-2',
    title: 'Strategic Investing in the AI Era',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Investment strategies for the artificial intelligence revolution and automation economy.',
    readTime: '5 hours',
    rating: 4.6,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-indigo-500 to-purple-500'
  },
  {
    id: 'ai-3',
    title: 'Machine Learning for Portfolio Optimization',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Advanced techniques using AI to optimize portfolio allocation and risk management.',
    readTime: '7 hours',
    rating: 4.8,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-cyan-500 to-blue-500'
  },
  {
    id: 'ai-4',
    title: 'The Future of Work: Investment Implications',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'How remote work, automation, and gig economy trends affect investment opportunities.',
    readTime: '4 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-emerald-500 to-teal-500'
  },
  {
    id: 'ai-5',
    title: 'Robotics and Automation Investing',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Identifying and investing in companies leading the robotics revolution.',
    readTime: '5 hours',
    rating: 4.4,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    id: 'ai-6',
    title: 'Quantum Computing: The Next Investment Frontier',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Understanding quantum computing and its potential impact on financial markets.',
    readTime: '6 hours',
    rating: 4.3,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-violet-500 to-purple-500'
  },
  {
    id: 'ai-7',
    title: 'Digital Transformation Investing',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'How digital transformation is reshaping industries and creating investment opportunities.',
    readTime: '5 hours',
    rating: 4.6,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-pink-500 to-rose-500'
  },
  {
    id: 'ai-8',
    title: 'Tech Giants vs Startups: Investment Strategy',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Comparing investment approaches between established tech companies and emerging startups.',
    readTime: '4 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-yellow-500 to-orange-500'
  },
  {
    id: 'ai-9',
    title: 'The Metaverse Economy',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Understanding virtual worlds, NFTs, and the emerging metaverse investment landscape.',
    readTime: '6 hours',
    rating: 4.4,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    id: 'ai-10',
    title: 'Sustainable Technology Investing',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Green tech, clean energy, and sustainable innovation investment strategies.',
    readTime: '5 hours',
    rating: 4.7,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-teal-500 to-cyan-500'
  },
  
  // Investment Strategies (10 books)
  {
    id: 'strategy-1',
    title: 'The Psychology of Risk',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Understanding risk perception and how it affects investment decision-making.',
    readTime: '6 hours',
    rating: 4.8,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-red-500 to-pink-500'
  },
  {
    id: 'strategy-2',
    title: 'Dynamic Asset Allocation',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Advanced strategies for adjusting portfolio allocation based on market conditions.',
    readTime: '7 hours',
    rating: 4.6,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-blue-500 to-indigo-500'
  },
  {
    id: 'strategy-3',
    title: 'Factor-Based Investing',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Understanding value, growth, momentum, and quality factors in portfolio construction.',
    readTime: '5 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-purple-500 to-violet-500'
  },
  {
    id: 'strategy-4',
    title: 'Tactical vs Strategic Asset Allocation',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Comparing long-term strategic approaches with short-term tactical adjustments.',
    readTime: '4 hours',
    rating: 4.4,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-emerald-500 to-green-500'
  },
  {
    id: 'strategy-5',
    title: 'Alternative Investments Guide',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Exploring REITs, commodities, private equity, and other alternative asset classes.',
    readTime: '6 hours',
    rating: 4.3,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-orange-500 to-yellow-500'
  },
  {
    id: 'strategy-6',
    title: 'Multi-Asset Portfolio Construction',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Building diversified portfolios across multiple asset classes and geographies.',
    readTime: '5 hours',
    rating: 4.7,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-cyan-500 to-teal-500'
  },
  {
    id: 'strategy-7',
    title: 'Risk Parity Strategies',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Understanding risk parity approaches to portfolio allocation and management.',
    readTime: '6 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-pink-500 to-red-500'
  },
  {
    id: 'strategy-8',
    title: 'Momentum and Mean Reversion',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Exploring momentum and mean reversion strategies in different market conditions.',
    readTime: '5 hours',
    rating: 4.4,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-indigo-500 to-blue-500'
  },
  {
    id: 'strategy-9',
    title: 'Sector Rotation Strategies',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Identifying and timing sector rotations for enhanced portfolio performance.',
    readTime: '4 hours',
    rating: 4.6,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    id: 'strategy-10',
    title: 'Income Generation Strategies',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Building portfolios focused on generating consistent income through dividends and bonds.',
    readTime: '5 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-violet-500 to-purple-500'
  },
  
  // Modern Finance (10 books)
  {
    id: 'modern-1',
    title: 'Crypto & DeFi Strategies for 2030',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Advanced cryptocurrency and decentralized finance investment strategies.',
    readTime: '6 hours',
    rating: 4.7,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-yellow-500 to-orange-500'
  },
  {
    id: 'modern-2',
    title: 'Central Bank Digital Currencies',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Understanding CBDCs and their impact on traditional financial systems.',
    readTime: '4 hours',
    rating: 4.3,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 'modern-3',
    title: 'Fintech Revolution',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'How financial technology is disrupting traditional banking and investment services.',
    readTime: '5 hours',
    rating: 4.6,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-green-500 to-teal-500'
  },
  {
    id: 'modern-4',
    title: 'Digital Payments and Mobile Money',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'The evolution of digital payments and its investment implications.',
    readTime: '4 hours',
    rating: 4.4,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    id: 'modern-5',
    title: 'Algorithmic Trading and HFT',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Understanding high-frequency trading and algorithmic investment strategies.',
    readTime: '6 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-red-500 to-orange-500'
  },
  {
    id: 'modern-6',
    title: 'RegTech and Compliance Investing',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Investment opportunities in regulatory technology and compliance solutions.',
    readTime: '4 hours',
    rating: 4.2,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-indigo-500 to-purple-500'
  },
  {
    id: 'modern-7',
    title: 'InsurTech: The Future of Insurance',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'How technology is transforming the insurance industry and creating investment opportunities.',
    readTime: '5 hours',
    rating: 4.3,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-emerald-500 to-cyan-500'
  },
  {
    id: 'modern-8',
    title: 'WealthTech and Robo-Advisors',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Understanding automated wealth management and digital investment platforms.',
    readTime: '4 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-teal-500 to-green-500'
  },
  {
    id: 'modern-9',
    title: 'Open Banking and API Economy',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'How open banking and APIs are reshaping financial services and investments.',
    readTime: '5 hours',
    rating: 4.4,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-violet-500 to-indigo-500'
  },
  {
    id: 'modern-10',
    title: 'Sustainable Finance and ESG Investing',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Environmental, social, and governance factors in modern investment strategies.',
    readTime: '6 hours',
    rating: 4.7,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  
  // Original books (keeping some for continuity)
  {
    id: '1',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    category: 'Value Investing',
    description: 'The definitive book on value investing and market psychology.',
    readTime: '8 hours',
    rating: 4.8,
    progress: 65,
    isBookmarked: true,
    coverColor: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'A Random Walk Down Wall Street',
    author: 'Burton Malkiel',
    category: 'Market Theory',
    description: 'A comprehensive guide to index investing and market efficiency.',
    readTime: '6 hours',
    rating: 4.6,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-green-500'
  },
  {
    id: '3',
    title: 'The Little Book of Common Sense Investing',
    author: 'John Bogle',
    category: 'Index Investing',
    description: 'Simple strategies for building wealth through index funds.',
    readTime: '4 hours',
    rating: 4.7,
    progress: 100,
    isBookmarked: true,
    coverColor: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Cryptocurrency Fundamentals',
    author: 'Prism Education Team',
    category: 'Digital Assets',
    description: 'Understanding blockchain technology and cryptocurrency investing.',
    readTime: '5 hours',
    rating: 4.4,
    progress: 25,
    isBookmarked: false,
    coverColor: 'bg-orange-500'
  },
  {
    id: '5',
    title: 'Portfolio Theory and Risk Management',
    author: 'Prism Education Team',
    category: 'Risk Management',
    description: 'Modern portfolio theory and diversification strategies.',
    readTime: '7 hours',
    rating: 4.5,
    progress: 0,
    isBookmarked: false,
    coverColor: 'bg-red-500'
  },
  {
    id: '6',
    title: 'Behavioral Finance',
    author: 'Prism Education Team',
    category: 'Psychology',
    description: 'How emotions and biases affect investment decisions.',
    readTime: '6 hours',
    rating: 4.3,
    progress: 40,
    isBookmarked: true,
    coverColor: 'bg-teal-500'
  }
]

const categories = ['All', 'AI & Future of Work', 'Investment Strategies', 'Modern Finance', 'Value Investing', 'Market Theory', 'Index Investing', 'Digital Assets', 'Risk Management', 'Psychology']

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const readingStats = {
    totalBooks: booksData.length,
    completedBooks: booksData.filter(book => book.progress === 100).length,
    inProgressBooks: booksData.filter(book => book.progress > 0 && book.progress < 100).length,
    totalReadTime: booksData.reduce((total, book) => total + parseInt(book.readTime), 0)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-primary" />
          Financial Literacy Library
        </h1>
        <p className="text-muted-foreground">
          Curated collection of financial education content with built-in reader and progress tracking
        </p>
      </div>

      {/* Reading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{readingStats.totalBooks}</p>
                <p className="text-sm text-muted-foreground">Total Books</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{readingStats.completedBooks}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{readingStats.inProgressBooks}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{readingStats.totalReadTime}h</p>
                <p className="text-sm text-muted-foreground">Total Content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books and authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-16 ${book.coverColor} rounded flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{book.author}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Bookmark className={`w-4 h-4 ${book.isBookmarked ? 'fill-current text-primary' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <Badge variant="outline">{book.category}</Badge>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{book.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    <span>{book.rating}</span>
                  </div>
                </div>
                
                {book.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-muted-foreground">{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} />
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link href={`/library/${book.id}`}>
                      {book.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                    </Link>
                  </Button>
                  {book.progress > 0 && (
                    <Button variant="outline" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Continue Reading Section */}
      {readingStats.inProgressBooks > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {booksData
              .filter(book => book.progress > 0 && book.progress < 100)
              .map((book) => (
                <Card key={book.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-12 ${book.coverColor} rounded flex items-center justify-center flex-shrink-0`}>
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.progress}% complete</p>
                      <Progress value={book.progress} className="mt-1" />
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/library/${book.id}`}>Read</Link>
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
