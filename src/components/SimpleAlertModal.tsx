"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MessageSquare } from "lucide-react"

interface SimpleAlertModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventTitle?: string
  onSaveAlert?: (alert: any) => void
}

export function SimpleAlertModal({ open, onOpenChange, eventTitle, onSaveAlert }: SimpleAlertModalProps) {
  const [alertData, setAlertData] = useState({
    date: '',
    time: '',
    message: ''
  })

  const handleSave = () => {
    if (alertData.date && alertData.time && alertData.message) {
      const alert = {
        id: Date.now(),
        eventTitle: eventTitle || 'Financial Event',
        date: alertData.date,
        time: alertData.time,
        message: alertData.message,
        status: 'active',
        createdAt: new Date().toISOString()
      }
      
      // Save to localStorage for demo
      const existingAlerts = JSON.parse(localStorage.getItem('prism-alerts') || '[]')
      existingAlerts.push(alert)
      localStorage.setItem('prism-alerts', JSON.stringify(existingAlerts))
      
      if (onSaveAlert) {
        onSaveAlert(alert)
      }
      
      // Reset form
      setAlertData({ date: '', time: '', message: '' })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#E5E8FF]">
            Set Alert for {eventTitle}
          </DialogTitle>
          <DialogDescription className="text-[#E5E8FF]/70">
            Get notified before this event impacts your portfolio
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-[#E5E8FF] flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={alertData.date}
              onChange={(e) => setAlertData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white focus:border-[#8B5CF6]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-[#E5E8FF] flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={alertData.time}
              onChange={(e) => setAlertData(prev => ({ ...prev, time: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white focus:border-[#8B5CF6]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#E5E8FF] flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Alert Message/Notes
            </Label>
            <Input
              id="message"
              type="text"
              placeholder="e.g., Check portfolio before market opens"
              value={alertData.message}
              onChange={(e) => setAlertData(prev => ({ ...prev, message: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white focus:border-[#8B5CF6]"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!alertData.date || !alertData.time || !alertData.message}
            className="flex-1 bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] hover:from-[#FF007A]/90 hover:to-[#8B5CF6]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Alert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
