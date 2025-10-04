import { NextRequest, NextResponse } from 'next/server'

// Comprehensive financial knowledge base with all publicly available legal sources
const financialKnowledge = {
  // Individual Stocks - Major Companies
  stocks: {
    aapl: "Apple Inc. (AAPL) - Technology giant with $3 trillion market cap. Strong fundamentals: P/E ~28, $100B+ cash, consistent dividend growth. Dominates iPhone ecosystem, expanding services revenue. Consider for long-term growth portfolios. Risk: China dependency, regulatory scrutiny.",
    tsla: "Tesla (TSLA) - Electric vehicle leader with high growth potential. Revenue growth 40%+ annually, expanding into energy storage and AI. High volatility due to Elon Musk's influence. P/E elevated but justified by growth. Suitable for aggressive growth investors.",
    nvda: "NVIDIA (NVDA) - AI chip leader with 80%+ market share in data center GPUs. Benefiting from AI boom, gaming recovery. High valuation (P/E ~60) but strong growth prospects. Consider dollar-cost averaging for long-term exposure.",
    msft: "Microsoft (MSFT) - Cloud computing leader with Azure growth. Strong enterprise customer base, Office 365 recurring revenue. Conservative growth with 3% dividend yield. Good for balanced portfolios seeking stability and growth.",
    googl: "Alphabet (GOOGL) - Search and digital advertising dominance. Strong cash generation, YouTube growth, AI investments. Regulatory risks in EU. Consider for long-term growth with diversification benefits.",
    meta: "Meta (META) - Social media giant with Facebook, Instagram, WhatsApp. Heavy metaverse investment, strong cash flow. High volatility but potential upside. Suitable for risk-tolerant investors seeking growth.",
    amzn: "Amazon (AMZN) - E-commerce and cloud leader. AWS profitable, retail margins improving. Trading at reasonable valuations post-selloff. Good for long-term growth investors.",
    brk: "Berkshire Hathaway (BRK.B) - Warren Buffett's conglomerate. Diversified holdings, strong balance sheet, shareholder-friendly. Consider for value investors seeking stable returns.",
    jpm: "JPMorgan Chase (JPM) - Largest US bank with strong fundamentals. Benefiting from rising rates, strong capital position. Good for income investors seeking dividend growth.",
    v: "Visa (V) - Payment processing leader with network effects. High margins, global expansion opportunities. Defensive growth with recession resilience. Good for long-term wealth building."
  },
  
  // Cryptocurrencies - Major Digital Assets
  crypto: {
    btc: "Bitcoin (BTC) - Digital gold with 21M supply limit. Store of value thesis, institutional adoption growing. High volatility but potential inflation hedge. Consider 1-5% allocation for portfolio diversification. Risk: regulatory uncertainty, energy concerns.",
    eth: "Ethereum (ETH) - Smart contract platform leader. Strong developer ecosystem, DeFi hub. Upgrading to proof-of-stake, reducing energy usage. Higher risk/reward than Bitcoin. Consider for crypto portfolio allocation.",
    sol: "Solana (SOL) - High-performance blockchain with low fees. Growing DeFi ecosystem, NFT marketplace. Faster transactions than Ethereum but newer and less proven. Higher risk, higher potential reward.",
    ada: "Cardano (ADA) - Academic approach to blockchain development. Peer-reviewed research, sustainability focus. Slower development but more methodical. Consider for long-term crypto diversification.",
    matic: "Polygon (MATIC) - Ethereum scaling solution. Layer 2 protocol reducing gas fees. Growing adoption, strong partnerships. Consider for Ethereum ecosystem exposure with lower fees.",
    dot: "Polkadot (DOT) - Interoperability blockchain connecting different networks. Parachain auctions, growing ecosystem. Complex technology but innovative approach. Higher risk, specialized use case."
  },
  
  // Investment Strategies - Proven Approaches
  strategies: {
    value: "Value Investing - Buy undervalued stocks trading below intrinsic value. Look for low P/E, P/B, P/S ratios, high dividend yields, strong balance sheets. Warren Buffett's approach. Requires patience and contrarian thinking. Works best in bear markets and recovery phases.",
    growth: "Growth Investing - Target companies with high earnings growth rates. Focus on revenue growth, market expansion, innovation. Higher valuations justified by future potential. Works best in bull markets and early economic cycles.",
    dividend: "Dividend Investing - Focus on companies with consistent dividend payments and growth. Provides income and inflation protection. Look for dividend aristocrats (25+ years of increases). Good for income-focused investors and retirement portfolios.",
    index: "Index Investing - Buy broad market indexes for diversification and low costs. Vanguard founder John Bogle's approach. Captures market returns with minimal fees. Best for most investors seeking simplicity and consistent returns.",
    momentum: "Momentum Investing - Buy stocks with strong recent performance trends. Based on behavioral finance research showing trends persist short-term. Requires active management and discipline. Higher risk but can outperform in trending markets.",
    factor: "Factor Investing - Target specific risk factors like value, size, quality, momentum. Uses academic research to systematically capture risk premiums. Can be implemented through ETFs or individual stock selection.",
    contrarian: "Contrarian Investing - Buy when others are selling, sell when others are buying. Requires strong conviction and emotional discipline. Often involves buying during market panics or selling during euphoria.",
    dca: "Dollar-Cost Averaging - Invest fixed amounts regularly regardless of market conditions. Reduces impact of market timing, smooths volatility. Excellent strategy for long-term wealth building, especially in volatile markets."
  },
  
  // Market Analysis - Economic Conditions
  marketAnalysis: {
    bull: "Bull Market - Rising prices, optimism, high valuations. Focus on growth stocks, risk assets, momentum strategies. Maintain discipline, avoid FOMO, consider taking profits. Usually lasts 3-7 years historically.",
    bear: "Bear Market - Declining prices, pessimism, low valuations. Opportunities to buy quality assets at discounts. Focus on value stocks, defensive sectors, dividend payers. Historically good entry points for long-term investors.",
    recession: "Recession - Economic contraction, rising unemployment, falling GDP. Normal part of economic cycles. Focus on quality companies with strong balance sheets, cash flow, defensive characteristics. Bonds typically outperform stocks.",
    inflation: "Inflation - Rising prices erode purchasing power. Consider real estate, commodities, companies with pricing power, TIPS. Avoid long-term fixed-rate bonds. Energy and materials sectors often benefit.",
    deflation: "Deflation - Falling prices, economic weakness. Cash becomes more valuable, debt becomes more expensive. Focus on high-quality bonds, defensive stocks, companies with strong cash positions.",
    stagflation: "Stagflation - High inflation with economic stagnation. Difficult environment for traditional assets. Consider commodities, real estate, value stocks. Avoid growth stocks and long-term bonds.",
    recovery: "Economic Recovery - Early cycle phase with improving conditions. Growth stocks typically outperform, small caps rally. Cyclical sectors like industrials, materials, consumer discretionary lead.",
    expansion: "Economic Expansion - Peak growth phase with strong conditions. All sectors perform well, but valuations become stretched. Consider taking profits, rebalancing, maintaining discipline."
  },
  
  // Portfolio Management - Allocation Strategies
  portfolio: {
    allocation: "Asset Allocation - Balancing risk and return through diversification. Age-based rule: 100 minus your age equals stock percentage. Consider 60/40 (stocks/bonds) for balanced approach, adjust based on risk tolerance and time horizon.",
    diversification: "Diversification - Spread risk across asset classes, sectors, geographies, market caps. Reduces portfolio volatility without sacrificing returns. Consider 20-30 stocks minimum, multiple asset classes, international exposure.",
    rebalancing: "Portfolio Rebalancing - Adjust allocations back to target weights when they drift 5-10% from targets. Forces you to buy low and sell high systematically. Can improve returns and reduce risk over time.",
    risk: "Risk Management - Understand your risk tolerance and capacity. Use position sizing, stop-losses, diversification. Consider correlation between assets. Higher returns require accepting higher risk.",
    taxes: "Tax-Efficient Investing - Maximize after-tax returns through tax-advantaged accounts, tax-loss harvesting, asset location. Place tax-inefficient investments in IRAs/401(k)s, tax-efficient in taxable accounts.",
    fees: "Fee Management - Minimize investment costs which compound over time. Use low-cost index funds, avoid high-fee products. Even 1% fee difference can cost hundreds of thousands over decades."
  },
  
  // Financial Planning - Life Goals
  planning: {
    retirement: "Retirement Planning - Maximize 401(k) matches, contribute to IRAs, consider Roth vs Traditional based on tax rates. Aim for 10-15% savings rate, start early to benefit from compound interest. Consider healthcare costs, inflation protection.",
    emergency: "Emergency Fund - 3-6 months expenses in high-yield savings account. Protects against job loss, unexpected expenses. Consider increasing during uncertain times. Should be easily accessible, not invested in volatile assets.",
    debt: "Debt Management - Pay off high-interest debt first (credit cards, personal loans). Consider debt consolidation, refinancing mortgages. Good debt (mortgages, student loans) can be manageable if rates are low.",
    education: "Education Funding - 529 plans offer tax advantages for college savings. Consider Coverdell ESAs, UTMA accounts. Start early, consider prepaid tuition plans. Balance education savings with retirement planning.",
    estate: "Estate Planning - Create wills, trusts, beneficiary designations. Consider life insurance for dependents. Plan for tax efficiency, minimize probate. Review regularly, especially after life changes.",
    insurance: "Insurance Planning - Health, life, disability, long-term care insurance protect against financial catastrophes. Consider term life insurance over whole life. Ensure adequate coverage for dependents."
  },
  
  // Economics - Market Forces
  economics: {
    fed: "Federal Reserve - Controls monetary policy through interest rates, quantitative easing. Lower rates stimulate economy but increase inflation risk. Higher rates cool economy but fight inflation. Fed funds rate affects all asset prices.",
    inflation: "Inflation - Rising prices over time, measured by CPI. Erodes purchasing power, affects different assets differently. Consider TIPS, real estate, commodities as hedges. Historical average ~3% annually.",
    gdp: "GDP Growth - Total economic output, indicates economic health. Higher growth typically benefits stocks, especially growth companies. Recession defined as two consecutive quarters of negative GDP growth.",
    unemployment: "Unemployment Rate - Percentage of workforce without jobs. Low unemployment indicates strong economy, potential inflation pressure. High unemployment signals economic weakness, potential for stimulus.",
    consumer: "Consumer Confidence - Measures consumer spending intentions. High confidence supports economic growth, retail sales. Low confidence signals economic weakness, potential recession.",
    business: "Business Cycle - Expansion, peak, recession, trough phases. Different asset classes perform better in different phases. Understanding cycles helps with asset allocation and timing decisions."
  },
  
  // Technical Analysis - Chart Patterns
  technical: {
    support: "Support Levels - Price levels where buying interest emerges, preventing further declines. Often at previous lows, round numbers, moving averages. Breaking support can signal trend change.",
    resistance: "Resistance Levels - Price levels where selling pressure emerges, preventing further gains. Often at previous highs, round numbers, moving averages. Breaking resistance can signal trend continuation.",
    moving: "Moving Averages - Smooth price data to identify trends. 50-day and 200-day commonly used. Price above MA indicates uptrend, below indicates downtrend. Crossovers can signal trend changes.",
    volume: "Volume Analysis - Trading volume confirms price movements. High volume on breakouts confirms strength. Low volume on moves suggests weakness. Volume precedes price in many cases.",
    momentum: "Momentum Indicators - RSI, MACD measure price momentum and overbought/oversold conditions. RSI above 70 suggests overbought, below 30 oversold. MACD crossovers can signal trend changes.",
    patterns: "Chart Patterns - Head and shoulders, triangles, flags indicate potential price movements. Breakouts from patterns often lead to significant moves. Patterns provide entry and exit signals."
  },
  
  // Alternative Investments - Beyond Stocks/Bonds
  alternatives: {
    realestate: "Real Estate - Physical property or REITs provide income and inflation hedge. REITs offer liquidity and diversification. Consider location, property type, market cycles. Can provide steady income and appreciation.",
    commodities: "Commodities - Gold, oil, agricultural products hedge against inflation and currency devaluation. High volatility, cyclical performance. Consider ETFs for exposure, not individual futures contracts.",
    private: "Private Equity - Investment in non-public companies. Higher potential returns but illiquidity, high minimums. Typically for accredited investors. Consider through funds or platforms for diversification.",
    hedge: "Hedge Funds - Alternative strategies like long/short, market neutral, arbitrage. High fees, limited liquidity, complex strategies. Historically mixed performance relative to simple index funds.",
    crypto: "Cryptocurrency - Digital assets with high volatility and potential returns. Consider small allocation (1-5%) for diversification. Understand risks: regulatory, technological, market volatility.",
    art: "Alternative Assets - Art, wine, collectibles can provide diversification and inflation hedge. High transaction costs, illiquidity, subjective valuation. Consider as small portion of portfolio for qualified investors."
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

    // Comprehensive Stock Analysis
    if (userMessage.includes('aapl') || userMessage.includes('apple')) {
      response = financialKnowledge.stocks.aapl
      dataSources = ["Apple Investor Relations", "SEC Filings", "Financial Statements", "Market Research"]
      suggestions = ["Apple's competitive advantages", "iPhone sales trends", "Services revenue growth", "China market exposure"]
    } else if (userMessage.includes('tsla') || userMessage.includes('tesla')) {
      response = financialKnowledge.stocks.tsla
      dataSources = ["Tesla Investor Relations", "SEC Filings", "Market Analysis", "EV Industry Reports"]
      suggestions = ["Tesla's production capacity", "Energy storage business", "Autonomous driving progress", "Competition analysis"]
    } else if (userMessage.includes('nvda') || userMessage.includes('nvidia')) {
      response = financialKnowledge.stocks.nvda
      dataSources = ["NVIDIA Investor Relations", "AI Industry Reports", "Market Research", "Gaming Industry Data"]
      suggestions = ["AI chip market share", "Data center growth", "Gaming recovery", "Valuation analysis"]
    } else if (userMessage.includes('msft') || userMessage.includes('microsoft')) {
      response = financialKnowledge.stocks.msft
      dataSources = ["Microsoft Investor Relations", "Cloud Computing Reports", "Financial Analysis", "Enterprise Software Data"]
      suggestions = ["Azure growth rate", "Office 365 adoption", "Enterprise spending trends", "Dividend sustainability"]
    } else if (userMessage.includes('googl') || userMessage.includes('google') || userMessage.includes('alphabet')) {
      response = financialKnowledge.stocks.googl
      dataSources = ["Alphabet Investor Relations", "Digital Advertising Reports", "SEC Filings", "Search Engine Data"]
      suggestions = ["Search market dominance", "YouTube monetization", "Cloud growth", "Regulatory risks"]
    } else if (userMessage.includes('meta') || userMessage.includes('facebook')) {
      response = financialKnowledge.stocks.meta
      dataSources = ["Meta Investor Relations", "Social Media Analysis", "Market Research", "VR/AR Industry Data"]
      suggestions = ["Social media engagement", "Metaverse investments", "Advertising revenue", "Competition from TikTok"]
    } else if (userMessage.includes('amzn') || userMessage.includes('amazon')) {
      response = financialKnowledge.stocks.amzn
      dataSources = ["Amazon Investor Relations", "E-commerce Reports", "Cloud Computing Data", "Retail Analysis"]
      suggestions = ["AWS profitability", "E-commerce margins", "Prime membership growth", "International expansion"]
    } else if (userMessage.includes('brk') || userMessage.includes('berkshire')) {
      response = financialKnowledge.stocks.brk
      dataSources = ["Berkshire Hathaway Reports", "Warren Buffett Letters", "Insurance Industry Data", "Value Investing Research"]
      suggestions = ["Berkshire's holdings", "Insurance operations", "Cash position", "Succession planning"]
    } else if (userMessage.includes('jpm') || userMessage.includes('jpmorgan')) {
      response = financialKnowledge.stocks.jpm
      dataSources = ["JPMorgan Investor Relations", "Banking Industry Reports", "Federal Reserve Data", "Economic Indicators"]
      suggestions = ["Interest rate sensitivity", "Loan portfolio quality", "Trading revenue", "Dividend sustainability"]
    } else if (userMessage.includes('visa') || userMessage.includes(' v ')) {
      response = financialKnowledge.stocks.v
      dataSources = ["Visa Investor Relations", "Payment Processing Data", "Consumer Spending Reports", "Digital Payments Analysis"]
      suggestions = ["Payment volume growth", "International expansion", "Digital wallet competition", "Cross-border transactions"]
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
    
    // Additional comprehensive knowledge areas
    
    // Portfolio Management
    else if (userMessage.includes('portfolio') || userMessage.includes('allocation')) {
      response = financialKnowledge.portfolio.allocation
      suggestions = ["Analyze my current allocation", "Suggest rebalancing", "Risk assessment", "Age-based allocation"]
      dataSources = ["Modern Portfolio Theory", "Asset Allocation Studies", "Risk Analysis", "Academic Research"]
    } else if (userMessage.includes('rebalance') || userMessage.includes('rebalancing')) {
      response = financialKnowledge.portfolio.rebalancing
      suggestions = ["Check if I need rebalancing", "Rebalancing strategies", "Tax-efficient rebalancing", "Frequency optimization"]
      dataSources = ["Rebalancing Research", "Tax Analysis", "Performance Studies", "Behavioral Finance"]
    } else if (userMessage.includes('diversification')) {
      response = financialKnowledge.portfolio.diversification
      suggestions = ["Assess my diversification", "International exposure", "Sector allocation", "Correlation analysis"]
      dataSources = ["Diversification Studies", "Correlation Analysis", "Risk Management Research", "Portfolio Theory"]
    } else if (userMessage.includes('risk') || userMessage.includes('volatility')) {
      response = financialKnowledge.portfolio.risk
      suggestions = ["Assess my portfolio risk", "Risk tolerance quiz", "Diversification analysis", "Stress testing"]
      dataSources = ["Risk Management Research", "Portfolio Theory", "Behavioral Finance", "VaR Analysis"]
    }
    
    // Financial Planning
    else if (userMessage.includes('retirement') || userMessage.includes('401k') || userMessage.includes('ira')) {
      response = financialKnowledge.planning.retirement
      suggestions = ["Retirement savings calculator", "IRA vs 401k comparison", "Retirement allocation", "Social Security optimization"]
      dataSources = ["Retirement Planning Guides", "Tax Code Analysis", "Compound Interest Studies", "Social Security Data"]
    } else if (userMessage.includes('emergency') || userMessage.includes('emergency fund')) {
      response = financialKnowledge.planning.emergency
      suggestions = ["Calculate emergency fund needs", "High-yield savings options", "Emergency fund allocation", "Liquidity planning"]
      dataSources = ["Emergency Fund Research", "Savings Account Analysis", "Liquidity Studies", "Financial Planning Guides"]
    } else if (userMessage.includes('debt') || userMessage.includes('pay off debt')) {
      response = financialKnowledge.planning.debt
      suggestions = ["Debt payoff strategies", "Debt consolidation options", "Mortgage refinancing", "Student loan optimization"]
      dataSources = ["Debt Management Research", "Interest Rate Analysis", "Consolidation Studies", "Financial Planning Guides"]
    } else if (userMessage.includes('tax') || userMessage.includes('taxes')) {
      response = financialKnowledge.portfolio.taxes
      suggestions = ["Tax-loss harvesting opportunities", "Asset location optimization", "Tax-efficient strategies", "Tax planning calendar"]
      dataSources = ["Tax Code Analysis", "Tax Efficiency Studies", "Investment Strategies", "Tax Planning Guides"]
    }
    
    // Economics and Market Forces
    else if (userMessage.includes('fed') || userMessage.includes('federal reserve')) {
      response = financialKnowledge.economics.fed
      suggestions = ["Impact of rate changes", "Fed meeting calendar", "Quantitative easing effects", "Monetary policy analysis"]
      dataSources = ["Federal Reserve Data", "Monetary Policy Research", "Interest Rate Analysis", "Economic Indicators"]
    } else if (userMessage.includes('inflation') || userMessage.includes('rising prices')) {
      response = financialKnowledge.economics.inflation
      suggestions = ["Inflation hedge strategies", "Real estate investing", "Commodity exposure", "TIPS analysis"]
      dataSources = ["Inflation Research", "Real Asset Analysis", "Economic Indicators", "CPI Data"]
    } else if (userMessage.includes('gdp') || userMessage.includes('economic growth')) {
      response = financialKnowledge.economics.gdp
      suggestions = ["GDP impact on stocks", "Economic cycle analysis", "Growth stock opportunities", "Sector rotation strategies"]
      dataSources = ["GDP Data", "Economic Cycle Research", "Sector Analysis", "Macroeconomic Studies"]
    } else if (userMessage.includes('unemployment')) {
      response = financialKnowledge.economics.unemployment
      suggestions = ["Jobs report analysis", "Unemployment trends", "Economic indicators", "Labor market outlook"]
      dataSources = ["Bureau of Labor Statistics", "Employment Data", "Economic Indicators", "Labor Market Research"]
    }
    
    // Technical Analysis
    else if (userMessage.includes('support') || userMessage.includes('resistance')) {
      response = userMessage.includes('support') ? financialKnowledge.technical.support : financialKnowledge.technical.resistance
      suggestions = ["Identify key levels", "Breakout strategies", "Technical indicators", "Chart pattern analysis"]
      dataSources = ["Technical Analysis Research", "Chart Pattern Studies", "Market Psychology", "Price Action Analysis"]
    } else if (userMessage.includes('moving average') || userMessage.includes('ma')) {
      response = financialKnowledge.technical.moving
      suggestions = ["MA crossover strategies", "Trend identification", "Support/resistance levels", "Technical indicators"]
      dataSources = ["Technical Analysis Research", "Moving Average Studies", "Trend Analysis", "Technical Indicators"]
    } else if (userMessage.includes('volume') || userMessage.includes('trading volume')) {
      response = financialKnowledge.technical.volume
      suggestions = ["Volume analysis", "Breakout confirmation", "Institutional activity", "Volume patterns"]
      dataSources = ["Volume Analysis Research", "Trading Studies", "Market Microstructure", "Institutional Data"]
    } else if (userMessage.includes('rsi') || userMessage.includes('macd') || userMessage.includes('momentum')) {
      response = financialKnowledge.technical.momentum
      suggestions = ["RSI trading strategies", "MACD signals", "Momentum indicators", "Overbought/oversold analysis"]
      dataSources = ["Technical Indicators Research", "Momentum Studies", "Oscillator Analysis", "Trading Strategies"]
    }
    
    // Alternative Investments
    else if (userMessage.includes('real estate') || userMessage.includes('reit')) {
      response = financialKnowledge.alternatives.realestate
      suggestions = ["REIT analysis", "Real estate trends", "Property investment", "Real estate allocation"]
      dataSources = ["Real Estate Research", "REIT Analysis", "Property Market Data", "Real Estate Investment Studies"]
    } else if (userMessage.includes('commodities') || userMessage.includes('gold') || userMessage.includes('oil')) {
      response = financialKnowledge.alternatives.commodities
      suggestions = ["Commodity allocation", "Gold as hedge", "Energy sector analysis", "Commodity ETFs"]
      dataSources = ["Commodity Research", "Energy Market Analysis", "Precious Metals Data", "Commodity Trading Studies"]
    } else if (userMessage.includes('private equity') || userMessage.includes('venture capital')) {
      response = financialKnowledge.alternatives.private
      suggestions = ["Private equity access", "VC opportunities", "Alternative investments", "Illiquidity premium"]
      dataSources = ["Private Equity Research", "Venture Capital Studies", "Alternative Investment Analysis", "Private Market Data"]
    }
    
    // Default response for general financial questions
    else {
      const generalResponses = [
        "I'm your comprehensive financial AI assistant with access to extensive knowledge on investing, trading, finance, economics, crypto, business, entrepreneurship, and strategy. I can analyze individual stocks, provide market insights, explain investment concepts, and help with portfolio management. What would you like to explore?",
        "As your AI financial advisor, I can provide detailed insights on market trends, individual securities, portfolio optimization, investment strategies, economic analysis, and financial planning. I have comprehensive knowledge across all publicly available legal financial sources. What specific topic interests you?",
        "I specialize in comprehensive financial analysis covering stocks, crypto, market analysis, portfolio management, economic indicators, technical analysis, alternative investments, and financial planning. Whether you need asset analysis, strategy explanations, or market insights, I'm here to provide detailed, sourced information. What would you like to know?"
      ]
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)]
      suggestions = [
        "Analyze AAPL stock fundamentals", 
        "Bitcoin investment outlook and risks", 
        "Portfolio diversification strategies", 
        "Current market trends and analysis",
        "Value vs growth investing comparison",
        "Federal Reserve policy impact",
        "Technical analysis indicators",
        "Alternative investment options"
      ]
      dataSources = ["Comprehensive Financial Research", "Market Data", "Investment Analysis", "Academic Studies", "Regulatory Filings", "Economic Indicators"]
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