import { NextRequest, NextResponse } from 'next/server'

// Enhanced financial knowledge base
const financialKnowledge = {
  stocks: {
    aapl: "Apple Inc. (AAPL) is a technology giant with strong fundamentals. Current P/E ratio around 28, strong cash position, and consistent dividend growth. Consider for long-term growth portfolios.",
    tsla: "Tesla (TSLA) is a high-growth electric vehicle company with significant volatility. Strong revenue growth but high valuation metrics. Suitable for aggressive growth investors with high risk tolerance.",
    nvda: "NVIDIA (NVDA) is a leader in AI chips and graphics processing. Benefiting from AI boom but trading at premium valuations. Consider dollar-cost averaging for long-term exposure.",
    msft: "Microsoft (MSFT) has strong cloud computing business with Azure. Consistent revenue growth and strong balance sheet. Good for conservative growth investors.",
    googl: "Alphabet (GOOGL) dominates search and digital advertising. Strong cash generation and AI investments. Consider for long-term growth with some regulatory risk.",
    meta: "Meta (META) owns Facebook, Instagram, and WhatsApp. Investing heavily in metaverse. High volatility but strong cash flow. Suitable for risk-tolerant investors."
  },
  crypto: {
    btc: "Bitcoin (BTC) is digital gold with limited supply. High volatility but potential hedge against inflation. Consider 1-5% allocation for diversification.",
    eth: "Ethereum (ETH) is a smart contract platform. Strong developer ecosystem but faces scalability challenges. Higher risk/reward than Bitcoin.",
    sol: "Solana (SOL) offers fast transactions and low fees. Growing DeFi ecosystem but newer and less proven than Ethereum.",
    ada: "Cardano (ADA) focuses on sustainability and peer-reviewed development. Slower development but more academic approach."
  },
  strategies: {
    value: "Value investing focuses on buying undervalued stocks. Look for low P/E, P/B ratios, and strong fundamentals. Warren Buffett's approach.",
    growth: "Growth investing targets companies with high earnings growth. Higher valuations but potential for significant returns.",
    dividend: "Dividend investing focuses on companies with consistent dividend payments. Provides income and potential for dividend growth.",
    index: "Index investing provides broad market exposure at low cost. Vanguard founder John Bogle's approach for most investors."
  },
  marketAnalysis: {
    bull: "Bull markets are characterized by rising prices and optimism. Focus on growth stocks and risk assets. Maintain discipline and avoid FOMO.",
    bear: "Bear markets offer opportunities to buy quality assets at discounted prices. Focus on value stocks and defensive sectors.",
    recession: "Recessions are normal parts of economic cycles. Focus on quality companies with strong balance sheets and cash flow.",
    inflation: "Inflation erodes purchasing power. Consider real estate, commodities, and companies with pricing power."
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const userMessage = message.toLowerCase()
    let response = ""
    let suggestions: string[] = []
    let dataSources: string[] = []

    // Stock analysis
    if (userMessage.includes('aapl') || userMessage.includes('apple')) {
      response = financialKnowledge.stocks.aapl
      dataSources = ["Yahoo Finance", "SEC Filings", "Financial Statements"]
    } else if (userMessage.includes('tsla') || userMessage.includes('tesla')) {
      response = financialKnowledge.stocks.tsla
      dataSources = ["Tesla Investor Relations", "SEC Filings", "Market Analysis"]
    } else if (userMessage.includes('nvda') || userMessage.includes('nvidia')) {
      response = financialKnowledge.stocks.nvda
      dataSources = ["NVIDIA Investor Relations", "AI Industry Reports", "Market Research"]
    } else if (userMessage.includes('msft') || userMessage.includes('microsoft')) {
      response = financialKnowledge.stocks.msft
      dataSources = ["Microsoft Investor Relations", "Cloud Computing Reports", "Financial Analysis"]
    } else if (userMessage.includes('googl') || userMessage.includes('google') || userMessage.includes('alphabet')) {
      response = financialKnowledge.stocks.googl
      dataSources = ["Alphabet Investor Relations", "Digital Advertising Reports", "SEC Filings"]
    } else if (userMessage.includes('meta') || userMessage.includes('facebook')) {
      response = financialKnowledge.stocks.meta
      dataSources = ["Meta Investor Relations", "Social Media Analysis", "Market Research"]
    }
    
    // Crypto analysis
    else if (userMessage.includes('bitcoin') || userMessage.includes('btc')) {
      response = financialKnowledge.crypto.btc
      dataSources = ["CoinMarketCap", "Blockchain Analysis", "Market Research"]
    } else if (userMessage.includes('ethereum') || userMessage.includes('eth')) {
      response = financialKnowledge.crypto.eth
      dataSources = ["Ethereum Foundation", "DeFi Analytics", "Smart Contract Data"]
    } else if (userMessage.includes('solana') || userMessage.includes('sol')) {
      response = financialKnowledge.crypto.sol
      dataSources = ["Solana Labs", "DeFi Protocols", "Transaction Analytics"]
    } else if (userMessage.includes('cardano') || userMessage.includes('ada')) {
      response = financialKnowledge.crypto.ada
      dataSources = ["Cardano Foundation", "Academic Research", "Blockchain Metrics"]
    }
    
    // Investment strategies
    else if (userMessage.includes('value investing') || userMessage.includes('value stocks')) {
      response = financialKnowledge.strategies.value
      suggestions = ["Show me undervalued stocks", "What's my portfolio's value tilt?", "Benjamin Graham principles"]
      dataSources = ["Value Investing Research", "Financial Statements", "Market Analysis"]
    } else if (userMessage.includes('growth investing') || userMessage.includes('growth stocks')) {
      response = financialKnowledge.strategies.growth
      suggestions = ["Identify growth opportunities", "Tech stock analysis", "Growth vs value comparison"]
      dataSources = ["Growth Investing Studies", "Earnings Reports", "Industry Analysis"]
    } else if (userMessage.includes('dividend') || userMessage.includes('income')) {
      response = financialKnowledge.strategies.dividend
      suggestions = ["Dividend aristocrats", "Income portfolio construction", "Dividend yield analysis"]
      dataSources = ["Dividend Databases", "Company Financials", "Income Analysis"]
    } else if (userMessage.includes('index') || userMessage.includes('etf') || userMessage.includes('passive')) {
      response = financialKnowledge.strategies.index
      suggestions = ["Best index funds", "Asset allocation with ETFs", "Low-cost investing"]
      dataSources = ["ETF Research", "Index Fund Analysis", "Cost Analysis"]
    }
    
    // Market analysis
    else if (userMessage.includes('bull market') || userMessage.includes('bullish')) {
      response = financialKnowledge.marketAnalysis.bull
      suggestions = ["Growth stock opportunities", "Risk management in bull markets", "Market timing strategies"]
      dataSources = ["Market Research", "Economic Indicators", "Historical Analysis"]
    } else if (userMessage.includes('bear market') || userMessage.includes('bearish')) {
      response = financialKnowledge.marketAnalysis.bear
      suggestions = ["Defensive stock picks", "Value opportunities", "Bear market strategies"]
      dataSources = ["Market Analysis", "Historical Bear Markets", "Defensive Strategies"]
    } else if (userMessage.includes('recession') || userMessage.includes('economic downturn')) {
      response = financialKnowledge.marketAnalysis.recession
      suggestions = ["Recession-proof stocks", "Defensive allocation", "Economic indicators"]
      dataSources = ["Economic Research", "Recession Analysis", "Historical Data"]
    } else if (userMessage.includes('inflation') || userMessage.includes('rising prices')) {
      response = financialKnowledge.marketAnalysis.inflation
      suggestions = ["Inflation hedge strategies", "Real estate investing", "Commodity exposure"]
      dataSources = ["Inflation Research", "Real Asset Analysis", "Economic Indicators"]
    }
    
    // Portfolio management
    else if (userMessage.includes('portfolio') || userMessage.includes('allocation')) {
      response = "Portfolio management involves balancing risk and return through diversification. Consider your time horizon, risk tolerance, and financial goals. A typical balanced portfolio might include 60% stocks, 30% bonds, and 10% alternatives. Regular rebalancing helps maintain your target allocation."
      suggestions = ["Analyze my current allocation", "Suggest rebalancing", "Risk assessment"]
      dataSources = ["Modern Portfolio Theory", "Asset Allocation Studies", "Risk Analysis"]
    } else if (userMessage.includes('rebalance') || userMessage.includes('rebalancing')) {
      response = "Portfolio rebalancing involves adjusting your asset allocation back to target weights. This typically happens when allocations drift more than 5-10% from targets. Rebalancing helps you buy low and sell high systematically, reducing risk and potentially improving returns."
      suggestions = ["Check if I need rebalancing", "Rebalancing strategies", "Tax-efficient rebalancing"]
      dataSources = ["Rebalancing Research", "Tax Analysis", "Performance Studies"]
    } else if (userMessage.includes('risk') || userMessage.includes('volatility')) {
      response = "Risk management is crucial for long-term investing success. Diversify across asset classes, sectors, and geographies. Consider your time horizon and emotional tolerance for volatility. Use position sizing, stop-losses, and regular rebalancing to manage risk effectively."
      suggestions = ["Assess my portfolio risk", "Risk tolerance quiz", "Diversification analysis"]
      dataSources = ["Risk Management Research", "Portfolio Theory", "Behavioral Finance"]
    }
    
    // Financial planning
    else if (userMessage.includes('retirement') || userMessage.includes('401k') || userMessage.includes('ira')) {
      response = "Retirement planning requires maximizing tax-advantaged accounts like 401(k)s and IRAs. Consider the power of compound interest and start early. Aim to save 10-15% of income for retirement. Diversify between traditional and Roth accounts based on current vs. future tax rates."
      suggestions = ["Retirement savings calculator", "IRA vs 401k comparison", "Retirement allocation"]
      dataSources = ["Retirement Planning Guides", "Tax Code Analysis", "Compound Interest Studies"]
    } else if (userMessage.includes('tax') || userMessage.includes('taxes')) {
      response = "Tax-efficient investing can significantly improve long-term returns. Use tax-advantaged accounts, consider tax-loss harvesting, and be mindful of capital gains. Asset location matters - place tax-inefficient investments in tax-advantaged accounts."
      suggestions = ["Tax-loss harvesting opportunities", "Asset location optimization", "Tax-efficient strategies"]
      dataSources = ["Tax Code Analysis", "Tax Efficiency Studies", "Investment Strategies"]
    }
    
    // Default response for general financial questions
    else {
      const generalResponses = [
        "I'm here to help with your investment and financial planning questions. I can analyze stocks, cryptocurrencies, provide market insights, and help with portfolio management strategies. What specific topic would you like to explore?",
        "As your AI financial advisor, I can provide insights on market trends, individual securities, portfolio optimization, and investment strategies. Feel free to ask about specific stocks, market conditions, or investment approaches.",
        "I specialize in investment analysis, portfolio management, and financial planning. Whether you're interested in individual stocks, market analysis, or investment strategies, I'm here to provide data-driven insights and recommendations."
      ]
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)]
      suggestions = ["Analyze AAPL stock", "Bitcoin investment outlook", "Portfolio diversification", "Market trends"]
      dataSources = ["Financial Research", "Market Data", "Investment Analysis"]
    }

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      suggestions: suggestions.length > 0 ? suggestions : [
        "Analyze AAPL stock",
        "Bitcoin investment outlook", 
        "Portfolio diversification",
        "Market trends"
      ],
      dataSources: dataSources.length > 0 ? dataSources : ["Market Data", "Financial Research", "Investment Analysis"]
    })

  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}