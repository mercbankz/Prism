import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Shield, Brain, TrendingUp, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Prism
            </span>
            <br />
            AI Portfolio Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Analyze. Learn. Play. Grow.
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            The first non-custodial, AI-powered portfolio analytics platform that puts privacy first. 
            Get insights, learn through gamification, and grow your financial knowledge—all without giving up control of your assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/library">Explore Library</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to master your portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analytics, AI-powered insights, and gamified learning—all in one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Non-Custodial & Private</CardTitle>
                <CardDescription>
                  Your keys, your coins. We never store private keys or execute trades. 
                  All data stays private with no public leaderboards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="w-10 h-10 text-primary mb-4" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Get personalized portfolio analysis, health scores, and rebalancing suggestions 
                  powered by advanced AI—for education only, never financial advice.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Financial Chess</CardTitle>
                <CardDescription>
                  Play quarterly chess games where your portfolio becomes the board. 
                  Learn market dynamics through strategic gameplay.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Financial Library</CardTitle>
                <CardDescription>
                  Access curated financial literacy content with built-in reader, 
                  highlights, and progress tracking to accelerate your learning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Gamified Learning</CardTitle>
                <CardDescription>
                  Earn badges, accumulate points, and unlock rewards as you engage 
                  with the platform and improve your financial knowledge.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Portfolio Analytics</CardTitle>
                <CardDescription>
                  Comprehensive dashboard with asset allocation, performance tracking, 
                  news sentiment analysis, and simulation-only rebalancing tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to transform your portfolio management?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of investors who are already using Prism to analyze, learn, and grow.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/dashboard">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Prism</span>
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
