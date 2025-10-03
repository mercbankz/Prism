import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate between main sections', async ({ page }) => {
    // Start at dashboard
    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { name: /Portfolio Dashboard/i })).toBeVisible()

    // Navigate to AI assistant
    await page.getByRole('link', { name: /AI Assistant/i }).click()
    await expect(page).toHaveURL('/ai')
    await expect(page.getByRole('heading', { name: /Prism AI Assistant/i })).toBeVisible()

    // Navigate to Financial Chess
    await page.getByRole('link', { name: /Financial Chess/i }).click()
    await expect(page).toHaveURL('/chess')
    await expect(page.getByRole('heading', { name: /Financial Chess/i })).toBeVisible()

    // Navigate to Library
    await page.getByRole('link', { name: /Library/i }).click()
    await expect(page).toHaveURL('/library')
    await expect(page.getByRole('heading', { name: /Financial Literacy Library/i })).toBeVisible()

    // Navigate to Badges
    await page.getByRole('link', { name: /Badges/i }).click()
    await expect(page).toHaveURL('/badges')
    await expect(page.getByRole('heading', { name: /Badges & Rewards/i })).toBeVisible()

    // Navigate to Settings
    await page.getByRole('link', { name: /Settings/i }).click()
    await expect(page).toHaveURL('/settings')
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
  })

  test('should show mobile menu on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')

    // Mobile menu button should be visible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible()

    // Desktop sidebar should be hidden
    await expect(page.getByText(/Prism/).first()).toBeVisible()
    
    // Click mobile menu
    await page.getByRole('button', { name: /menu/i }).click()
    
    // Mobile menu items should appear
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /AI Assistant/i })).toBeVisible()
  })

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Dashboard link should be active (has primary background)
    const dashboardLink = page.getByRole('link', { name: /Dashboard/i })
    await expect(dashboardLink).toHaveClass(/bg-primary/)
    
    // Navigate to AI page
    await page.getByRole('link', { name: /AI Assistant/i }).click()
    
    // AI Assistant link should now be active
    const aiLink = page.getByRole('link', { name: /AI Assistant/i })
    await expect(aiLink).toHaveClass(/bg-primary/)
  })
})
