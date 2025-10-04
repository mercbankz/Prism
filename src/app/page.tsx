"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart3, Shield, Brain, TrendingUp, Users, Zap, ArrowRight, Star, Globe, Activity, MessageSquare, BookOpen } from "lucide-react"
import { Logo } from "@/components/shared/Logo"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
        setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Header */}
      <header className="relative z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">
                Prism
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/community" className="text-gray-300 hover:text-white transition-colors">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
          <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#FF007A] via-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              Portfolio Intelligence.
            </span>
            <br />
              <span className="text-white">Learn. Grow. Win.</span>
          </motion.h1>

          <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The world's most advanced non-custodial portfolio analytics platform. 
            Transform your investments with AI-powered insights and gamified learning.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,122,0.5)]"
              >
                <TrendingUp className="mr-2 h-6 w-6" />
                Sign Up
              </Link>
              <Link 
                href="/pricing" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                <Star className="mr-2 h-6 w-6" />
                View Pricing
              </Link>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
                <div className="text-3xl font-bold text-[#22D3EE] mb-2">2.4M+</div>
                <div className="text-gray-400">Portfolios Analyzed</div>
            </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF007A] mb-2">24/7</div>
                <div className="text-gray-400">AI Monitoring</div>
              </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-[#8B5CF6] mb-2">50K+</div>
                <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-[#22C55E] mb-2">24/7</div>
                <div className="text-gray-400">AI Monitoring</div>
              </div>
            </motion.div>
            </div>
        </div>
      </section>

      {/* About Section - Three Feature Cards */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">Prism</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of portfolio management with cutting-edge AI and real-time analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI-Powered Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#22D3EE] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">AI-Powered Analysis</CardTitle>
                  <CardDescription className="text-gray-300">
                    Advanced machine learning algorithms analyze your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#22D3EE] rounded-full mr-3"></div>
                      Real-time risk assessment
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#22D3EE] rounded-full mr-3"></div>
                      Predictive analytics
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#22D3EE] rounded-full mr-3"></div>
                      Automated rebalancing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Real-Time Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#FF007A] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,122,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF007A] to-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Real-Time Analytics</CardTitle>
                  <CardDescription className="text-gray-300">
                    Live market data and instant portfolio updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#FF007A] rounded-full mr-3"></div>
                      Live price feeds
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#FF007A] rounded-full mr-3"></div>
                      Instant notifications
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#FF007A] rounded-full mr-3"></div>
                      Performance tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Non-Custodial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#22C55E] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Non-Custodial</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your keys, your assets, your control
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full mr-3"></div>
                      Private key security
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full mr-3"></div>
                      No asset custody
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full mr-3"></div>
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and features designed for modern investors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Portfolio Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#22D3EE] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">Portfolio Analytics</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Comprehensive analysis and insights</p>
                  <Button asChild className="w-full bg-[#22D3EE] hover:bg-[#0EA5E9] text-white">
                    <Link href="/dashboard">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#FF007A] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,122,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF007A] to-[#EC4899] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">AI Assistant</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Get personalized investment advice</p>
                  <Button asChild className="w-full bg-[#FF007A] hover:bg-[#EC4899] text-white">
                    <Link href="/ai">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#22C55E] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">Community</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Connect, share insights, and learn from fellow investors</p>
                  <Button asChild className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white">
                    <Link href="/community">
                      Join Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Library */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group relative bg-slate-900/50 border-slate-700 hover:border-[#F59E0B] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">Learning Library</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300 mb-4">Master finance with curated content</p>
                  <Button asChild className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white">
                    <Link href="/library">
                    Browse <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF007A]/10 via-[#8B5CF6]/10 to-[#22D3EE]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your <span className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">Portfolio</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of investors who trust Prism for their portfolio management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,122,0.5)]"
              >
                <TrendingUp className="mr-2 h-6 w-6" />
                Sign Up Now
              </Link>
              <Link 
                href="/pricing" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                <Star className="mr-2 h-6 w-6" />
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">
                Prism
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Prism. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}