"use client"

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Zap, ZapOff } from 'lucide-react'

export function PerformanceToggle() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Check if user has previously set performance mode
    const savedMode = localStorage.getItem('prism-performance-mode')
    if (savedMode === 'low') {
      setIsLowPerformance(true)
      document.body.classList.add('performance-mode')
    }
  }, [])

  const handleToggle = (checked: boolean) => {
    setIsLowPerformance(checked)
    
    if (checked) {
      document.body.classList.add('performance-mode')
      localStorage.setItem('prism-performance-mode', 'low')
    } else {
      document.body.classList.remove('performance-mode')
      localStorage.setItem('prism-performance-mode', 'normal')
    }
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-lg">
      <div className="flex items-center space-x-2">
        {isLowPerformance ? (
          <ZapOff className="h-4 w-4 text-yellow-500" />
        ) : (
          <Zap className="h-4 w-4 text-blue-500" />
        )}
        <Label htmlFor="performance-toggle" className="text-sm font-medium text-slate-300">
          {isLowPerformance ? 'Low Performance Mode' : 'High Performance Mode'}
        </Label>
      </div>
      <Switch
        id="performance-toggle"
        checked={isLowPerformance}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-yellow-600"
      />
    </div>
  )
}

export default PerformanceToggle
