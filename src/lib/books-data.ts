export interface Book {
  id: string
  title: string
  author: string
  category: string
  description: string
  coverImage: string
  pages: number
  content: string[]
  highlights: string[]
  bookmarks: number[]
  progress: number
}

export const booksData: Book[] = [
  {
    id: '1',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    category: 'Investment Strategies',
    description: 'The definitive book on value investing and defensive stock market investing.',
    coverImage: '/images/books/intelligent-investor.jpg',
    pages: 640,
    content: [
      `# Chapter 1: Investment vs. Speculation

The first and most obvious distinction between the investor and the speculator is in their attitude toward stock-market movements. The speculator's primary interest lies in anticipating and profiting from market fluctuations. The investor's primary interest lies in acquiring and holding suitable securities at suitable prices.

## The Defensive Investor

The defensive investor is one who seeks safety and freedom from bother. They should be satisfied with the normal annual return of 8-10% and should not expect to beat the market consistently.

### Rules for the Defensive Investor:

1. **Adequate but not excessive diversification** - Not less than 10 different issues and not more than about 30
2. **Each company should be large, prominent, and conservatively financed** - This means substantial assets, strong balance sheets, and conservative debt levels
3. **Each company should have a long record of continuous dividends** - At least 20 years of uninterrupted dividend payments
4. **Price should not be excessive in relation to earnings** - Not more than 25 times average earnings of the past seven years

## The Enterprising Investor

The enterprising investor is willing to devote time and care to the selection of securities that are both sound and more attractive than the average. They can expect to earn better than average returns over the long term.

### Opportunities for the Enterprising Investor:

1. **Large companies selling below their working-capital value** - These are rare but can be very profitable
2. **Special situations** - Merger arbitrage, liquidations, reorganizations
3. **Growth stocks at reasonable prices** - Companies with superior growth prospects trading at reasonable valuations

## Margin of Safety

The concept of margin of safety is central to Graham's philosophy. An investor should never pay more for a stock than its intrinsic value, and preferably should pay significantly less to provide a margin of safety.

The margin of safety protects the investor against:
- Errors in calculation or judgment
- Unforeseen market conditions
- Changes in the company's prospects

## Market Fluctuations

Graham compares the stock market to a voting machine in the short term and a weighing machine in the long term. In the short term, stock prices fluctuate based on sentiment and speculation. In the long term, they reflect the underlying value of the business.

The intelligent investor should take advantage of these fluctuations rather than be controlled by them.`,

      `# Chapter 2: The Investor and Inflation

Inflation is one of the greatest threats to the long-term investor. Over time, inflation erodes the purchasing power of money, making it essential for investors to maintain real returns above the inflation rate.

## Historical Inflation Rates

From 1926 to 1970, the average annual inflation rate was approximately 2.5%. However, inflation rates can vary significantly over different periods and can pose serious threats to fixed-income investments.

## Protection Against Inflation

### Real Estate
Real estate has historically provided good protection against inflation, as property values and rental income tend to rise with inflation.

### Common Stocks
Over long periods, common stocks have provided better protection against inflation than bonds or cash, as companies can adjust their prices and costs to maintain profitability.

### Gold and Commodities
While these can provide inflation protection, they don't generate income and can be volatile in the short term.

## The Investor's Dilemma

The investor faces a dilemma: how to protect against inflation while maintaining safety of principal. The solution lies in a balanced approach that includes both stocks and bonds, with the stock portion providing growth potential and inflation protection.

## Modern Portfolio Theory

While Graham's approach predates modern portfolio theory, his emphasis on diversification and risk management aligns well with contemporary thinking about portfolio construction.`,

      `# Chapter 3: A Century of Stock-Market History

Understanding market history is crucial for investors. Graham provides a comprehensive analysis of stock market performance from 1900 to 1970, showing both the opportunities and risks inherent in stock investing.

## Major Market Cycles

### The 1920s Bull Market
The period from 1924 to 1929 saw one of the greatest bull markets in history, with the Dow Jones Industrial Average rising from around 100 to over 380.

### The 1930s Depression
The crash of 1929 and subsequent depression saw the market fall by nearly 90% from its peak, teaching investors about the importance of valuation and margin of safety.

### Post-War Recovery
The period from 1949 to 1970 saw generally strong market performance, with some notable corrections along the way.

## Lessons from History

1. **Markets are cyclical** - Periods of high returns are often followed by periods of low or negative returns
2. **Valuation matters** - Buying at high valuations leads to poor long-term returns
3. **Patience is rewarded** - Long-term investors who stay the course tend to do well
4. **Diversification helps** - Spreading risk across different investments reduces overall portfolio volatility

## The Role of Psychology

Market history shows that investor psychology plays a crucial role in market movements. Periods of excessive optimism lead to overvaluation, while periods of excessive pessimism lead to undervaluation.

The intelligent investor learns to control their emotions and make decisions based on rational analysis rather than market sentiment.`
    ],
    highlights: [
      'The defensive investor should be satisfied with normal annual returns of 8-10%',
      'Margin of safety is central to Graham\'s investment philosophy',
      'Markets are voting machines in the short term, weighing machines in the long term'
    ],
    bookmarks: [1, 15, 32],
    progress: 45
  },
  {
    id: '2',
    title: 'A Random Walk Down Wall Street',
    author: 'Burton Malkiel',
    category: 'Investment Strategies',
    description: 'A comprehensive guide to investing that argues for index fund investing and efficient market hypothesis.',
    coverImage: '/images/books/random-walk.jpg',
    pages: 464,
    content: [
      `# Chapter 1: Firm Foundations and Castles in the Air

## The Firm Foundation Theory

The firm foundation theory holds that each investment instrument has an intrinsic value that can be determined by careful analysis of present conditions and future prospects. When market prices fall below this intrinsic value, buying opportunities emerge.

### Determinants of Stock Value

1. **Expected Growth Rate** - How fast earnings and dividends are expected to grow
2. **Expected Dividend Payout** - The portion of earnings paid out as dividends
3. **Risk Level** - The degree of uncertainty surrounding expected returns
4. **Interest Rates** - The level of interest rates in the economy

## The Castle in the Air Theory

The castle in the air theory focuses on the psychology of investors rather than intrinsic value. Investors try to anticipate what the average investor will think and buy accordingly.

### Technical Analysis

Technical analysts believe that stock prices move in trends and that these trends can be identified and exploited for profit. They study:
- Chart patterns
- Volume analysis
- Moving averages
- Support and resistance levels

## The Efficient Market Hypothesis

Malkiel argues that markets are largely efficient, meaning that stock prices quickly incorporate all available information. This makes it extremely difficult to consistently beat the market through either fundamental or technical analysis.

### Three Forms of Market Efficiency

1. **Weak Form** - Past price and volume data cannot be used to predict future prices
2. **Semi-Strong Form** - Publicly available information is already reflected in stock prices
3. **Strong Form** - All information, including insider information, is reflected in stock prices

## Implications for Investors

If markets are efficient, then:
- Stock picking is largely futile
- Market timing is extremely difficult
- Index funds should outperform actively managed funds over time
- The best strategy is to buy and hold a diversified portfolio`,

      `# Chapter 2: The Madness of Crowds

## Historical Bubbles

Malkiel examines several historical investment bubbles to illustrate the dangers of speculative investing:

### The Tulip Bulb Craze (1634-1637)
Dutch tulip bulbs became objects of frenzied speculation, with prices reaching extraordinary levels before collapsing dramatically.

### The South Sea Bubble (1720)
The South Sea Company's stock rose from £128 to £1,050 in a matter of months before collapsing to £175.

### The Roaring Twenties and Crash
The stock market boom of the 1920s was followed by the devastating crash of 1929 and the Great Depression.

## Common Characteristics of Bubbles

1. **Displacement** - A new technology or development captures investors' imaginations
2. **Boom** - Prices rise, attracting more investors and media attention
3. **Euphoria** - Everyone wants to participate, leading to excessive speculation
4. **Profit Taking** - Smart investors begin to sell
5. **Panic** - Prices collapse as everyone tries to sell at once

## The Internet Bubble

The late 1990s saw an enormous bubble in internet and technology stocks. Companies with no profits and questionable business models reached astronomical valuations before collapsing in 2000-2002.

## Lessons for Investors

1. **Avoid the herd mentality** - When everyone is buying, it's often time to be cautious
2. **Focus on fundamentals** - Don't get caught up in speculative frenzies
3. **Maintain diversification** - Don't put all your eggs in one basket
4. **Think long-term** - Short-term market movements are largely unpredictable`
    ],
    highlights: [
      'Markets are largely efficient, making it difficult to consistently beat them',
      'Historical bubbles show the dangers of speculative investing',
      'Index funds should outperform actively managed funds over time'
    ],
    bookmarks: [8, 22, 45],
    progress: 30
  },
  {
    id: '3',
    title: 'Common Stocks and Uncommon Profits',
    author: 'Philip Fisher',
    category: 'Investment Strategies',
    description: 'A guide to growth investing and finding outstanding companies for long-term investment.',
    coverImage: '/images/books/common-stocks.jpg',
    pages: 320,
    content: [
      `# Chapter 1: Clues from the Past

## The Growth Stock Philosophy

Philip Fisher pioneered the concept of growth investing, focusing on companies with superior growth prospects rather than just cheap valuations. His approach emphasizes finding companies that can grow earnings significantly over long periods.

## The Fifteen Points

Fisher developed a comprehensive checklist of fifteen points to evaluate growth companies:

### Management and Business Quality
1. Does the company have products or services with sufficient market potential to make possible a sizable increase in sales for at least several years?
2. Does the management have a determination to continue to develop products or processes that will still further increase total sales potentials when the growth potentials of currently attractive product lines have largely been exploited?
3. How effective are the company's research and development efforts in relation to its size?
4. Does the company have an above-average sales organization?
5. Does the company have a worthwhile profit margin?
6. What is the company doing to maintain or improve profit margins?
7. Does the company have outstanding labor and personnel relations?
8. Does the company have outstanding executive relations?
9. Does the company have depth to its management?
10. How good are the company's cost analysis and accounting controls?
11. Are there other aspects of the business, somewhat peculiar to the industry involved, that will give the investor important clues as to how outstanding the company may be in relation to its competition?
12. Does the company have a short-range or long-range outlook in regard to profits?
13. In the foreseeable future will the growth of the company require sufficient equity financing so that the larger number of shares then outstanding will largely cancel the existing stockholders' benefit from this anticipated growth?
14. Does the management talk freely to investors about its affairs when things are going well but "clam up" when troubles and disappointments occur?
15. Does the company have a management of unquestionable integrity?`,

      `# Chapter 2: What to Buy

## The Scuttlebutt Method

Fisher emphasizes the importance of gathering information from multiple sources, including:
- Customers
- Suppliers
- Competitors
- Former employees
- Industry experts

## Characteristics of Outstanding Companies

### Superior Products or Services
The company must have products or services that are significantly better than competitors' offerings.

### Strong Market Position
A dominant or growing market share indicates competitive advantages.

### Excellent Management
Management must be capable, honest, and focused on long-term value creation.

### Research and Development
Continuous innovation is essential for maintaining competitive advantages.

## When to Buy

Fisher recommends buying when:
- The company meets most or all of the fifteen points
- The stock is reasonably priced relative to growth prospects
- The investor has thoroughly researched the company
- The investor is prepared to hold for the long term

## When to Sell

Fisher's selling criteria are much more restrictive than his buying criteria:
- The company no longer meets the fifteen points
- A much better opportunity is found
- The original analysis was wrong

He specifically warns against selling because of:
- Market fluctuations
- Short-term earnings disappointments
- Temporary problems`
    ],
    highlights: [
      'Focus on companies with superior growth prospects for long-term investment',
      'The scuttlebutt method involves gathering information from multiple sources',
      'Selling criteria should be much more restrictive than buying criteria'
    ],
    bookmarks: [5, 18, 28],
    progress: 60
  },
  {
    id: '4',
    title: 'Artificial Intelligence & Wealth Creation',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'How artificial intelligence is revolutionizing portfolio management and creating new investment opportunities.',
    coverImage: '/images/books/ai-wealth.jpg',
    pages: 280,
    content: [
      `# Chapter 1: The AI Revolution in Finance

## Introduction to AI in Investing

Artificial Intelligence is transforming the financial industry at an unprecedented pace. From algorithmic trading to robo-advisors, AI is reshaping how we invest, manage portfolios, and make financial decisions.

## Key AI Technologies in Finance

### Machine Learning
Machine learning algorithms can analyze vast amounts of data to identify patterns and make predictions about market movements, company performance, and economic trends.

### Natural Language Processing
NLP enables AI systems to analyze news articles, earnings calls, social media sentiment, and other text data to gauge market sentiment and identify investment opportunities.

### Computer Vision
AI can analyze satellite imagery, store traffic, and other visual data to assess company performance and economic activity.

### Robo-Advisors
Automated investment platforms use AI to create and manage diversified portfolios based on individual risk tolerance and investment goals.

## Benefits of AI in Investing

1. **Data Processing** - AI can analyze more data than human analysts ever could
2. **Speed** - AI can react to market changes in milliseconds
3. **Objectivity** - AI removes emotional bias from investment decisions
4. **Cost Efficiency** - AI-powered solutions are often more affordable than human advisors
5. **24/7 Monitoring** - AI can monitor markets and portfolios continuously

## Challenges and Risks

### Overfitting
AI models may perform well on historical data but fail in real-world conditions.

### Market Efficiency
As AI becomes more widespread, it may reduce the opportunities for outperformance.

### Regulatory Concerns
AI in finance raises questions about transparency, accountability, and regulation.

### Job Displacement
AI may replace some traditional financial services jobs, though it may also create new opportunities.`,

      `# Chapter 2: AI-Powered Portfolio Management

## Modern Portfolio Theory Enhanced

AI can improve upon traditional portfolio theory by:
- Analyzing more complex relationships between assets
- Incorporating alternative data sources
- Adapting to changing market conditions more quickly
- Considering individual investor preferences more precisely

## Risk Management with AI

### Dynamic Risk Assessment
AI can continuously assess portfolio risk and adjust allocations based on changing market conditions.

### Stress Testing
AI can simulate various market scenarios to test portfolio resilience.

### Fraud Detection
AI can identify unusual patterns that may indicate fraudulent activity.

## Personalization

AI enables highly personalized investment strategies that consider:
- Individual risk tolerance
- Investment timeline
- Financial goals
- Tax situation
- Market preferences

## Real-World Applications

### Wealthfront
Uses AI to create tax-efficient, diversified portfolios and provide financial planning advice.

### Betterment
Employs AI for portfolio optimization, tax-loss harvesting, and goal-based investing.

### BlackRock's Aladdin
Uses AI for risk management, portfolio construction, and investment research.

## The Future of AI in Portfolio Management

As AI technology continues to advance, we can expect:
- More sophisticated risk models
- Better integration of alternative data
- Improved personalization
- Enhanced regulatory compliance
- Greater transparency and explainability`
    ],
    highlights: [
      'AI can analyze vast amounts of data to identify investment opportunities',
      'Robo-advisors use AI to create personalized investment strategies',
      'AI enables 24/7 portfolio monitoring and risk management'
    ],
    bookmarks: [3, 12, 25],
    progress: 20
  },
  {
    id: '5',
    title: 'AI for Beginners: How Artificial Intelligence Works',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'A comprehensive introduction to artificial intelligence concepts and applications in business and finance.',
    coverImage: '/images/books/ai-beginners.jpg',
    pages: 240,
    content: [
      `# Chapter 1: What is Artificial Intelligence?

## Definition and Scope

Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.

## Types of AI

### Narrow AI (Weak AI)
Narrow AI is designed to perform a narrow task (e.g., facial recognition or internet searches). Most AI in use today is narrow AI.

### General AI (Strong AI)
General AI would have the ability to understand, learn, and apply knowledge in different contexts, similar to human intelligence.

### Super AI
Super AI would surpass human intelligence in all areas and would be capable of improving itself.

## Machine Learning

Machine learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.

### Supervised Learning
Learning with labeled training data to make predictions about new, unseen data.

### Unsupervised Learning
Finding hidden patterns in data without labeled examples.

### Reinforcement Learning
Learning through interaction with an environment, receiving rewards or penalties for actions.

## Deep Learning

Deep learning is a subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns in data.

### Neural Networks
Inspired by the human brain, neural networks consist of interconnected nodes (neurons) that process information.

### Applications in Finance
- Algorithmic trading
- Credit scoring
- Fraud detection
- Portfolio optimization
- Risk assessment`,

      `# Chapter 2: AI Applications in Business

## Customer Service

AI-powered chatbots and virtual assistants can handle customer inquiries 24/7, providing instant responses and improving customer satisfaction.

## Marketing and Sales

### Personalization
AI can analyze customer data to provide personalized product recommendations and marketing messages.

### Predictive Analytics
AI can predict customer behavior, helping businesses target their marketing efforts more effectively.

## Operations

### Supply Chain Optimization
AI can optimize supply chains by predicting demand, managing inventory, and identifying bottlenecks.

### Quality Control
Computer vision AI can inspect products for defects more accurately and consistently than human inspectors.

## Human Resources

### Recruitment
AI can screen resumes, conduct initial interviews, and match candidates to job requirements.

### Performance Analysis
AI can analyze employee performance data to identify patterns and provide insights for improvement.

## Financial Services

### Trading
AI algorithms can execute trades at optimal times based on market analysis.

### Risk Management
AI can assess credit risk, market risk, and operational risk more accurately than traditional methods.

### Compliance
AI can monitor transactions for suspicious activity and ensure regulatory compliance.`
    ],
    highlights: [
      'AI refers to machines that can think and learn like humans',
      'Machine learning enables computers to learn from experience',
      'AI is transforming business operations across all industries'
    ],
    bookmarks: [7, 15, 32],
    progress: 35
  },
  {
    id: '6',
    title: 'Learn to Code: A Beginner\'s Guide to Python & JavaScript',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'Master the fundamentals of programming with Python and JavaScript to unlock career opportunities in tech and finance.',
    coverImage: '/images/books/learn-to-code.jpg',
    pages: 320,
    content: [
      `# Chapter 1: Introduction to Programming

## What is Programming?

Programming is the process of creating instructions for computers to follow. These instructions, called code, tell the computer how to perform specific tasks.

## Why Learn to Code?

### Career Opportunities
- Software development
- Data science
- Web development
- Mobile app development
- AI and machine learning
- Financial technology

### Problem-Solving Skills
Programming teaches logical thinking and problem-solving skills that are valuable in any career.

### Automation
Programming allows you to automate repetitive tasks, saving time and reducing errors.

## Getting Started

### Choose a Programming Language
For beginners, we recommend starting with Python because:
- Simple and readable syntax
- Versatile applications
- Strong community support
- Extensive libraries

### Set Up Your Development Environment
1. Install Python from python.org
2. Choose a code editor (VS Code, PyCharm, or Sublime Text)
3. Learn to use the command line/terminal

## Your First Program

\`\`\`python
# Hello, World!
print("Hello, World!")
\`\`\`

This simple program demonstrates the basic structure of Python code.`,

      `# Chapter 2: Python Fundamentals

## Variables and Data Types

### Variables
Variables store data that can be used and modified in your program.

\`\`\`python
# String
name = "Alice"
age = 25
height = 5.6
is_student = True

print(name, age, height, is_student)
\`\`\`

### Data Types
- **String**: Text data (e.g., "Hello")
- **Integer**: Whole numbers (e.g., 42)
- **Float**: Decimal numbers (e.g., 3.14)
- **Boolean**: True or False values

## Control Structures

### Conditional Statements
\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")
\`\`\`

### Loops
\`\`\`python
# For loop
for i in range(5):
    print(f"Number: {i}")

# While loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1
\`\`\`

## Functions
Functions are reusable blocks of code that perform specific tasks.

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)
\`\`\``,

      `# Chapter 3: JavaScript for Web Development

## What is JavaScript?

JavaScript is a programming language that enables interactive web pages. It's essential for modern web development.

## JavaScript Basics

### Variables
\`\`\`javascript
// Using let (modern way)
let name = "Alice";
let age = 25;

// Using const for constants
const PI = 3.14159;

// Using var (older way, not recommended)
var oldVariable = "deprecated";
\`\`\`

### Functions
\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Arrow function (modern syntax)
const greetArrow = (name) => \`Hello, \${name}!\`;

console.log(greet("Alice"));
\`\`\`

### DOM Manipulation
\`\`\`javascript
// Get element by ID
const button = document.getElementById('myButton');

// Add event listener
button.addEventListener('click', function() {
    alert('Button clicked!');
});

// Change element content
const heading = document.getElementById('title');
heading.textContent = 'New Title';
\`\`\``
    ],
    highlights: [
      'Programming teaches logical thinking and problem-solving skills',
      'Python is recommended for beginners due to its simple syntax',
      'JavaScript is essential for modern web development'
    ],
    bookmarks: [4, 18, 28],
    progress: 25
  },
  {
    id: '7',
    title: 'Entrepreneurship 101: From Idea to Business',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'Learn the fundamentals of starting and growing a successful business in the modern economy.',
    coverImage: '/images/books/entrepreneurship.jpg',
    pages: 280,
    content: [
      `# Chapter 1: The Entrepreneurial Mindset

## What is Entrepreneurship?

Entrepreneurship is the process of creating, launching, and running a new business venture. It involves identifying opportunities, taking risks, and creating value in the marketplace.

## Characteristics of Successful Entrepreneurs

### Vision and Passion
Successful entrepreneurs have a clear vision of what they want to achieve and are passionate about their mission.

### Risk Tolerance
Entrepreneurs must be comfortable with uncertainty and willing to take calculated risks.

### Resilience
Building a business involves setbacks and failures. Entrepreneurs must be able to bounce back and learn from mistakes.

### Adaptability
The business environment is constantly changing. Entrepreneurs must be able to adapt their strategies and approaches.

### Leadership Skills
Entrepreneurs must be able to inspire and lead teams to achieve common goals.

## The Entrepreneurial Process

### 1. Opportunity Recognition
Identifying gaps in the market or problems that need solving.

### 2. Market Research
Understanding customer needs, competition, and market dynamics.

### 3. Business Planning
Creating a comprehensive plan for how the business will operate and grow.

### 4. Resource Acquisition
Securing funding, talent, and other resources needed to launch the business.

### 5. Launch and Growth
Executing the business plan and scaling the operation.

## Types of Entrepreneurship

### Small Business Entrepreneurship
Starting and running small, local businesses like restaurants, retail stores, or service providers.

### Scalable Startup Entrepreneurship
Building businesses with high growth potential that can scale nationally or globally.

### Social Entrepreneurship
Creating businesses that address social or environmental problems while generating profit.

### Corporate Entrepreneurship
Innovating within existing companies to create new products, services, or business models.`,

      `# Chapter 2: From Idea to Business Plan

## Validating Your Business Idea

### Problem-Solution Fit
Your business idea should solve a real problem that people are willing to pay to have solved.

### Market Validation
Test your idea with potential customers before investing significant resources.

### Competitive Analysis
Understand your competition and how your solution differs or improves upon existing options.

## Components of a Business Plan

### Executive Summary
A brief overview of your business, including your mission, key products/services, and financial projections.

### Company Description
Detailed information about your company, including its legal structure, location, and history.

### Market Analysis
Research on your target market, including customer demographics, market size, and growth potential.

### Organization and Management
Information about your team, organizational structure, and management approach.

### Service or Product Line
Description of your products or services, including their benefits and competitive advantages.

### Marketing and Sales
Your strategy for reaching customers and generating sales.

### Funding Request
If you're seeking investment, include information about how much funding you need and how you'll use it.

### Financial Projections
Projections for revenue, expenses, and profitability over the next 3-5 years.

## Funding Options

### Bootstrapping
Using personal savings and revenue to fund the business.

### Friends and Family
Raising money from personal networks.

### Angel Investors
Individual investors who provide capital in exchange for equity.

### Venture Capital
Professional investment firms that provide larger amounts of capital for high-growth businesses.

### Bank Loans
Traditional debt financing from banks and other financial institutions.

### Crowdfunding
Raising money from a large number of people through online platforms.`
    ],
    highlights: [
      'Entrepreneurship involves identifying opportunities and creating value',
      'Successful entrepreneurs have vision, passion, and resilience',
      'Market validation is crucial before investing significant resources'
    ],
    bookmarks: [6, 22, 35],
    progress: 40
  },
  {
    id: '8',
    title: 'Real Estate Investing: Building Wealth Through Property',
    author: 'Prism Education Team',
    category: 'Modern Finance',
    description: 'A comprehensive guide to real estate investing strategies and wealth building through property ownership.',
    coverImage: '/images/books/real-estate.jpg',
    pages: 300,
    content: [
      `# Chapter 1: Introduction to Real Estate Investing

## Why Invest in Real Estate?

Real estate has long been considered one of the most reliable ways to build wealth. Here are the key benefits:

### Appreciation
Property values tend to increase over time, providing capital gains.

### Cash Flow
Rental properties can generate monthly income through rent payments.

### Tax Benefits
Real estate investors enjoy various tax deductions and benefits.

### Inflation Hedge
Real estate often keeps pace with or exceeds inflation.

### Leverage
You can control a valuable asset with a relatively small down payment.

## Types of Real Estate Investments

### Residential Properties
- Single-family homes
- Multi-family properties (duplexes, triplexes, fourplexes)
- Condominiums and townhouses

### Commercial Properties
- Office buildings
- Retail spaces
- Industrial properties
- Warehouses

### Specialized Properties
- Hotels and hospitality
- Self-storage facilities
- Mobile home parks
- Senior living facilities

## Investment Strategies

### Buy and Hold
Purchase properties to rent out for long-term appreciation and cash flow.

### Fix and Flip
Buy distressed properties, renovate them, and sell for a profit.

### Wholesaling
Find discounted properties and assign the contract to other investors for a fee.

### Real Estate Investment Trusts (REITs)
Invest in publicly traded companies that own and manage real estate.

### Real Estate Crowdfunding
Pool money with other investors to buy larger properties.`,

      `# Chapter 2: Analyzing Investment Properties

## Key Metrics for Real Estate Investing

### Cash Flow
Monthly rental income minus all expenses (mortgage, taxes, insurance, maintenance, vacancy allowance).

### Cash-on-Cash Return
Annual cash flow divided by the initial cash investment.

### Cap Rate (Capitalization Rate)
Net operating income divided by the property's purchase price.

### Gross Rent Multiplier
Purchase price divided by annual gross rental income.

### Return on Investment (ROI)
Total return (cash flow + appreciation) divided by total investment.

## Property Analysis Process

### 1. Location Analysis
- Neighborhood quality and trends
- Proximity to amenities
- School district quality
- Crime rates
- Future development plans

### 2. Financial Analysis
- Purchase price and financing terms
- Rental income potential
- Operating expenses
- Maintenance and repair costs
- Tax implications

### 3. Market Analysis
- Local market trends
- Comparable property sales
- Rental market conditions
- Economic indicators

### 4. Physical Inspection
- Property condition
- Required repairs or improvements
- Maintenance history
- Systems and appliances

## Due Diligence Checklist

- Verify property ownership and title
- Review property tax records
- Check for liens or encumbrances
- Inspect all major systems
- Review rental history and current leases
- Analyze comparable properties
- Calculate all financial metrics
- Consider exit strategies`,

      `# Chapter 3: Financing Real Estate Investments

## Traditional Financing Options

### Conventional Loans
- 20-25% down payment typically required
- Good credit score needed (680+)
- Lower interest rates than other options

### FHA Loans
- Lower down payment requirements (3.5%)
- More lenient credit requirements
- Limited to owner-occupied properties

### VA Loans
- Available to veterans and active military
- No down payment required
- No private mortgage insurance

## Alternative Financing Methods

### Private Money Lenders
- Individuals who lend money for real estate investments
- Higher interest rates but faster approval
- More flexible terms

### Hard Money Lenders
- Short-term loans for fix-and-flip projects
- Higher interest rates and fees
- Based on property value, not borrower credit

### Seller Financing
- Property owner provides financing
- Negotiable terms
- Can be beneficial for both parties

### Partnerships
- Joint ventures with other investors
- Shared risk and reward
- Access to larger deals

## Creative Financing Strategies

### Subject-To Deals
Taking over existing mortgage payments without assuming the loan.

### Lease Options
Renting with the option to purchase at a later date.

### Wraparound Mortgages
Creating a new mortgage that "wraps around" an existing mortgage.

### Wholesaling
Finding deals and assigning contracts to other investors.

## Building a Real Estate Portfolio

### Start Small
Begin with single-family homes or small multi-family properties.

### Diversify
Invest in different types of properties and markets.

### Reinvest Profits
Use cash flow and appreciation to acquire additional properties.

### Build Systems
Create processes for finding, analyzing, and managing properties.

### Network
Build relationships with other investors, agents, and service providers.`
    ],
    highlights: [
      'Real estate provides appreciation, cash flow, and tax benefits',
      'Key metrics include cash flow, cap rate, and ROI',
      'Due diligence is crucial before purchasing any investment property'
    ],
    bookmarks: [8, 24, 42],
    progress: 55
  },
  {
    id: '9',
    title: 'Advanced Investing: Hedge Funds, Options, and Beyond',
    author: 'Prism Education Team',
    category: 'Investment Strategies',
    description: 'Explore advanced investment strategies including hedge funds, options trading, and alternative investments.',
    coverImage: '/images/books/advanced-investing.jpg',
    pages: 350,
    content: [
      `# Chapter 1: Hedge Funds and Alternative Investments

## What are Hedge Funds?

Hedge funds are private investment partnerships that use sophisticated strategies to generate returns. They are typically available only to accredited investors and have fewer regulatory restrictions than mutual funds.

## Common Hedge Fund Strategies

### Long/Short Equity
Taking long positions in undervalued stocks and short positions in overvalued stocks.

### Market Neutral
Balancing long and short positions to minimize market exposure while capturing relative value.

### Event-Driven
Investing based on corporate events like mergers, acquisitions, bankruptcies, or restructurings.

### Global Macro
Making investment decisions based on economic and political trends across countries.

### Distressed Debt
Investing in the debt of companies in financial distress, often with the goal of converting to equity.

### Quantitative Strategies
Using mathematical models and algorithms to identify trading opportunities.

## Alternative Investments

### Private Equity
Investing in private companies, often with the goal of improving operations and selling for a profit.

### Venture Capital
Providing funding to early-stage companies with high growth potential.

### Real Estate Investment Trusts (REITs)
Publicly traded companies that own and manage real estate properties.

### Commodities
Investing in physical commodities like gold, oil, or agricultural products.

### Cryptocurrencies
Digital currencies that use blockchain technology for secure transactions.

### Art and Collectibles
Investing in valuable art, antiques, or other collectible items.`,

      `# Chapter 2: Options Trading Fundamentals

## What are Options?

Options are financial derivatives that give the holder the right, but not the obligation, to buy or sell an underlying asset at a specified price within a certain time period.

## Basic Option Concepts

### Call Options
Give the holder the right to buy an asset at a specified price.

### Put Options
Give the holder the right to sell an asset at a specified price.

### Strike Price
The price at which the option can be exercised.

### Expiration Date
The last date on which the option can be exercised.

### Premium
The price paid for the option.

## Option Strategies

### Covered Calls
Selling call options on stocks you already own to generate additional income.

### Protective Puts
Buying put options to protect against downside risk in your portfolio.

### Straddles
Buying both a call and put option with the same strike price and expiration.

### Spreads
Combining multiple options to limit risk and cost.

### Iron Condors
Complex strategies involving four different options to profit from low volatility.

## Risk Management in Options

### Position Sizing
Only risk a small percentage of your portfolio on any single options trade.

### Stop Losses
Set predetermined exit points to limit losses.

### Diversification
Don't put all your options trades in the same underlying asset or strategy.

### Education
Continuously learn about options and practice with paper trading before risking real money.`,

      `# Chapter 3: Advanced Portfolio Management

## Modern Portfolio Theory (MPT)

MPT is a framework for constructing portfolios that maximize expected return for a given level of risk.

### Key Concepts
- Diversification reduces risk
- Risk and return are related
- Efficient frontier represents optimal risk-return combinations

### Limitations
- Assumes normal distribution of returns
- Requires accurate estimates of expected returns and correlations
- Doesn't account for changing market conditions

## Alternative Risk Models

### Value at Risk (VaR)
A statistical measure of potential losses over a specific time period.

### Conditional Value at Risk (CVaR)
The expected loss beyond the VaR threshold.

### Monte Carlo Simulation
Using random sampling to model portfolio performance under various scenarios.

## Dynamic Asset Allocation

### Tactical Asset Allocation
Adjusting portfolio weights based on short-term market conditions.

### Strategic Asset Allocation
Setting long-term target weights based on risk tolerance and investment objectives.

### Risk Parity
Allocating risk equally across different asset classes rather than equally across dollar amounts.

## Alternative Beta Strategies

### Low Volatility
Investing in stocks with below-average volatility.

### Momentum
Investing in stocks that have performed well recently.

### Quality
Focusing on companies with strong fundamentals and profitability.

### Value
Investing in undervalued stocks based on fundamental metrics.

## ESG Investing

### Environmental, Social, and Governance
Considering environmental, social, and governance factors in investment decisions.

### Impact Investing
Investing with the intention of generating positive social or environmental impact alongside financial returns.

### Sustainable Investing
Integrating ESG factors into traditional investment approaches.`
    ],
    highlights: [
      'Hedge funds use sophisticated strategies with fewer regulatory restrictions',
      'Options provide flexibility but require careful risk management',
      'Modern Portfolio Theory helps optimize risk-return tradeoffs'
    ],
    bookmarks: [12, 28, 45],
    progress: 30
  },
  {
    id: '10',
    title: 'Strategic Investing in the AI Era',
    author: 'Prism Education Team',
    category: 'AI & Future of Work',
    description: 'How to adapt your investment strategy for the artificial intelligence revolution and emerging technologies.',
    coverImage: '/images/books/strategic-ai-investing.jpg',
    pages: 260,
    content: [
      `# Chapter 1: The AI Investment Landscape

## Understanding AI Investment Opportunities

The artificial intelligence revolution is creating unprecedented investment opportunities across multiple sectors. Understanding these trends is crucial for modern investors.

## Key AI Investment Themes

### Infrastructure and Hardware
- Semiconductor companies (NVIDIA, AMD, Intel)
- Cloud computing providers (Amazon, Microsoft, Google)
- Data center operators
- AI chip manufacturers

### Software and Platforms
- AI platform providers
- Machine learning tools and frameworks
- Data analytics companies
- AI-as-a-Service providers

### Applications and Use Cases
- Autonomous vehicles
- Healthcare AI
- Financial services AI
- Consumer AI products

## Sector Analysis

### Technology Sector
The most direct exposure to AI growth, but also the most volatile.

### Healthcare
AI applications in drug discovery, medical imaging, and personalized medicine.

### Financial Services
AI for trading, risk management, fraud detection, and customer service.

### Manufacturing
Industrial AI for automation, predictive maintenance, and quality control.

### Consumer Goods
AI-powered personalization, recommendation systems, and smart products.`,

      `# Chapter 2: Building an AI-Focused Portfolio

## Direct AI Investments

### Large-Cap Technology Stocks
- Microsoft (Azure AI, OpenAI partnership)
- Google (DeepMind, AI research)
- Amazon (AWS AI services)
- Meta (AI research, metaverse)
- Apple (AI in devices and services)

### AI-Focused Companies
- NVIDIA (AI chips and software)
- Palantir (data analytics)
- Snowflake (data cloud)
- C3.ai (enterprise AI)
- UiPath (robotic process automation)

### Emerging AI Companies
- Smaller companies with specialized AI capabilities
- AI startups with innovative technologies
- Companies in AI-adjacent sectors

## Indirect AI Exposure

### Companies Benefiting from AI
- Traditional companies using AI to improve operations
- Service providers to AI companies
- Companies with valuable data assets

### Supply Chain Investments
- Companies providing components for AI infrastructure
- Materials and equipment suppliers
- Real estate for data centers

## Portfolio Construction Strategies

### Thematic Investing
Building portfolios around AI themes and trends.

### Factor Investing
Using AI and machine learning to identify investment factors.

### ESG Considerations
Evaluating AI companies based on ethical AI practices and societal impact.

### Risk Management
Balancing high-growth AI investments with more stable assets.`,

      `# Chapter 3: Risks and Considerations

## Technology Risks

### Rapid Obsolescence
AI technology evolves quickly, making some investments obsolete.

### Competition
Intense competition in AI space can impact profitability.

### Regulatory Risk
Increasing regulation of AI could affect business models.

## Market Risks

### Valuation Concerns
AI stocks may be overvalued due to hype.

### Market Volatility
Technology stocks tend to be more volatile than the overall market.

### Concentration Risk
Over-concentration in AI stocks increases portfolio risk.

## Ethical Considerations

### Bias and Fairness
AI systems can perpetuate or amplify societal biases.

### Privacy Concerns
AI applications often require large amounts of personal data.

### Job Displacement
AI automation may disrupt traditional employment.

### Military Applications
Some AI technologies have dual-use military applications.

## Investment Strategies

### Diversification
Don't put all your money in AI stocks.

### Dollar-Cost Averaging
Invest regularly to average out market volatility.

### Long-Term Perspective
AI is a long-term trend, not a short-term fad.

### Active vs. Passive
Consider both active and passive approaches to AI investing.

### Due Diligence
Thoroughly research AI companies before investing.

## Future Outlook

### Emerging Trends
- Edge AI and IoT
- Quantum computing
- Brain-computer interfaces
- AI safety and alignment

### Investment Opportunities
- New AI applications and use cases
- AI infrastructure and tools
- Companies transforming with AI
- Global AI adoption`

    ],
    highlights: [
      'AI creates investment opportunities across multiple sectors',
      'Direct and indirect AI exposure strategies for portfolios',
      'Consider technology, market, and ethical risks in AI investing'
    ],
    bookmarks: [5, 18, 32],
    progress: 45
  }
]

export const categories = [
  'All',
  'Investment Strategies',
  'AI & Future of Work',
  'Modern Finance'
]

export function getBookById(id: string): Book | undefined {
  return booksData.find(book => book.id === id)
}

export function getBooksByCategory(category: string): Book[] {
  if (category === 'All') return booksData
  return booksData.filter(book => book.category === category)
}
