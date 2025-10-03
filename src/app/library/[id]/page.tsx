"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark, 
  HighlighterIcon as Highlight,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// Mock book content
const bookContent = {
  '1': {
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    chapters: [
      {
        id: 1,
        title: 'Introduction',
        content: `# Introduction to Value Investing

Value investing is an investment strategy that involves picking stocks that appear to be trading for less than their intrinsic or book value. Value investors actively ferret out stocks they think the stock market is underestimating.

## Key Principles

1. **Margin of Safety**: Always buy with a significant margin of safety
2. **Long-term Perspective**: Think like you're buying the whole business
3. **Emotional Discipline**: Don't let market emotions drive your decisions

## The Market's Volatility

The stock market is filled with individuals who know the price of everything, but the value of nothing. This creates opportunities for the disciplined investor.

> "The intelligent investor is a realist who sells to optimists and buys from pessimists." - Benjamin Graham

## Understanding Mr. Market

Imagine that in some private business you own a small share that cost you $1,000. One of your partners, named Mr. Market, is very obliging indeed. Every day he tells you what he thinks your interest is worth and furthermore offers either to buy you out or to sell you an additional interest on that basis.

Sometimes his idea of value appears plausible and justified by business developments and prospects as you know them. Often, on the other hand, Mr. Market lets his enthusiasm or his fears run away with him, and the value he proposes seems to you a little short of silly.`
      },
      {
        id: 2,
        title: 'The Defensive Investor',
        content: `# The Defensive Investor

The defensive investor is one whose primary concern is to avoid serious mistakes or losses. Their secondary aim is freedom from effort, annoyance, and the need for making frequent decisions.

## Portfolio Allocation

The defensive investor should maintain a portfolio split between bonds and stocks:
- **Bonds**: 25-75% of portfolio
- **Stocks**: 25-75% of portfolio

The exact allocation depends on market conditions and personal circumstances.

## Stock Selection Criteria

For the defensive investor, stock selection should follow these rules:

1. **Adequate Size**: Companies with annual sales of $100 million or more
2. **Strong Financial Position**: Current ratio of 2 to 1 or better
3. **Earnings Stability**: No deficit in the last 10 years
4. **Dividend Record**: Uninterrupted payments for at least 20 years
5. **Earnings Growth**: Minimum increase of one-third in per-share earnings over the past 10 years
6. **Moderate P/E Ratio**: Current price should not be more than 15 times average earnings of the past three years
7. **Moderate Price-to-Book**: Price should not be more than 1.5 times book value

## The Beauty of Simplicity

The defensive investor's approach is beautifully simple: buy a diversified portfolio of high-quality stocks and bonds, hold them for the long term, and ignore the daily fluctuations of the market.`
      }
    ]
  }
}

export default function BookReaderPage() {
  const params = useParams()
  const router = useRouter()
  const bookId = params.id as string
  
  const [currentChapter, setCurrentChapter] = useState(0)
  const [readingProgress, setReadingProgress] = useState(65)
  const [highlights, setHighlights] = useState<string[]>([])
  const [fontSize, setFontSize] = useState(16)
  
  const book = bookContent[bookId as keyof typeof bookContent]
  
  useEffect(() => {
    // Simulate loading user progress
    // In production, this would fetch from your API
  }, [bookId])
  
  if (!book) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
        <Button onClick={() => router.push('/library')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Button>
      </div>
    )
  }
  
  const currentChapterData = book.chapters[currentChapter]
  const totalChapters = book.chapters.length
  const progressPercentage = ((currentChapter + 1) / totalChapters) * 100
  
  const nextChapter = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1)
      setReadingProgress(Math.min(readingProgress + 10, 100))
    }
  }
  
  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }
  
  const addHighlight = () => {
    // In a real implementation, this would capture selected text
    const newHighlight = "Sample highlighted text from the current chapter"
    setHighlights([...highlights, newHighlight])
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/library')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-semibold">{book.title}</h1>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Chapter {currentChapter + 1} of {totalChapters}
            </div>
            <Button variant="ghost" size="icon">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={addHighlight}>
              <Highlight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <Progress value={progressPercentage} className="h-1" />
        </div>
      </div>
      
      {/* Reader Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {currentChapterData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-gray dark:prose-invert max-w-none"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
                >
                  {/* Render markdown content */}
                  <div dangerouslySetInnerHTML={{ 
                    __html: currentChapterData.content
                      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(.*)$/gm, '<p>$1</p>')
                      .replace(/<p><h/g, '<h')
                      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
                      .replace(/<p><blockquote>/g, '<blockquote><p>')
                      .replace(/<\/blockquote><\/p>/g, '</p></blockquote>')
                  }} />
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={prevChapter}
                    disabled={currentChapter === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Chapter
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}% complete
                  </div>
                  
                  <Button 
                    onClick={nextChapter}
                    disabled={currentChapter === totalChapters - 1}
                  >
                    Next Chapter
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {book.chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapter(index)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      index === currentChapter 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {index + 1}. {chapter.title}
                  </button>
                ))}
              </CardContent>
            </Card>
            
            {/* Reading Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Reading Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Font Size</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    >
                      A-
                    </Button>
                    <span className="text-sm">{fontSize}px</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    >
                      A+
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Highlights */}
            {highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Your Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      "{highlight}"
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
