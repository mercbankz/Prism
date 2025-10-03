import { test, expect } from '@playwright/test'

test.describe('Marketing Site', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check main elements are visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Prism')).toBeVisible()
    await expect(page.locator('text=AI Portfolio Intelligence')).toBeVisible()
    
    // Check navigation
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('text=Pricing')).toBeVisible()
    await expect(page.locator('text=Integrations')).toBeVisible()
  })

  test('hero section has correct content', async ({ page }) => {
    await page.goto('/')
    
    // Check hero headline
    await expect(page.locator('text=One dashboard')).toBeVisible()
    await expect(page.locator('text=Infinite clarity')).toBeVisible()
    
    // Check CTA buttons
    await expect(page.locator('text=Get Started')).toBeVisible()
    await expect(page.locator('text=Live Demo')).toBeVisible()
    
    // Check trust indicators
    await expect(page.locator('text=61,400+')).toBeVisible()
    await expect(page.locator('text=190,500+')).toBeVisible()
    await expect(page.locator('text=30,000+')).toBeVisible()
  })

  test('live stats marquee is functional', async ({ page }) => {
    await page.goto('/')
    
    // Check stats section
    await expect(page.locator('text=Growing Together')).toBeVisible()
    await expect(page.locator('text=Portfolios Analyzed')).toBeVisible()
    await expect(page.locator('text=Badges Earned')).toBeVisible()
    await expect(page.locator('text=Books Completed')).toBeVisible()
    
    // Check live indicator
    await expect(page.locator('text=Live data')).toBeVisible()
  })

  test('value pillars section displays correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check section title
    await expect(page.locator('text=Built for Modern Investors')).toBeVisible()
    
    // Check all four pillars
    await expect(page.locator('text=Non-Custodial Privacy')).toBeVisible()
    await expect(page.locator('text=AI Portfolio Health')).toBeVisible()
    await expect(page.locator('text=Financial Chess')).toBeVisible()
    await expect(page.locator('text=Gamified Learning')).toBeVisible()
  })

  test('feature sections showcase products', async ({ page }) => {
    await page.goto('/')
    
    // Check feature sections
    await expect(page.locator('text=Everything You Need')).toBeVisible()
    await expect(page.locator('text=Portfolio Intelligence')).toBeVisible()
    await expect(page.locator('text=Prism AI Assistant')).toBeVisible()
    await expect(page.locator('text=Financial Chess')).toBeVisible()
    await expect(page.locator('text=Financial Library')).toBeVisible()
  })

  test('integrations grid shows platforms', async ({ page }) => {
    await page.goto('/')
    
    // Check integrations section
    await expect(page.locator('text=Connect Everything')).toBeVisible()
    await expect(page.locator('text=Read-only • No custody • Encrypted')).toBeVisible()
    
    // Check some integration cards
    await expect(page.locator('text=Coinbase Pro')).toBeVisible()
    await expect(page.locator('text=Binance')).toBeVisible()
    await expect(page.locator('text=MetaMask')).toBeVisible()
  })

  test('pricing section displays correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check pricing section
    await expect(page.locator('text=Simple Pricing')).toBeVisible()
    await expect(page.locator('text=Pro')).toBeVisible()
    await expect(page.locator('text=$150')).toBeVisible()
    await expect(page.locator('text=25% off')).toBeVisible()
  })

  test('testimonials section is visible', async ({ page }) => {
    await page.goto('/')
    
    // Check testimonials
    await expect(page.locator('text=Loved by Investors')).toBeVisible()
    await expect(page.locator('text=4.9/5')).toBeVisible()
    await expect(page.locator('text=8,500+')).toBeVisible()
  })

  test('CTA section has correct messaging', async ({ page }) => {
    await page.goto('/')
    
    // Check final CTA
    await expect(page.locator('text=Build your edge')).toBeVisible()
    await expect(page.locator('text=Not your spreadsheet')).toBeVisible()
    await expect(page.locator('text=Start Free Trial')).toBeVisible()
    await expect(page.locator('text=See Live Demo')).toBeVisible()
  })

  test('footer contains all links', async ({ page }) => {
    await page.goto('/')
    
    // Check footer links
    await expect(page.locator('text=Pricing')).toBeVisible()
    await expect(page.locator('text=Integrations')).toBeVisible()
    await expect(page.locator('text=Security')).toBeVisible()
    await expect(page.locator('text=Blog')).toBeVisible()
    await expect(page.locator('text=Privacy Policy')).toBeVisible()
    await expect(page.locator('text=Terms of Use')).toBeVisible()
  })

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/')
    
    // Test navigation to pricing
    await page.click('text=Pricing')
    await expect(page).toHaveURL('/pricing')
    await expect(page.locator('h1')).toContainText('Simple Pricing')
    
    // Test navigation to integrations
    await page.click('text=Integrations')
    await expect(page).toHaveURL('/integrations')
    await expect(page.locator('h1')).toContainText('Secure Integrations')
    
    // Test navigation to security
    await page.click('text=Security')
    await expect(page).toHaveURL('/security')
    await expect(page.locator('h1')).toContainText('Security First')
  })

  test('mobile navigation works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check mobile menu button
    await expect(page.locator('[aria-label="Menu"]')).toBeVisible()
    
    // Open mobile menu
    await page.click('[aria-label="Menu"]')
    
    // Check mobile menu items
    await expect(page.locator('text=Pricing')).toBeVisible()
    await expect(page.locator('text=Integrations')).toBeVisible()
  })

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/')
    
    // Check theme toggle button exists
    const themeToggle = page.locator('[data-testid="theme-toggle"]')
    if (await themeToggle.isVisible()) {
      await themeToggle.click()
      // Theme should change (this would need actual theme testing)
    }
  })
})

test.describe('Pricing Page', () => {
  test('pricing page loads correctly', async ({ page }) => {
    await page.goto('/pricing')
    
    await expect(page.locator('h1')).toContainText('Simple Pricing')
    await expect(page.locator('text=Pro')).toBeVisible()
    await expect(page.locator('text=$150')).toBeVisible()
    await expect(page.locator('text=Start Free Trial')).toBeVisible()
  })
})

test.describe('Blog Page', () => {
  test('blog page loads correctly', async ({ page }) => {
    await page.goto('/blog')
    
    await expect(page.locator('h1')).toContainText('Prism Blog')
    await expect(page.locator('text=Featured Articles')).toBeVisible()
    await expect(page.locator('text=All Articles')).toBeVisible()
  })

  test('blog post loads correctly', async ({ page }) => {
    await page.goto('/blog/ai-portfolio-analysis-future')
    
    await expect(page.locator('h1')).toContainText('The Future of AI-Powered Portfolio Analysis')
    await expect(page.locator('text=Back to Blog')).toBeVisible()
    await expect(page.locator('text=Read More')).toBeVisible()
  })
})
