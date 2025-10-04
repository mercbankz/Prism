"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Bell, Mail, Smartphone, CheckCircle } from "lucide-react"

interface SetAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventData?: {
    title: string
    date: string
    time: string
    signal: 'positive' | 'negative' | 'neutral'
    impacts: string
  }
}

export function SetAlertDialog({ open, onOpenChange, eventData }: SetAlertDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    message: eventData ? `Reminder: ${eventData.title} is coming up. Check your portfolio for potential impacts.` : '',
    date: eventData?.date || '',
    time: eventData?.time || '09:00',
    deliverEmail: false,
    deliverWeb: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: eventData?.title || 'Custom Alert',
          eventKey: eventData?.title?.toLowerCase().replace(/\s+/g, '_') || 'custom_alert',
          symbol: null,
          at: `${formData.date}T${formData.time}:00Z`,
          deliverEmail: formData.deliverEmail,
          deliverWeb: formData.deliverWeb,
          message: formData.message
        })
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          onOpenChange(false)
          setFormData({
            message: '',
            date: '',
            time: '09:00',
            deliverEmail: false,
            deliverWeb: true
          })
        }, 2000)
      } else {
        console.error('Failed to create alert:', result.error)
      }
    } catch (error) {
      console.error('Error creating alert:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'positive': return 'bg-green-600 text-white'
      case 'negative': return 'bg-red-600 text-white'
      default: return 'bg-slate-600 text-white'
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'positive': return '📈'
      case 'negative': return '📉'
      default: return '📊'
    }
  }

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Alert Set Successfully!</h3>
            <p className="text-slate-400">You'll receive notifications for this event.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Set Event Alert
          </DialogTitle>
          <DialogDescription>
            Create personalized alerts for financial events impacting your portfolio
          </DialogDescription>
        </DialogHeader>

        {eventData && (
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-white">{eventData.title}</span>
              <Badge className={`text-xs ${getSignalColor(eventData.signal)}`}>
                {getSignalIcon(eventData.signal)} {eventData.signal === 'positive' ? 'Positive' : 
                 eventData.signal === 'negative' ? 'Negative' : 'Neutral'}
              </Badge>
            </div>
            <div className="text-sm text-slate-300 mb-1">{eventData.date} • {eventData.time}</div>
            <div className="text-xs text-slate-400">Impacts: {eventData.impacts}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-white mb-2 block">
              Custom Reminder Message
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="e.g., Check portfolio impact, Review market conditions, Consider rebalancing..."
              className="min-h-[80px] bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-white mb-3 block">Notification Delivery</Label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.deliverEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliverEmail: e.target.checked }))}
                  className="text-blue-600 rounded"
                />
                <Mail className="h-4 w-4 text-blue-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Email Notification</div>
                  <div className="text-xs text-slate-400">Receive alerts via email</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.deliverWeb}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliverWeb: e.target.checked }))}
                  className="text-blue-600 rounded"
                />
                <Smartphone className="h-4 w-4 text-green-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">In-App Notification</div>
                  <div className="text-xs text-slate-400">Banner alerts when you're active</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-white mb-2 block">Alert Timing</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date" className="text-xs text-slate-400 mb-1 block">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-xs text-slate-400 mb-1 block">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.date || !formData.time}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Create Alert
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
