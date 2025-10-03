"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Search, 
  Star, 
  Clock, 
  TrendingUp,
  Award,
  Users,
  Target,
  Zap
} from "lucide-react"
import { booksData, categories } from "@/lib/books-data"

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.progress - a.progress // Sort by progress as featured
      case "progress":
        return b.progress - a.progress
      case "title":
        return a.title.localeCompare(b.title)
      case "newest":
        return b.id.localeCompare(a.id)
      default:
        return 0
    }
  })

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

  const totalHighlights = booksData.reduce((acc, book) => acc + book.highlights.length, 0)
  const totalBookmarks = booksData.reduce((acc, book) => acc + book.bookmarks.length, 0)
  const averageProgress = Math.round(booksData.reduce((acc, book) => acc + book.progress, 0) / booksData.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Financial Library
          </h1>
          <p className="text-muted-foreground">
            Expand your financial knowledge with curated books and resources
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{booksData.length}</p>
                <p className="text-sm text-muted-foreground">Total Books</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{averageProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{totalHighlights}</p>
                <p className="text-sm text-muted-foreground">Highlights</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{totalBookmarks}</p>
                <p className="text-sm text-muted-foreground">Bookmarks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search books, authors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="featured">Featured</option>
                  <option value="progress">Progress</option>
                  <option value="title">Title</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Books Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {sortedBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-16 h-20 rounded-lg ${getCoverColor(book.title)} flex items-center justify-center text-white font-bold text-lg`}>
                    {book.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex gap-1">
                    {book.progress > 50 && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                    {book.progress === 0 && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <CardDescription>
                  by {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(book.pages / 50)} hours
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {book.pages} pages
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{book.progress}%</span>
                  </div>
                  <Progress value={book.progress} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {book.highlights.length}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {book.bookmarks.length}
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/library/${book.id}`}>
                      {book.progress > 0 ? "Continue" : "Start Reading"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}