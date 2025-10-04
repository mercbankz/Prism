"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { 
  Users, 
  MessageCircle, 
  UserPlus, 
  Bell, 
  Search,
  Send, 
  Image,
  Link,
  MoreHorizontal,
  Heart,
  Share2,
  MessageSquare,
  Settings
} from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")

const mockPosts = [
  {
    id: 1,
      user: {
        name: "Alex Chen",
        avatar: "/avatars/alex.jpg",
        verified: true,
        followers: 1250
      },
      content: "Just hit a 25% gain on my crypto portfolio this month! The key was diversifying into DeFi protocols early. What strategies are you all using?",
    timestamp: "2 hours ago",
      likes: 42,
    comments: 8,
    shares: 3,
      category: "Crypto",
      tags: ["#DeFi", "#Portfolio", "#Gains"]
  },
  {
    id: 2,
      user: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
        verified: false,
        followers: 890
      },
      content: "Market analysis: Tech stocks showing strong momentum. AAPL and MSFT looking particularly bullish for Q2. Thoughts on the current tech rally?",
    timestamp: "4 hours ago",
      likes: 28,
    comments: 12,
    shares: 5,
      category: "Stocks",
      tags: ["#Tech", "#Analysis", "#Q2"]
  },
  {
    id: 3,
      user: {
        name: "Mike Rodriguez",
        avatar: "/avatars/mike.jpg",
        verified: true,
        followers: 2100
      },
      content: "Bond market update: Yields are stabilizing after the Fed's latest announcement. Good time to rebalance fixed income allocations.",
    timestamp: "6 hours ago",
      likes: 15,
      comments: 4,
      shares: 2,
      category: "Bonds",
      tags: ["#Bonds", "#Fed", "#Rebalance"]
  }
]

const mockFriends = [
    { name: "Emma Wilson", avatar: "/avatars/emma.jpg", status: "online", mutual: 12 },
    { name: "David Kim", avatar: "/avatars/david.jpg", status: "offline", mutual: 8 },
    { name: "Lisa Park", avatar: "/avatars/lisa.jpg", status: "online", mutual: 15 }
]

const mockMessages = [
    { name: "Alex Chen", avatar: "/avatars/alex.jpg", lastMessage: "Thanks for the tip on that DeFi protocol!", timestamp: "2m ago", unread: 2 },
    { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg", lastMessage: "What do you think about the tech rally?", timestamp: "1h ago", unread: 0 },
    { name: "Mike Rodriguez", avatar: "/avatars/mike.jpg", lastMessage: "Bond yields are looking interesting", timestamp: "3h ago", unread: 1 }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#E5E8FF] mb-2">Community</h1>
          <p className="text-[#E5E8FF]/70">Connect, share insights, and learn from fellow investors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Navigation Tabs */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {[
                    { id: "feed", label: "Feed", icon: MessageCircle },
                    { id: "friends", label: "Friends", icon: Users },
                    { id: "messages", label: "Messages", icon: MessageSquare },
                    { id: "groups", label: "Groups", icon: Users }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className={`w-full justify-start ${activeTab === tab.id ? "bg-blue-600" : "hover:bg-slate-700"}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Friends List */}
            {activeTab === "friends" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockFriends.map((friend, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
            <div>
                            <div className="text-sm font-medium">{friend.name}</div>
                            <div className="text-xs text-slate-400">{friend.mutual} mutual friends</div>
                          </div>
            </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-400' : 'bg-slate-400'}`}></div>
                          <Button size="sm" variant="outline" className="text-xs">
                            <UserPlus className="h-3 w-3 mr-1" />
                            Add
              </Button>
            </div>
          </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages List */}
            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockMessages.map((message, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.avatar} alt={message.name} />
                          <AvatarFallback>{message.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium truncate">{message.name}</div>
                            <div className="text-xs text-slate-400">{message.timestamp}</div>
                          </div>
                          <div className="text-xs text-slate-400 truncate">{message.lastMessage}</div>
                        </div>
                        {message.unread > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs">{message.unread}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "feed" && (
              <div className="space-y-6">
                {/* Create Post */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/user.jpg" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                      <div className="flex-1 space-y-3">
                      <Textarea
                          placeholder="Share your investment insights, market analysis, or ask questions..."
                          className="min-h-[80px] bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <Image className="h-4 w-4 mr-1" />
                            Image
                          </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <Link className="h-4 w-4 mr-1" />
                            Link
                          </Button>
                        </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-1" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            {/* Posts Feed */}
                <div className="space-y-4">
              {mockPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                >
                  <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.user.avatar} alt={post.user.name} />
                              <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                                <div className="font-medium">{post.user.name}</div>
                            {post.user.verified && (
                                  <Badge className="bg-blue-600 text-white text-xs">Verified</Badge>
                            )}
                                <div className="text-xs text-slate-400">{post.timestamp}</div>
                                <Button size="sm" variant="ghost" className="ml-auto">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          
                              <div className="mb-3">
                                <p className="text-sm leading-relaxed">{post.content}</p>
                                <div className="flex gap-2 mt-2">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                      {tag}
                              </Badge>
                            ))}
                                </div>
                          </div>

                              <div className="flex items-center gap-4 text-sm text-slate-400">
                                <Button variant="ghost" size="sm" className="hover:text-red-400">
                                  <Heart className="h-4 w-4 mr-1" />
                              {post.likes}
                            </Button>
                                <Button variant="ghost" size="sm" className="hover:text-blue-400">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                              {post.comments}
                            </Button>
                                <Button variant="ghost" size="sm" className="hover:text-green-400">
                                  <Share2 className="h-4 w-4 mr-1" />
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
              </div>
            )}

            {activeTab === "groups" && (
                    <Card>
                <CardHeader>
                  <CardTitle>Investment Groups</CardTitle>
                  <CardDescription>Join groups based on your investment interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Crypto Enthusiasts", members: 1250, description: "Discussing DeFi, NFTs, and blockchain technology" },
                      { name: "Tech Stock Traders", members: 890, description: "Analysis and insights on technology stocks" },
                      { name: "Bond Investors", members: 450, description: "Fixed income strategies and market analysis" },
                      { name: "Real Estate Investors", members: 320, description: "REITs and real estate investment strategies" }
                    ].map((group, index) => (
                      <Card key={index} className="hover:bg-slate-800 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{group.name}</h3>
                            <Badge variant="outline">{group.members} members</Badge>
                          </div>
                          <p className="text-sm text-slate-400 mb-3">{group.description}</p>
                        <Button size="sm" className="w-full">
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                ))}
              </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}