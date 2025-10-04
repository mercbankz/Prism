"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield, Crown, Star } from "lucide-react"
import Link from "next/link"

interface MembershipLockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MembershipLockModal({ open, onOpenChange }: MembershipLockModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLearnMore = () => {
    onOpenChange(false)
    // Scroll to the "Why Prism Exists" section
    setTimeout(() => {
      document.getElementById('why-prism-exists')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#E5E8FF]">
            Exclusive to Prism Guardian Members
          </DialogTitle>
          <DialogDescription className="text-[#E5E8FF]/70">
            Unlock access to portfolio analytics, AI assistant, community, and learning library with your Prism subscription.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-5 w-5 text-[#8B5CF6]" />
              <span className="text-[#E5E8FF] font-medium">What You'll Get:</span>
            </div>
            <ul className="space-y-2 text-sm text-[#E5E8FF]/70">
              <li className="flex items-center space-x-2">
                <Star className="h-3 w-3 text-[#FF007A]" />
                <span>Advanced portfolio analytics & insights</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="h-3 w-3 text-[#FF007A]" />
                <span>AI-powered investment recommendations</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="h-3 w-3 text-[#FF007A]" />
                <span>Exclusive community access</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="h-3 w-3 text-[#FF007A]" />
                <span>Premium learning library</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] hover:from-[#FF007A]/90 hover:to-[#8B5CF6]/90 text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,122,0.5)]"
          >
            <Link href="/pricing">
              Subscribe Now
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleLearnMore}
            className="flex-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            Learn More
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
