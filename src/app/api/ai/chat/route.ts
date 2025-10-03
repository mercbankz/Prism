import { NextRequest, NextResponse } from 'next/server'
import { createAIAssistant, getAIProviderFromEnv, type PortfolioContext } from '@/lib/ai/assistant'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Create AI assistant
    const provider = getAIProviderFromEnv()
    const apiKey = provider === 'openai' ? process.env.OPENAI_API_KEY : 
                   provider === 'anthropic' ? process.env.ANTHROPIC_API_KEY : 
                   undefined

    const assistant = createAIAssistant(provider, apiKey)

    // Generate response
    const response = await assistant.generateResponse(message, context as PortfolioContext)

    return NextResponse.json({
      response: response.content,
      confidence: response.confidence,
      disclaimer: response.disclaimer,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in AI chat:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
