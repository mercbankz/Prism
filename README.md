# Prism — AI Portfolio Intelligence

**Analyze. Learn. Play. Grow.**

A production-ready, non-custodial, AI-powered portfolio analytics platform that puts privacy first. Get insights, learn through gamification, and grow your financial knowledge—all without giving up control of your assets.

## 🎨 Marketing Site

Prism now features a stunning marketing website inspired by InfinityVM's cinematic aesthetics and Spheron's bold metrics approach:

### 🌟 Marketing Features
- **Cinematic Hero**: Animated neon ring with product screenshots
- **Live Metrics**: Real-time counters showing community growth
- **Glass Morphism**: Modern glass panels with subtle gradients
- **Dark-First Design**: Sleek high-contrast theme with optional light mode
- **Smooth Animations**: Framer Motion animations throughout
- **Mobile Responsive**: Optimized for all screen sizes

### 📄 Marketing Pages
- **Home** (`/`): Hero, features, testimonials, CTA
- **Pricing** (`/pricing`): Simple Pro plan with founder discount
- **Integrations** (`/integrations`): Secure read-only platform connections
- **Security** (`/security`): Enterprise-grade security details
- **Blog** (`/blog`): Educational content and insights
- **Legal** (`/legal/*`): Privacy, terms, and disclaimers

### 🎯 Brand System
- **Colors**: Neon violet (#7C5CFF), teal accent (#00E6A8)
- **Typography**: Space Grotesk (headlines), Inter (body)
- **Effects**: Radial gradients, glass panels, particle fields
- **Motion**: Parallax, fade/slide animations, performance-optimized

### 👑 Master Admin Setup

The application includes a master admin account with full system access:

- **Email**: `Toonz.kham@proton.me`
- **Password**: `Supremacy112`
- **Role**: `MASTER_ADMIN`
- **Permissions**: Full read/write access, bypass all limits, manage users, override features

#### Master Admin Features
- **Unlimited AI Queries**: No rate limits on AI assistant usage
- **Unlimited Chess Resets**: Access to all Financial Chess features
- **Premium Library Access**: Full access to all educational content
- **User Management**: Create, modify, and manage user accounts
- **Audit Log Access**: View all system activity and user actions
- **Feature Override**: Bypass any system limitations or restrictions

#### Seeding the Master Admin
The master admin account is automatically created when running the database seed:

```bash
npm run prisma:seed
```

This will create the master admin account with the specified credentials and role.

### 💳 Subscription System

Prism Pro is the premium subscription tier with comprehensive features:

#### Prism Pro - $150/month
- **AI Portfolio Assistant**: Expanded datasets with market news, fundamentals, sentiment analysis
- **Advanced Analytics**: Portfolio dashboard with line chart tracking (1M/3M/6M/1Y ranges)
- **Financial Chess**: Quarterly seasons with AI opponents powered by live market events
- **Premium Library**: AI, Strategy, Macro, and Modern Investing content
- **Gamification**: 100+ badges, referral rewards, ambassador program (50 invites = 1 year free)
- **Export Tools**: CSV, PDF, JSON data export capabilities
- **Security**: 2FA, privacy-first, non-custodial architecture
- **Support**: Priority support and advanced integrations

#### Founder's Launch
- **25% Off First Month**: Limited-time discount for early adopters
- **Cancel Anytime**: No long-term commitments required
- **Educational Focus**: All features designed for learning and analysis only

### 🛠️ Customizing the Marketing Site

#### Brand Colors
Update colors in `src/styles/gradients.css`:
```css
:root {
  --primary: #7C5CFF;      /* Neon violet */
  --primary-2: #00E6A8;    /* Teal accent */
  --accent: #2DD4BF;       /* Cyan accent */
  --bg: #0B0E13;           /* Dark background */
  --fg: #E6EAEE;           /* Light foreground */
}
```

#### Live Metrics
Customize counters in `src/lib/metrics.ts`:
```typescript
const defaultMetrics: Metric[] = [
  {
    id: 'portfolios-analyzed',
    label: 'Portfolios Analyzed',
    value: 61400,
    suffix: '+',
    growthRate: 0.5 // per minute
  },
  // Add more metrics...
]
```

#### Neon Ring Animation
Adjust ring properties in `src/components/canvas/NeonRing.tsx`:
```typescript
<NeonRing 
  size={600} 
  glowIntensity={0.8} 
  rotationSpeed={20} 
  pulseSpeed={3} 
/>
```

#### Adding Blog Posts
Create new posts in `src/app/(marketing)/blog/[slug]/page.tsx`:
```typescript
const blogPosts = {
  'your-slug': {
    title: 'Your Article Title',
    content: '<p>Your content...</p>',
    // ... other properties
  }
}
```

## 🌟 Features

### 📊 Live Portfolio Analytics
- **Real API Integrations**: Coinbase Pro, Binance, MetaMask, Fidelity
- **Health Score**: AI-powered portfolio health analysis (0-100 scale)
- **Asset Allocation**: Visual breakdown with rebalancing suggestions
- **Live News**: Real-time financial news with sentiment analysis
- **Simulation Only**: All rebalancing suggestions are educational simulations

### 🤖 AI Assistant
- **OpenAI Integration**: Real AI responses with portfolio context
- **Educational Focus**: Investment education and analysis (not financial advice)
- **Context Aware**: Understands your portfolio and market conditions
- **Compliance First**: Clear disclaimers throughout the experience

### ♟️ Financial Chess
- **Quarterly Games**: Your portfolio assets become chess pieces
- **Market Events**: AI opponent uses live news sentiment
- **Asset Mapping**: Holdings mapped based on financial characteristics
- **Private Tracking**: Win/loss records stored privately

### 📚 Financial Literacy Library
- **20+ Books**: Curated financial education content
- **Built-in Reader**: Read directly in the app with progress tracking
- **Highlights & Bookmarks**: Save important passages
- **Categories**: Value investing, crypto, risk management, psychology

### 🏆 Gamification System
- **100 Badges**: Bronze, Silver, Gold, and Platinum tiers
- **Points System**: Earn points for engagement and learning
- **Free Rewards**: 100 points = 1 free month (max 6 months)
- **Ambassador Program**: Refer 50 users = 1 free year

### 🎨 Modern UI/UX
- **Dark/Light Mode**: System-aware theme switching
- **Animations**: Smooth Framer Motion animations
- **Responsive**: Mobile-first design with desktop optimization
- **Performance**: Lazy loading and code splitting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (for database)
- Upstash account (for Redis)
- API keys for integrations

### 1. Clone and Install

```bash
git clone https://github.com/your-org/prism.git
cd prism
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env.local
```

Fill in your environment variables:

#### Required Variables
```env
# Redis (Optional)
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# AI
OPENAI_API_KEY="your-openai-api-key"

# Encryption
ENCRYPTION_KEY="your-32-character-encryption-key"
```

#### Optional API Keys (for live data)
```env
# Financial News
ALPHA_VANTAGE_API_KEY="your-alpha-vantage-key"
FINNHUB_API_KEY="your-finnhub-key"
NEWS_API_KEY="your-news-api-key"

# Crypto APIs
COINBASE_API_KEY="your-coinbase-api-key"
COINBASE_API_SECRET="your-coinbase-api-secret"
COINBASE_API_PASSPHRASE="your-coinbase-passphrase"

BINANCE_API_KEY="your-binance-api-key"
BINANCE_API_SECRET="your-binance-api-secret"

# Ethereum
ETHERSCAN_API_KEY="your-etherscan-key"
```

### 3. Database Setup

Initialize the database:
```bash
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup (Optional)

### Note: Database Not Required
Prism now runs with mock data and doesn't require a database setup. All features work with static data.

### 2. Configure Database
1. Go to Settings → Database
2. Copy the connection string
3. Update your `.env.local` with the database URL

### 3. Run Migrations
```bash
npx prisma db push
npm run prisma:seed
```

## ☁️ Redis Setup (Upstash)

### 1. Create Upstash Database
1. Go to [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and token

### 2. Update Environment
Add to your `.env.local`:
```env
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"
```

## 🚀 Deployment (Vercel)

### 1. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Or connect your GitHub repository to Vercel dashboard.

### 2. Environment Variables
In your Vercel dashboard, add all environment variables from `.env.production`:

**Required:**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `OPENAI_API_KEY`
- `ENCRYPTION_KEY`

**Optional (for live data):**
- Financial news API keys
- Crypto exchange API keys
- OAuth provider credentials

### 3. Database Migration
Run the production migration:
```bash
npx prisma migrate deploy
```

### 4. Custom Domain (Optional)
1. Add your domain in Vercel dashboard
2. Update `
3. Configure DNS records

## 🧪 Testing

### Unit Tests
```bash
npm test
npm run test:watch
```

### E2E Tests
```bash
npm run test:e2e
npm run test:e2e:ui
```

### Type Checking
```bash
npm run type-check
```

## 🔧 Development

### Code Quality
```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

### Database
```bash
npm run prisma:studio    # Open Prisma Studio
npm run prisma:reset     # Reset database
npm run prisma:seed      # Seed with sample data
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Portfolio dashboard
│   ├── ai/                # AI assistant
│   ├── chess/             # Financial chess
│   ├── library/           # Book library
│   ├── badges/            # Gamification
│   ├── settings/          # User settings
│   └── legal/             # Legal pages
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── lib/                   # Core libraries
│   ├── integrations/      # Live API adapters
│   ├── ai/                # AI assistant
│   ├── chess/             # Chess game logic
│   ├── mock-data/         # Static mock data
│   └── ...                # Utilities
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

## 🔌 API Integrations

### Supported Providers
- **Crypto**: Coinbase Pro, Binance (live)
- **Wallets**: MetaMask (live via Web3)
- **Traditional**: Fidelity (placeholder)
- **News**: Alpha Vantage, Finnhub, NewsAPI

### Adding New Integrations
1. Create adapter in `src/lib/integrations/`
2. Implement `IntegrationAdapter` interface
3. Add to `IntegrationManager`
4. Update UI in settings

## 🛡️ Security & Compliance

### Security Features
- **Non-custodial**: Never store private keys
- **Read-only**: All integrations are read-only
- **Encryption**: API keys encrypted at rest
- **Headers**: Security headers via Vercel
- **HTTPS**: Enforced in production

### Compliance
- **Privacy Policy**: Comprehensive privacy protection
- **Disclaimers**: Clear "not financial advice" warnings
- **Data Export**: Full GDPR compliance
- **Legal Pages**: Terms, privacy, disclaimers

## 🎯 Performance

### Optimizations
- **Lazy Loading**: Charts and heavy components
- **Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: React Query for API responses
- **Bundle Analysis**: `npm run analyze`

### Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Built-in error boundaries
- **Loading States**: Skeleton components throughout

## 📊 Analytics & Monitoring

### Built-in Analytics
- **Vercel Analytics**: Page views and performance
- **Error Boundaries**: Automatic error capture
- **Performance**: Core Web Vitals tracking

### Custom Events
- Badge achievements
- Integration connections
- Feature usage patterns

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Comprehensive JSDoc comments
- Test coverage for new features

## 📄 Legal & Disclaimers

### Important Notes
- **Educational Only**: Not financial advice
- **Non-custodial**: We never control your assets
- **Privacy First**: No public data sharing
- **Simulation Only**: All rebalancing is educational

### Support
- **Documentation**: Comprehensive guides included
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions

## 🎉 Demo

Try the live demo: [https://prism-demo.vercel.app](https://prism-demo.vercel.app)

Demo credentials:
- Email: `demo@prism.app`
- Use magic link authentication

---

**Built with ❤️ for financial education and privacy**

*This is educational software. Always consult qualified financial professionals for investment decisions.*
