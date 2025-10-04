"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Shield, Zap, Brain, BarChart3, Users, MessageSquare, Globe } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PricingPage() {
  const plans = [
    {
      name: "Monthly",
      price: "$150",
      period: "per month",
      description: "Flexible monthly access to all features",
      savings: null,
      popular: false
    },
    {
      name: "Yearly",
      price: "$1500",
      period: "per year",
      description: "Full access with savings",
      savings: "Save $300/year",
      popular: true
    },
    {
      name: "2-Year",
      price: "$2750",
      period: "for 2 years",
      description: "Ultimate commitment to growth",
      savings: "Save $850",
      popular: false
    }
  ]

  const features = [
    {
      icon: BarChart3,
      name: "Unlimited portfolio tracking",
      description: "Track unlimited portfolios and assets"
    },
    {
      icon: Brain,
      name: "AI-powered insights",
      description: "Advanced machine learning analytics"
    },
    {
      icon: Zap,
      name: "Real-time market data",
      description: "Live price feeds and instant updates"
    },
    {
      icon: BarChart3,
      name: "Automated rebalancing",
      description: "Smart portfolio optimization"
    },
    {
      icon: Brain,
      name: "Predictive analytics",
      description: "Future performance forecasting"
    },
    {
      icon: Shield,
      name: "Private key security",
      description: "Non-custodial, your keys your assets"
    },
    {
      icon: Users,
      name: "Community access",
      description: "Connect with fellow investors"
    },
    {
      icon: MessageSquare,
      name: "Priority support",
      description: "24/7 dedicated customer support"
    },
    {
      icon: Globe,
      name: "API access",
      description: "Integrate with external tools"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white">
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
              <Link href="/pricing" className="text-white font-medium">
                Pricing
              </Link>
              <Link href="/community" className="text-gray-300 hover:text-white transition-colors">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#FF007A] via-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              Prism Guardian
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Choose your plan. All tiers unlock the full Prism experience equally.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card 
                className={`relative bg-slate-900/50 border-slate-700 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/20 hover:shadow-[#8B5CF6]/30' 
                    : 'hover:border-[#FF007A] hover:shadow-[0_0_30px_rgba(255,0,122,0.3)]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-[#E5E8FF]">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#E5E8FF]">
                      {plan.price}
                    </span>
                    <span className="text-[#E5E8FF]/60 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="text-[#E5E8FF]/70 mt-2">
                    {plan.description}
                  </CardDescription>
                  {plan.savings && (
                    <div className="mt-2">
                      <Badge variant="outline" className="border-[#22C55E] text-[#22C55E]">
                        {plan.savings}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="text-center">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] hover:from-[#FF007A]/90 hover:to-[#8B5CF6]/90 text-white' 
                        : 'bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white'
                    } hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]`}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-[#E5E8FF] text-center mb-12">
            Everything You Get with <span className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">Prism Guardian</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="bg-slate-900/30 border-slate-700 hover:border-[#8B5CF6] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#E5E8FF] mb-2">
                            {feature.name}
                          </h3>
                          <p className="text-[#E5E8FF]/70 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-[#FF007A]/10 via-[#8B5CF6]/10 to-[#22D3EE]/10 rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Become a <span className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">Guardian</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust Prism Guardian for their portfolio management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] hover:from-[#FF007A]/90 hover:to-[#8B5CF6]/90 text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,122,0.5)]"
            >
              <Link href="/signup">
                Start Your Journey
              </Link>
            </Button>
            <button 
              onClick={() => {
                document.getElementById('why-prism-exists')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
              className="border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] rounded-lg"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Why Prism Exists Section */}
        <motion.div 
          id="why-prism-exists"
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#E5E8FF] mb-4">
              Why Choose <span className="bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] bg-clip-text text-transparent">Prism Guardian</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A revolution in portfolio analytics — built to give power back to investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/50 border-slate-700 hover:border-[#FF007A] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,122,0.3)]">
                <CardHeader>
                  <CardTitle className="text-[#E5E8FF] text-xl">Why Prism Was Created</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#E5E8FF]/70 leading-relaxed">
                    Prism was born from a vision to bring transparency, accuracy, and AI-assisted portfolio mastery to every investor. 
                    We believe that sophisticated portfolio analysis shouldn't be reserved for institutional players — 
                    every individual investor deserves access to professional-grade insights and tools.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/50 border-slate-700 hover:border-[#8B5CF6] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <CardHeader>
                  <CardTitle className="text-[#E5E8FF] text-xl">Prism's Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#E5E8FF]/70 leading-relaxed">
                    We're leading the next evolution in portfolio analysis through non-custodial AI, user ownership, and predictive analytics. 
                    Our mission is to democratize investment intelligence by making complex data analysis accessible, 
                    understandable, and actionable for investors of all levels.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/50 border-slate-700 hover:border-[#22D3EE] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <CardHeader>
                  <CardTitle className="text-[#E5E8FF] text-xl">Our Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#E5E8FF]/70 leading-relaxed">
                    Prism is transforming investment intelligence by automating complex data analysis and making professional-grade insights 
                    accessible to everyone. We're empowering investors to make smarter decisions, optimize their portfolios, 
                    and achieve their financial goals with confidence and clarity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20">
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