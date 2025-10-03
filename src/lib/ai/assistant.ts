/**
 * Prism AI Assistant
 * Provides educational content and portfolio analysis (not financial advice)
 */

export interface PortfolioContext {
  totalValue: number
  healthScore: number
  topHolding: string
  riskLevel: string
  diversificationScore: number
  volatilityScore: number
  recentNews: string[]
  assetAllocation: Record<string, number>
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  context?: PortfolioContext
}

export interface AIResponse {
  content: string
  confidence: number
  sources?: string[]
  disclaimer: boolean
}

export type AIProvider = 'mock' | 'openai' | 'anthropic'

export abstract class BaseAIAssistant {
  protected readonly provider: AIProvider
  protected readonly complianceDisclaimer = "This is educational information only, not financial advice. Always consult with qualified professionals for investment decisions."

  constructor(provider: AIProvider) {
    this.provider = provider
  }

  abstract generateResponse(message: string, context?: PortfolioContext): Promise<AIResponse>
  
  protected injectContext(message: string, context?: PortfolioContext): string {
    if (!context) return message

    const contextString = `
Portfolio Context:
- Total Value: $${context.totalValue.toLocaleString()}
- Health Score: ${context.healthScore}/100
- Risk Level: ${context.riskLevel}
- Top Holding: ${context.topHolding}
- Diversification Score: ${context.diversificationScore}/100
- Recent Market News: ${context.recentNews.slice(0, 3).join(', ')}

User Question: ${message}
`
    return contextString
  }
}

export class MockAIAssistant extends BaseAIAssistant {
  private responses: Record<string, string[]> = {
    portfolio: [
      "Based on your portfolio analysis, I can see you have a diversified mix of assets. Your health score of {healthScore}/100 indicates {healthLevel} portfolio management. The key areas to focus on are diversification and risk management.",
      "Your portfolio shows {riskLevel} risk characteristics. With {topHolding} as your largest holding, you might want to consider rebalancing to reduce concentration risk. Remember, this is educational analysis only.",
      "Looking at your asset allocation, you have good exposure across different categories. Your diversification score suggests room for improvement in spreading risk across uncorrelated assets."
    ],
    education: [
      "Great question about investing fundamentals! Diversification is one of the most important concepts in portfolio management. It involves spreading your investments across different asset classes, sectors, and geographies to reduce risk.",
      "Understanding risk and return is crucial for any investor. Higher potential returns typically come with higher risk. The key is finding the right balance for your risk tolerance and investment timeline.",
      "Market volatility is normal and expected. Instead of trying to time the market, focus on long-term investing principles like dollar-cost averaging and maintaining a diversified portfolio."
    ],
    analysis: [
      "Based on current market conditions and your portfolio composition, here are some educational insights: Market sentiment appears mixed, with some sectors showing strength while others face headwinds.",
      "Your portfolio's correlation with major market indices suggests it will move somewhat in line with broader market trends. This is typical for diversified portfolios.",
      "The recent news affecting your holdings includes both positive and negative developments. It's important to focus on long-term fundamentals rather than short-term market noise."
    ],
    general: [
      "I'm here to help you understand investing concepts and analyze your portfolio for educational purposes. What specific topic would you like to explore?",
      "As your AI assistant, I can provide insights on portfolio analysis, market education, and investment concepts. Remember, this is all educational content, not personalized financial advice.",
      "Feel free to ask about any aspect of investing or portfolio management. I can help explain concepts, analyze trends, and provide educational resources."
    ]
  }

  constructor() {
    super('mock')
  }

  async generateResponse(message: string, context?: PortfolioContext): Promise<AIResponse> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500))

    // Determine response category based on message content
    const lowerMessage = message.toLowerCase()
    let category: keyof typeof this.responses = 'general'

    if (lowerMessage.includes('portfolio') || lowerMessage.includes('holding') || lowerMessage.includes('allocation')) {
      category = 'portfolio'
    } else if (lowerMessage.includes('learn') || lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does')) {
      category = 'education'
    } else if (lowerMessage.includes('analysis') || lowerMessage.includes('market') || lowerMessage.includes('trend')) {
      category = 'analysis'
    }

    // Select random response from category
    const responses = this.responses[category]
    let response = responses[Math.floor(Math.random() * responses.length)]

    // Inject context variables if available
    if (context) {
      response = response
        .replace('{healthScore}', context.healthScore.toString())
        .replace('{healthLevel}', context.healthScore >= 80 ? 'excellent' : context.healthScore >= 60 ? 'good' : 'moderate')
        .replace('{riskLevel}', context.riskLevel.toLowerCase())
        .replace('{topHolding}', context.topHolding)
    }

    // Add specific insights based on context
    if (context && category === 'portfolio') {
      if (context.healthScore < 60) {
        response += " I notice your health score could be improved. Consider reviewing your asset allocation and diversification strategy."
      }
      if (context.volatilityScore > 70) {
        response += " Your portfolio shows high volatility, which means larger price swings. This could be appropriate if you have a long investment timeline."
      }
    }

    return {
      content: response,
      confidence: 0.8 + Math.random() * 0.2, // Mock confidence between 80-100%
      disclaimer: true
    }
  }
}

export class OpenAIAssistant extends BaseAIAssistant {
  private apiKey: string

  constructor(apiKey: string) {
    super('openai')
    this.apiKey = apiKey
  }

  async generateResponse(message: string, context?: PortfolioContext): Promise<AIResponse> {
    // TODO: Implement OpenAI integration
    // For now, fall back to mock responses
    const mockAssistant = new MockAIAssistant()
    return mockAssistant.generateResponse(message, context)
  }
}

export class AnthropicAssistant extends BaseAIAssistant {
  private apiKey: string

  constructor(apiKey: string) {
    super('anthropic')
    this.apiKey = apiKey
  }

  async generateResponse(message: string, context?: PortfolioContext): Promise<AIResponse> {
    // TODO: Implement Anthropic integration
    // For now, fall back to mock responses
    const mockAssistant = new MockAIAssistant()
    return mockAssistant.generateResponse(message, context)
  }
}

/**
 * Factory function to create AI assistant based on provider
 */
export function createAIAssistant(provider: AIProvider = 'mock', apiKey?: string): BaseAIAssistant {
  switch (provider) {
    case 'openai':
      if (!apiKey) throw new Error('OpenAI API key is required')
      return new OpenAIAssistant(apiKey)
    case 'anthropic':
      if (!apiKey) throw new Error('Anthropic API key is required')
      return new AnthropicAssistant(apiKey)
    case 'mock':
    default:
      return new MockAIAssistant()
  }
}

/**
 * Get AI provider from environment
 */
export function getAIProviderFromEnv(): AIProvider {
  const provider = process.env.AI_PROVIDER as AIProvider
  return ['mock', 'openai', 'anthropic'].includes(provider) ? provider : 'mock'
}
