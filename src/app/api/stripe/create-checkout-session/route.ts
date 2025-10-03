import { NextRequest, NextResponse } from 'next/server'

// Mock Stripe integration - in production, you would use the actual Stripe SDK
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// })

export async function POST(request: NextRequest) {
  try {
    const { plan, billing } = await request.json()

    // Validate input
    if (!plan || !billing) {
      return NextResponse.json(
        { error: 'Plan and billing cycle are required' },
        { status: 400 }
      )
    }

    // Define pricing based on plan and billing cycle
    const pricing = {
      prism_pro: {
        monthly: { price: 15000, currency: 'usd', interval: 'month' }, // $150 in cents
        yearly: { price: 150000, currency: 'usd', interval: 'year' },   // $1500 in cents
        twoyear: { price: 250000, currency: 'usd', interval: 'year' }   // $2500 in cents (custom)
      }
    }

    const planPricing = pricing[plan as keyof typeof pricing]
    if (!planPricing) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    const priceInfo = planPricing[billing as keyof typeof planPricing]
    if (!priceInfo) {
      return NextResponse.json(
        { error: 'Invalid billing cycle' },
        { status: 400 }
      )
    }

    // In production, this would create a real Stripe checkout session:
    /*
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: priceInfo.currency,
            product_data: {
              name: 'Prism Pro',
              description: 'AI Portfolio Intelligence Platform',
              images: ['https://your-domain.com/logo.png'],
            },
            unit_amount: priceInfo.price,
            recurring: billing !== 'twoyear' ? {
              interval: priceInfo.interval,
            } : undefined,
          },
          quantity: billing === 'twoyear' ? 24 : 1, // 24 months for 2-year plan
        },
      ],
      mode: billing === 'twoyear' ? 'payment' : 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
      metadata: {
        plan,
        billing,
      },
    })
    */

    // For demo purposes, simulate successful checkout session creation
    const mockSession = {
      id: `cs_mock_${Date.now()}`,
      url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard?session_id=cs_mock_${Date.now()}`,
    }

    return NextResponse.json({ 
      sessionId: mockSession.id,
      url: mockSession.url 
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
