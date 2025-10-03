import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PricingTable } from '@/components/marketing/pricing-table'

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('Pricing Table', () => {
  it('should display Prism Pro plan with $150 price', () => {
    render(<PricingTable />)
    
    expect(screen.getByText('Prism Pro')).toBeInTheDocument()
    expect(screen.getByText('$150')).toBeInTheDocument()
    expect(screen.getByText('per month • Cancel anytime')).toBeInTheDocument()
  })

  it('should show founder launch discount', () => {
    render(<PricingTable />)
    
    expect(screen.getByText('Founder Launch — 25% off first month')).toBeInTheDocument()
    expect(screen.getByText('$200')).toBeInTheDocument() // Original price
    expect(screen.getByText('25% off')).toBeInTheDocument()
  })

  it('should display all premium features', () => {
    render(<PricingTable />)
    
    // Core features
    expect(screen.getByText('AI Portfolio Assistant with expanded datasets')).toBeInTheDocument()
    expect(screen.getByText('Portfolio dashboard with line chart tracking (1M/3M/6M/1Y)')).toBeInTheDocument()
    expect(screen.getByText('Financial Chess game (quarterly seasons, AI opponent)')).toBeInTheDocument()
    
    // Education features
    expect(screen.getByText('Education Library: AI, Strategy, Macro, Modern Investing')).toBeInTheDocument()
    expect(screen.getByText('Gamification: 100+ badges, referral rewards, ambassador program')).toBeInTheDocument()
    
    // Export and security
    expect(screen.getByText('Export tools: CSV, PDF, JSON')).toBeInTheDocument()
    expect(screen.getByText('Security: 2FA, privacy-first, non-custodial')).toBeInTheDocument()
    
    // Support and integrations
    expect(screen.getByText('Priority support & advanced integrations')).toBeInTheDocument()
    expect(screen.getByText('Custom portfolio alerts & notifications')).toBeInTheDocument()
    expect(screen.getByText('Real-time market news & sentiment analysis')).toBeInTheDocument()
  })

  it('should display educational disclaimer', () => {
    render(<PricingTable />)
    
    expect(screen.getByText('Important Notice')).toBeInTheDocument()
    expect(screen.getByText(/Cancel anytime • Educational use only • No trading execution/)).toBeInTheDocument()
    expect(screen.getByText(/Past performance does not guarantee future results/)).toBeInTheDocument()
  })

  it('should show call-to-action buttons', () => {
    render(<PricingTable />)
    
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('View Live Demo')).toBeInTheDocument()
  })

  it('should display plan benefits', () => {
    render(<PricingTable />)
    
    expect(screen.getByText('Instant Setup')).toBeInTheDocument()
    expect(screen.getByText('Educational Only')).toBeInTheDocument()
    expect(screen.getByText('Cancel Anytime')).toBeInTheDocument()
  })

  it('should show plan description', () => {
    render(<PricingTable />)
    
    expect(screen.getByText(/The complete Prism experience with AI-powered portfolio intelligence/)).toBeInTheDocument()
    expect(screen.getByText(/Financial Chess, expanded datasets, and premium features/)).toBeInTheDocument()
  })

  it('should display most popular badge', () => {
    render(<PricingTable />)
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })
})
