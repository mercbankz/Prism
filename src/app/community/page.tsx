"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  MessageCircle, 
  UserPlus, 
  Send, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Bell,
  Settings,
  Search,
  Filter,
  Plus
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// Mock data for community features
const mockPosts = [
  {
    id: 1,
    user: { name: "Alex Chen", avatar: "/avatars/alex.jpg", verified: true },
    content: "Just hit my 6-month portfolio milestone! 🎉 Diversified across crypto, stocks, and bonds. The AI assistant's rebalancing suggestions have been game-changing.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ["portfolio", "milestone", "ai-assistant"]
  },
  {
    id: 2,
    user: { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg", verified: false },
    content: "Market volatility got you down? Remember: time in the market beats timing the market. Stay disciplined with your investment strategy! 💪",
    timestamp: "4 hours ago",
    likes: 18,
    comments: 12,
    shares: 5,
    tags: ["market", "strategy", "discipline"]
  },
  {
    id: 3,
    user: { name: "Mike Rodriguez", avatar: "/avatars/mike.jpg", verified: true },
    content: "Anyone else using the Financial Chess feature? The AI opponent's moves based on real market events is fascinating! 🤖♟️",
    timestamp: "6 hours ago",
    likes: 31,
    comments: 15,
    shares: 7,
    tags: ["financial-chess", "ai", "gaming"]
  }
]

const mockFriends = [
  { id: 1, name: "Alex Chen", avatar: "/avatars/alex.jpg", status: "online", mutual: 12 },
  { id: 2, name: "Sarah Johnson", avatar: "/avatars/sarah.jpg", status: "offline", mutual: 8 },
  { id: 3, name: "Mike Rodriguez", avatar: "/avatars/mike.jpg", status: "online", mutual: 15 },
  { id: 4, name: "Emma Davis", avatar: "/avatars/emma.jpg", status: "away", mutual: 5 }
]

const mockMessages = [
  { id: 1, user: "Alex Chen", avatar: "/avatars/alex.jpg", lastMessage: "Thanks for the portfolio tip!", timestamp: "2m ago", unread: 0 },
  { id: 2, user: "Sarah Johnson", avatar: "/avatars/sarah.jpg", lastMessage: "What do you think about the Fed meeting?", timestamp: "1h ago", unread: 2 },
  { id: 3, user: "Mike Rodriguez", avatar: "/avatars/mike.jpg", lastMessage: "Great analysis on crypto trends", timestamp: "3h ago", unread: 1 }
]

const mockGroups = [
  { id: 1, name: "Crypto Enthusiasts", members: 1.2, description: "Discussing the latest in cryptocurrency", isPrivate: false },
  { id: 2, name: "Value Investors", members: 0.8, description: "Deep dive into fundamental analysis", isPrivate: true },
  { id: 3, name: "AI Trading Strategies", members: 0.5, description: "Exploring AI-powered investment strategies", isPrivate: false }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPost, setNewPost] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
              <p className="text-muted-foreground">Connect, share insights, and grow together</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Groups
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/avatars/user.jpg" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your investment insights, ask questions, or celebrate milestones..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[100px] resize-none border-0 focus-visible:ring-0 text-base"
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Image
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Link
                          </Button>
                        </div>
                        <Button 
                          onClick={() => setShowNewPost(!showNewPost)}
                          disabled={!newPost.trim()}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {mockPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                            {post.user.verified && (
                              <Badge variant="secondary" className="text-xs">Verified</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Engagement */}
                          <div className="flex items-center gap-6 pt-4 border-t">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                              <Heart className="h-4 w-4 mr-2" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Share2 className="h-4 w-4 mr-2" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Friends</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search friends..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFriends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="relative mb-4">
                          <Avatar className="w-16 h-16 mx-auto">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background ${
                            friend.status === 'online' ? 'bg-green-500' : 
                            friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{friend.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{friend.mutual} mutual friends</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Messages</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>

              <div className="space-y-4">
                {mockMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback>{message.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-foreground">{message.user}</h3>
                              <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                            </div>
                            <p className="text-muted-foreground truncate">{message.lastMessage}</p>
                          </div>
                          {message.unread > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {message.unread}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Groups</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{group.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={group.isPrivate ? "destructive" : "secondary"} className="text-xs">
                                {group.isPrivate ? "Private" : "Public"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {group.members}K members
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{group.description}</p>
                        <Button size="sm" className="w-full">
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


