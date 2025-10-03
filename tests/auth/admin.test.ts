import { describe, it, expect } from 'vitest'
import { UserRole } from '@prisma/client'
import {
  isMasterAdmin,
  isAdmin,
  hasActiveSubscription,
  canBypassRateLimit,
  canAccessPremiumFeatures,
  canAccessExpandedAI,
  canAccessFinancialChess,
  canExportData,
  getAIQueryLimit,
  getChessResets,
  getLibraryAccess,
  canManageUsers,
  canViewAuditLogs,
  canOverrideFeatures
} from '@/lib/auth/permissions'

describe('Master Admin Permissions', () => {
  const masterAdmin = {
    id: '1',
    email: 'Toonz.kham@proton.me',
    role: UserRole.MASTER_ADMIN
  }

  const regularUser = {
    id: '2',
    email: 'user@example.com',
    role: UserRole.USER
  }

  const adminUser = {
    id: '3',
    email: 'admin@example.com',
    role: UserRole.ADMIN
  }

  const userWithActiveSubscription = {
    id: '4',
    email: 'premium@example.com',
    role: UserRole.USER,
    subscription: {
      id: 'sub-1',
      status: 'ACTIVE',
      plan: 'PRO'
    }
  }

  const userWithInactiveSubscription = {
    id: '5',
    email: 'expired@example.com',
    role: UserRole.USER,
    subscription: {
      id: 'sub-2',
      status: 'EXPIRED',
      plan: 'PRO'
    }
  }

  describe('Role Checks', () => {
    it('should identify master admin correctly', () => {
      expect(isMasterAdmin(masterAdmin)).toBe(true)
      expect(isMasterAdmin(regularUser)).toBe(false)
      expect(isMasterAdmin(adminUser)).toBe(false)
      expect(isMasterAdmin(null)).toBe(false)
    })

    it('should identify admin correctly', () => {
      expect(isAdmin(masterAdmin)).toBe(true)
      expect(isAdmin(adminUser)).toBe(true)
      expect(isAdmin(regularUser)).toBe(false)
      expect(isAdmin(null)).toBe(false)
    })
  })

  describe('Subscription Access', () => {
    it('should grant access to master admin regardless of subscription', () => {
      expect(hasActiveSubscription(masterAdmin)).toBe(true)
      expect(hasActiveSubscription({ ...masterAdmin, subscription: null })).toBe(true)
    })

    it('should grant access to users with active subscription', () => {
      expect(hasActiveSubscription(userWithActiveSubscription)).toBe(true)
    })

    it('should deny access to users without active subscription', () => {
      expect(hasActiveSubscription(regularUser)).toBe(false)
      expect(hasActiveSubscription(userWithInactiveSubscription)).toBe(false)
    })
  })

  describe('Rate Limit Bypass', () => {
    it('should allow master admin to bypass rate limits', () => {
      expect(canBypassRateLimit(masterAdmin)).toBe(true)
    })

    it('should not allow regular users to bypass rate limits', () => {
      expect(canBypassRateLimit(regularUser)).toBe(false)
      expect(canBypassRateLimit(adminUser)).toBe(false)
    })
  })

  describe('Premium Features Access', () => {
    it('should grant master admin access to all premium features', () => {
      expect(canAccessPremiumFeatures(masterAdmin)).toBe(true)
      expect(canAccessExpandedAI(masterAdmin)).toBe(true)
      expect(canAccessFinancialChess(masterAdmin)).toBe(true)
      expect(canExportData(masterAdmin)).toBe(true)
    })

    it('should grant premium users access to premium features', () => {
      expect(canAccessPremiumFeatures(userWithActiveSubscription)).toBe(true)
      expect(canAccessExpandedAI(userWithActiveSubscription)).toBe(true)
      expect(canAccessFinancialChess(userWithActiveSubscription)).toBe(true)
      expect(canExportData(userWithActiveSubscription)).toBe(true)
    })

    it('should deny regular users access to premium features', () => {
      expect(canAccessPremiumFeatures(regularUser)).toBe(false)
      expect(canAccessExpandedAI(regularUser)).toBe(false)
      expect(canAccessFinancialChess(regularUser)).toBe(false)
      expect(canExportData(regularUser)).toBe(false)
    })
  })

  describe('Limits and Quotas', () => {
    it('should give master admin unlimited AI queries', () => {
      expect(getAIQueryLimit(masterAdmin)).toBe(Infinity)
    })

    it('should give regular users limited AI queries', () => {
      expect(getAIQueryLimit(regularUser)).toBe(50)
    })

    it('should give master admin unlimited chess resets', () => {
      expect(getChessResets(masterAdmin)).toBe(Infinity)
    })

    it('should give regular users limited chess resets', () => {
      expect(getChessResets(regularUser)).toBe(3)
    })

    it('should give master admin premium library access', () => {
      expect(getLibraryAccess(masterAdmin)).toBe('premium')
    })

    it('should give premium users premium library access', () => {
      expect(getLibraryAccess(userWithActiveSubscription)).toBe('premium')
    })

    it('should give regular users basic library access', () => {
      expect(getLibraryAccess(regularUser)).toBe('basic')
    })
  })

  describe('Admin Functions', () => {
    it('should allow master admin to manage users', () => {
      expect(canManageUsers(masterAdmin)).toBe(true)
      expect(canViewAuditLogs(masterAdmin)).toBe(true)
    })

    it('should allow regular admin to manage users', () => {
      expect(canManageUsers(adminUser)).toBe(true)
      expect(canViewAuditLogs(adminUser)).toBe(true)
    })

    it('should not allow regular users to manage users', () => {
      expect(canManageUsers(regularUser)).toBe(false)
      expect(canViewAuditLogs(regularUser)).toBe(false)
    })

    it('should only allow master admin to override features', () => {
      expect(canOverrideFeatures(masterAdmin)).toBe(true)
      expect(canOverrideFeatures(adminUser)).toBe(false)
      expect(canOverrideFeatures(regularUser)).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle null users gracefully', () => {
      expect(isMasterAdmin(null)).toBe(false)
      expect(hasActiveSubscription(null)).toBe(false)
      expect(canBypassRateLimit(null)).toBe(false)
      expect(canAccessPremiumFeatures(null)).toBe(false)
      expect(getAIQueryLimit(null)).toBe(50)
      expect(getChessResets(null)).toBe(3)
      expect(getLibraryAccess(null)).toBe('basic')
    })

    it('should handle users without subscription field', () => {
      const userWithoutSub = { ...regularUser }
      delete (userWithoutSub as any).subscription
      
      expect(hasActiveSubscription(userWithoutSub)).toBe(false)
      expect(canAccessPremiumFeatures(userWithoutSub)).toBe(false)
    })
  })
})
