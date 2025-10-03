"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { 
  ArrowLeft,
  BookOpen, 
  Clock, 
  Star,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Share2
} from "lucide-react"
import { getBookById } from "@/lib/books-data"

export default function BookReaderPage() {
  const params = useParams()
  const bookId = params.id as string
  const book = getBookById(bookId)
  
  const [currentChapter, setCurrentChapter] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [highlights, setHighlights] = useState<string[]>([])

  if (!book) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/library">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/library">Browse Library</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentContent = book.content[currentChapter] || ""
  const totalChapters = book.content.length
  const progressPercentage = ((currentChapter + 1) / totalChapters) * 100

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const handleNextChapter = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const getCoverColor = (title: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-700",
      "bg-gradient-to-br from-green-500 to-green-700", 
      "bg-gradient-to-br from-purple-500 to-purple-700",
      "bg-gradient-to-br from-orange-500 to-orange-700",
      "bg-gradient-to-br from-red-500 to-red-700",
      "bg-gradient-to-br from-teal-500 to-teal-700",
      "bg-gradient-to-br from-pink-500 to-pink-700",
      "bg-gradient-to-br from-indigo-500 to-indigo-700",
      "bg-gradient-to-br from-yellow-500 to-yellow-700",
      "bg-gradient-to-br from-cyan-500 to-cyan-700"
    ]
    const index = title.length % colors.length
    return colors[index]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/library">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Link>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-muted-foreground">by {book.author}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleBookmark}>
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 mr-2" />
            ) : (
              <Bookmark className="w-4 h-4 mr-2" />
            )}
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </motion.div>

      {/* Book Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`w-32 h-40 rounded-lg ${getCoverColor(book.title)} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                {book.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                  <p className="text-muted-foreground mb-3">{book.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{book.category}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Pages</p>
                    <p className="font-medium">{book.pages}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Read Time</p>
                    <p className="font-medium">{Math.ceil(book.pages / 50)} hours</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Chapters</p>
                    <p className="font-medium">{totalChapters}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Progress</p>
                    <p className="font-medium">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reading Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chapter Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Chapter {currentChapter + 1} of {totalChapters}</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreviousChapter}
                  disabled={currentChapter === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextChapter}
                  disabled={currentChapter === totalChapters - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Chapter Progress</span>
                <span>{Math.round(((currentChapter + 1) / totalChapters) * 100)}%</span>
              </div>
              <Progress value={((currentChapter + 1) / totalChapters) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ 
                __html: currentContent.replace(/\n/g, '<br>').replace(/```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>').replace(/```/g, '</code></pre>')
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousChapter}
                disabled={currentChapter === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous Chapter
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Progress
                </Button>
                <Button variant="outline" size="sm" onClick={toggleBookmark}>
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 mr-2" />
                  ) : (
                    <Bookmark className="w-4 h-4 mr-2" />
                  )}
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
              <Button 
                onClick={handleNextChapter}
                disabled={currentChapter === totalChapters - 1}
              >
                Next Chapter
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}