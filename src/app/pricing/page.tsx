import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with portfolio tracking",
      features: [
        "Portfolio tracking for up to 5 assets",
        "Basic performance analytics",
        "Community access",
        "Email support"
      ],
      cta: "Get Started Free",
      href: "/dashboard",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Advanced features for serious investors",
      features: [
        "Unlimited portfolio tracking",
        "Advanced analytics & insights",
        "Real-time market data",
        "Custom alerts & notifications",
        "Priority support",
        "API access"
      ],
      cta: "Start Pro Trial",
      href: "/dashboard",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Tailored solutions for institutions",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees",
        "On-premise deployment",
        "Custom reporting"
      ],
      cta: "Contact Sales",
      href: "/dashboard",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#E5E8FF] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#E5E8FF]/70 max-w-2xl mx-auto">
            Choose the plan that fits your investment needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative bg-slate-800 border-slate-700 ${
                plan.popular 
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                  : 'border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-cyan-500 text-white px-4 py-1">
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
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#E5E8FF]/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#E5E8FF] text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-[#E5E8FF]">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E5E8FF]/70">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-[#E5E8FF]">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E5E8FF]/70">
                  Yes, all paid plans come with a 14-day free trial. No credit card required.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-[#E5E8FF]">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E5E8FF]/70">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-[#E5E8FF]">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E5E8FF]/70">
                  Yes, we offer a 30-day money-back guarantee for all paid plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}