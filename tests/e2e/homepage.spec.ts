import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display main navigation and hero content', async ({ page }) => {
    await page.goto('/')

    // Check hero section
    await expect(page.getByRole('heading', { name: /Prism/i })).toBeVisible()
    await expect(page.getByText(/AI Portfolio Intelligence/i)).toBeVisible()
    await expect(page.getByText(/Analyze\. Learn\. Play\. Grow\./i)).toBeVisible()

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Get Started Free/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Explore Library/i })).toBeVisible()

    // Check features section
    await expect(page.getByText(/Non-Custodial & Private/i)).toBeVisible()
    await expect(page.getByText(/AI-Powered Insights/i)).toBeVisible()
    await expect(page.getByText(/Financial Chess/i)).toBeVisible()
    await expect(page.getByText(/Financial Library/i)).toBeVisible()
    await expect(page.getByText(/Gamified Learning/i)).toBeVisible()
    await expect(page.getByText(/Portfolio Analytics/i)).toBeVisible()
  })

  test('should navigate to dashboard when clicking Get Started', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /Get Started Free/i }).click()
    await expect(page).toHaveURL('/dashboard')
  })

  test('should navigate to library when clicking Explore Library', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /Explore Library/i }).click()
    await expect(page).toHaveURL('/library')
  })

  test('should have proper footer links', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to footer
    await page.getByText(/© 2024 Prism/i).scrollIntoViewIfNeeded()
    
    await expect(page.getByRole('link', { name: /Privacy Policy/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Terms of Service/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Disclaimer/i })).toBeVisible()
  })
})
