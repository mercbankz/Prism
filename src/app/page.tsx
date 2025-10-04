"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart3, Shield, Brain, TrendingUp, Users, Zap, ArrowRight, Star, Globe, Activity } from "lucide-react"
import { Logo } from "@/components/shared/Logo"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter"

interface LiveMetrics {
  portfoliosAnalyzed: number
  badgesEarned: number
  booksCompleted: number
  activeUsers: number
}

export default function HomePage() {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    portfoliosAnalyzed: 0,
    badgesEarned: 0,
    booksCompleted: 0,
    activeUsers: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  // Static counters set to 0
  const portfoliosCounter = { value: 0 }
  const badgesCounter = { value: 0 }
  const booksCounter = { value: 0 }
  const usersCounter = { value: 0 }

  // Fetch live metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics')
        const data = await response.json()
        setLiveMetrics(data)
        setIsLoading(false)
        
        // Static counters - no animations needed
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
        setIsLoading(false)
      }
    }

    fetchMetrics()
    
    // Refresh metrics every 30 seconds
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#1E293B] to-[#0D1117]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 infinity-bg">
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Logo size={80} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="holographic-text text-glow">
              Portfolio Intelligence.
            </span>
            <br />
            <span className="text-white text-glow">
              Learn. Grow. Win.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-4xl mx-auto font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The world&apos;s most advanced non-custodial portfolio analytics platform.
            <br className="hidden sm:block" />
            Transform your investments with AI-powered insights and gamified learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="lg" className="text-lg px-12 py-6 neon-border glow-on-hover">
              <Link href="/dashboard">
                <TrendingUp className="mr-2 h-6 w-6" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-12 py-6 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10">
              <Link href="/pricing">
                <Star className="mr-2 h-6 w-6" />
                View Pricing
              </Link>
            </Button>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {isLoading ? "—" : portfoliosCounter.value.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Portfolios Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {isLoading ? "—" : badgesCounter.value.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {isLoading ? "—" : booksCounter.value.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Books Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {isLoading ? "—" : usersCounter.value.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Prism Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">About Prism</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover the future of portfolio management with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">AI-Powered Analysis</CardTitle>
                  <CardDescription className="text-slate-300">
                    Advanced machine learning algorithms analyze your portfolio and provide intelligent insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      Real-time risk assessment
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      Predictive analytics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      Automated rebalancing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Real-Time Analytics</CardTitle>
                  <CardDescription className="text-slate-300">
                    Stay ahead with live market data and instant portfolio updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Live price feeds
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Instant notifications
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Performance tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Non-Custodial</CardTitle>
                  <CardDescription className="text-slate-300">
                    Your assets remain in your control with our secure, non-custodial approach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Private key security
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      No asset custody
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Full transparency
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Prism Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Prism?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the next generation of portfolio management tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Portfolio Analytics</CardTitle>
                  <CardDescription className="text-slate-300">
                    Comprehensive analysis and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" size="sm" className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">AI Assistant</CardTitle>
                  <CardDescription className="text-slate-300">
                    Get personalized investment advice
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Financial Chess</CardTitle>
                  <CardDescription className="text-slate-300">
                    Learn through interactive gameplay
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" size="sm" className="border-green-500/50 text-green-300 hover:bg-green-500/10">
                    Play <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Learning Library</CardTitle>
                  <CardDescription className="text-slate-300">
                    Master finance with curated content
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" size="sm" className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10">
                    Browse <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Portfolio?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of investors who trust Prism for their portfolio management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-lg px-12 py-6 neon-border glow-on-hover">
                <Link href="/dashboard">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-12 py-6 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10">
                <Link href="/pricing">
                  <Star className="mr-2 h-6 w-6" />
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}