"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  User, 
  Shield, 
  Database, 
  ExternalLink,
  Download,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Check
} from "lucide-react"
import { generateReferralCode } from "@/lib/utils"

// Mock user data
const userData = {
  id: 'user_123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: null,
  createdAt: '2024-01-15',
  referralCode: 'PRISM-USER123',
  referrals: {
    total: 12,
    active: 8,
    pending: 4
  }
}

// Mock connected accounts
const connectedAccounts = [
  { id: '1', provider: 'coinbase', label: 'Coinbase Pro', connected: true, lastSync: '2024-01-20' },
  { id: '2', provider: 'metamask', label: 'MetaMask Wallet', connected: true, lastSync: '2024-01-19' },
  { id: '3', provider: 'binance', label: 'Binance', connected: false, lastSync: null },
  { id: '4', provider: 'kraken', label: 'Kraken', connected: false, lastSync: null },
]

export default function SettingsPage() {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})
  const [copiedReferral, setCopiedReferral] = useState(false)

  const toggleApiKeyVisibility = (accountId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }))
  }

  const copyReferralCode = async () => {
    await navigator.clipboard.writeText(`https://prism.app/ref/${userData.referralCode}`)
    setCopiedReferral(true)
    setTimeout(() => setCopiedReferral(false), 2000)
  }

  const exportData = () => {
    // Mock data export
    const data = {
      user: userData,
      portfolioData: "Mock portfolio data would be here",
      badges: "Mock badges data would be here",
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prism-data-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="w-8 h-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile, connections, security, and data preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </CardTitle>
            <CardDescription>
              Your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  {userData.name}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">
                  {userData.email}
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Member Since</label>
              <div className="mt-1 p-2 border rounded-md bg-muted">
                {new Date(userData.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Button variant="outline">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Account Connections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Account Connections
            </CardTitle>
            <CardDescription>
              Connect your wallets and exchanges for portfolio tracking (read-only)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{account.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {account.connected 
                          ? `Last synced: ${new Date(account.lastSync!).toLocaleDateString()}`
                          : 'Not connected'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {account.connected ? (
                      <>
                        <Badge variant="outline" className="text-green-600">Connected</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleApiKeyVisibility(account.id)}
                        >
                          {showApiKeys[account.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          Sync Now
                        </Button>
                        <Button variant="destructive" size="sm">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Non-Custodial & Read-Only
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    We never store private keys or execute trades. All connections are read-only for portfolio analysis only.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Referral Program
            </CardTitle>
            <CardDescription>
              Invite friends and earn rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-primary">{userData.referrals.total}</p>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-green-600">{userData.referrals.active}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{userData.referrals.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Your Referral Link</label>
              <div className="flex gap-2 mt-1">
                <div className="flex-1 p-2 border rounded-md bg-muted font-mono text-sm">
                  https://prism.app/ref/{userData.referralCode}
                </div>
                <Button onClick={copyReferralCode} variant="outline">
                  {copiedReferral ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Ambassador Program:</strong> Refer 50 active users to earn the Ambassador badge and unlock 1 free year of Prism Premium!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">
                Enable 2FA
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Button variant="outline">
                Change Password
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
              </div>
              <Button variant="outline">
                View Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data & Privacy
            </CardTitle>
            <CardDescription>
              Control your data and privacy preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Export Data</p>
                <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
              </div>
              <Button variant="outline" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Data Retention</p>
                <p className="text-sm text-muted-foreground">Your data is kept private and never shared</p>
              </div>
              <Badge variant="outline" className="text-green-600">Private</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 dark:border-red-800">
              <div>
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader>
            <CardTitle>Legal</CardTitle>
            <CardDescription>
              Terms, privacy policy, and disclaimers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto">
                Terms of Service
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">
                Financial Disclaimer
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">
                Cookie Policy
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 border rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Prism provides educational content and portfolio analytics only. 
                We do not provide financial advice, execute trades, or manage your assets. 
                Always consult with qualified financial professionals for investment decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
