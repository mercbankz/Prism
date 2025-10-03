"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Shield, Brain, TrendingUp, Users, Zap, ArrowRight, Star, Globe, Activity } from "lucide-react"
import { Logo } from "@/components/shared/Logo"
import { motion } from "framer-motion"

export default function HomePage() {
  // Mock stats for the live metrics section
  const liveStats = {
    portfoliosAnalyzed: 61400,
    badgesEarned: 190500,
    booksCompleted: 30000,
    activeUsers: 12500
  }

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
            <span className="bg-gradient-to-r from-primary-2 to-accent bg-clip-text text-transparent">
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

          {/* Live Stats Marquee - Spheron style */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {liveStats.portfoliosAnalyzed.toLocaleString()}+
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Portfolios Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-2 mb-2">
                {liveStats.badgesEarned.toLocaleString()}+
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                {liveStats.booksCompleted.toLocaleString()}+
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Books Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-warning mb-2">
                {liveStats.activeUsers.toLocaleString()}+
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Active Users</div>
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
              Four Pillars of Excellence
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built on the foundation of privacy, intelligence, strategy, and growth
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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