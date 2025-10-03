"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  lastUpdated: string
}

export default function HomePage() {
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Animated counters
  const portfoliosCounter = useAnimatedCounter(liveMetrics?.portfoliosAnalyzed || 0, { startOnMount: false })
  const badgesCounter = useAnimatedCounter(liveMetrics?.badgesEarned || 0, { startOnMount: false })
  const booksCounter = useAnimatedCounter(liveMetrics?.booksCompleted || 0, { startOnMount: false })
  const usersCounter = useAnimatedCounter(liveMetrics?.activeUsers || 0, { startOnMount: false })

  // Fetch live metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics')
        const data = await response.json()
        setLiveMetrics(data)
        setIsLoading(false)
        
        // Start animations after data is loaded
        setTimeout(() => {
          portfoliosCounter.animate()
          badgesCounter.animate()
          booksCounter.animate()
          usersCounter.animate()
        }, 300)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section - InfinityVM inspired with Spheron boldness */}
      <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Spinning Logo - InfinityVM style */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <Logo size="xl" showText={false} animated={true} />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-150"></div>
            </div>
          </motion.div>

          {/* Spheron-style bold headline */}
          <motion.h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
              AI Portfolio Intelligence.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl" style={{
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.3)) drop-shadow(0 0 60px rgba(234, 179, 8, 0.2))'
            }}>
              Learn. Grow. Win.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto font-light"
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
            <Button asChild size="lg" className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-white border-0 shadow-2xl shadow-primary/25">
              <Link href="/pricing" className="flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-12 py-6 border-white/20 text-white hover:bg-white/10 backdrop-blur">
              <Link href="/dashboard" className="flex items-center gap-2">
                See Live Demo
                <Activity className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Live Stats Marquee - Spheron style with real-time animation */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-primary/20 rounded h-10 w-24 mx-auto"></div>
                ) : (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {portfoliosCounter.value.toLocaleString()}+
                  </motion.span>
                )}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Portfolios Analyzed</div>
              {liveMetrics && (
                <div className="text-xs text-green-400 mt-1">
                  +{liveMetrics.lastUpdated ? 'Live' : 'Real-time'}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-2 mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-primary-2/20 rounded h-10 w-24 mx-auto"></div>
                ) : (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {badgesCounter.value.toLocaleString()}+
                  </motion.span>
                )}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Badges Earned</div>
              {liveMetrics && (
                <div className="text-xs text-green-400 mt-1">
                  +{liveMetrics.lastUpdated ? 'Live' : 'Real-time'}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-accent/20 rounded h-10 w-24 mx-auto"></div>
                ) : (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {booksCounter.value.toLocaleString()}+
                  </motion.span>
                )}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Books Completed</div>
              {liveMetrics && (
                <div className="text-xs text-green-400 mt-1">
                  +{liveMetrics.lastUpdated ? 'Live' : 'Real-time'}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-warning mb-2">
                {isLoading ? (
                  <div className="animate-pulse bg-warning/20 rounded h-10 w-24 mx-auto"></div>
                ) : (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {usersCounter.value.toLocaleString()}+
                  </motion.span>
                )}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Active Users</div>
              {liveMetrics && (
                <div className="text-xs text-green-400 mt-1">
                  +{liveMetrics.lastUpdated ? 'Live' : 'Real-time'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Prism Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background with Prism logo watermark */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="flex items-center justify-center h-full">
            <Logo size="xl" showText={false} animated={false} />
          </div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl font-black mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              About Prism
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light mb-8">
                Prism is being built to empower investors. Our mission is to give you the tools to learn from mistakes, adapt quickly to market conditions, and always stay three steps ahead.
              </p>
              
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light mb-8">
                Unlike traditional platforms, Prism combines AI-powered portfolio intelligence, gamified learning, and real-time insights so you can strategize and grow with confidence. Prism isn&apos;t just analytics—it&apos;s a movement to give power back to the investor.
              </p>
              
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light mb-12">
                Enhance your knowledge and master the keys of every investment opportunity through our complete financial literacy library.
              </p>
            </div>

            {/* Mission highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Learn from Mistakes</h3>
                <p className="text-slate-400">Turn every loss into a lesson with AI-powered insights</p>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Adapt Quickly</h3>
                <p className="text-slate-400">Real-time market insights keep you ahead of the curve</p>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Stay Ahead</h3>
                <p className="text-slate-400">Three steps ahead with predictive analytics</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Pillars - Glass Cards */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Five Pillars of Excellence
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built on the foundation of privacy, intelligence, strategy, growth, and knowledge
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              {
                icon: Shield,
                title: "Privacy First",
                description: "Non-custodial architecture with zero-knowledge analytics",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Brain,
                title: "AI Intelligence",
                description: "Advanced portfolio analysis with live market data",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: TrendingUp,
                title: "Strategic Gaming",
                description: "Learn market dynamics through Financial Chess",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Gamified Growth",
                description: "Achievement system with 100+ badges and rewards",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Users,
                title: "Library of Knowledge",
                description: "A complete financial literacy library designed to help you master every corner of investing with structured lessons and real-world strategies",
                gradient: "from-indigo-500 to-blue-600"
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-900/50 border-slate-800/50 backdrop-blur-xl hover:bg-slate-900/70 transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <pillar.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-3">{pillar.title}</CardTitle>
                    <CardDescription className="text-slate-400 leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Spheron style */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-2/20 to-accent/20"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Build your edge.
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-2 bg-clip-text text-transparent">
                Not your spreadsheet.
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light">
              Stop managing portfolios with outdated tools. 
              <br className="hidden sm:block" />
              Start mastering them with AI-powered intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-lg px-16 py-8 bg-primary hover:bg-primary/90 text-white border-0 shadow-2xl shadow-primary/25">
                <Link href="/pricing" className="flex items-center gap-3">
                  Start Free Trial
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-16 py-8 border-white/20 text-white hover:bg-white/10 backdrop-blur">
                <Link href="/dashboard" className="flex items-center gap-3">
                  See Live Demo
                  <Globe className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Logo size="md" showText={true} animated={false} />
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/library" className="hover:text-white transition-colors">Library</Link>
              <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/legal/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">
              © 2024 Prism. All rights reserved. 
              <span className="mx-2">•</span>
              Analytics & education only. No trading execution.
              <span className="mx-2">•</span>
              Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}