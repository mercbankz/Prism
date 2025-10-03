"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Shield, Brain, TrendingUp, Users, BookOpen, Trophy } from "lucide-react"
import { Logo } from "@/components/shared/Logo"

const plans = [
  {
    name: "Prism Pro",
    description: "Complete AI portfolio intelligence platform",
    monthlyPrice: 150,
    yearlyPrice: 1500,
    twoYearPrice: 2500,
    features: [
      "AI Portfolio Assistant with live market data",
      "Advanced portfolio analytics & charts",
      "Financial Chess game with AI opponent",
      "Complete Financial Library access",
      "100+ achievement badges",
      "Data export tools (CSV, PDF, JSON)",
      "2FA security & privacy-first design",
      "Non-custodial & educational only",
      "Priority support",
      "Cancel anytime"
    ],
    popular: true,
    ctaText: "Start Free Trial",
    ctaVariant: "default" as const
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "twoyear">("monthly")

  const getPrice = (plan: typeof plans[0]) => {
    switch (billingCycle) {
      case "yearly":
        return plan.yearlyPrice
      case "twoyear":
        return plan.twoYearPrice
      default:
        return plan.monthlyPrice
    }
  }

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const yearlyCost = plan.yearlyPrice
    const twoYearCost = plan.twoYearPrice
    const twoYearMonthly = twoYearCost / 24

    switch (billingCycle) {
      case "yearly":
        return `Save $${monthlyCost - yearlyCost}/year`
      case "twoyear":
        return `Save $${monthlyCost * 2 - twoYearCost}/2 years`
      default:
        return ""
    }
  }

  const handleSubscribe = async (planName: string) => {
    try {
      // Create Stripe Checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan: planName.toLowerCase().replace(' ', '_'),
          billing: billingCycle 
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }
      
      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      // Fallback to dashboard for demo purposes
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="sm" showText={true} animated={false} />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/library">
                <Button variant="ghost">Library</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} animated={true} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose Your <span className="text-primary">Prism</span> Plan
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock the full power of AI portfolio intelligence. Start with our Pro plan and transform how you analyze, learn, and grow your investments.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative"
            >
              <div className="flex items-center space-x-1">
                <span className={billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}>
                  Yearly
                </span>
                <Badge variant="secondary" className="ml-2">2 months free</Badge>
              </div>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBillingCycle(billingCycle === "twoyear" ? "monthly" : "twoyear")}
              className="relative"
            >
              <div className="flex items-center space-x-1">
                <span className={billingCycle === "twoyear" ? "text-foreground" : "text-muted-foreground"}>
                  2 Years
                </span>
                <Badge variant="secondary" className="ml-2">Best value</Badge>
              </div>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? "ring-2 ring-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    Founder's Launch - 25% off first month
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base mb-6">{plan.description}</CardDescription>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    ${getPrice(plan)}
                    <span className="text-lg font-normal text-muted-foreground">
                      /{billingCycle === "monthly" ? "month" : billingCycle === "yearly" ? "year" : "2 years"}
                    </span>
                  </div>
                  {getSavings(plan) && (
                    <Badge variant="secondary" className="text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400">
                      {getSavings(plan)}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button 
                  onClick={() => handleSubscribe(plan.name)}
                  className="w-full" 
                  size="lg"
                  variant={plan.ctaVariant}
                >
                  {plan.ctaText}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Everything included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Overview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Prism Pro?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of portfolio management with AI-powered insights and gamified learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized insights powered by live market data and advanced AI analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Advanced Charts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive portfolio analytics with interactive charts and performance tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Financial Chess</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strategic gameplay where your portfolio becomes the chessboard. Learn through play.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Learning Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Curated financial education with progress tracking and achievement badges.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-6 p-6 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Non-Custodial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Privacy-First</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Educational Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is this financial advice?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No, Prism is for educational purposes only. We provide analytics and insights to help you learn about portfolio management, but we never provide financial advice or execute trades on your behalf.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you store my private keys?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Absolutely not. Prism is non-custodial, meaning we never store your private keys or have access to your funds. You maintain complete control over your assets at all times.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Logo size="sm" showText={true} animated={false} />
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-foreground">Terms of Service</Link>
              <Link href="/legal/disclaimer" className="hover:text-foreground">Disclaimer</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Prism. All rights reserved. Not financial advice. For educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
