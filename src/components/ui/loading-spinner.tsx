"use client"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/Logo"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
}

export function LoadingSpinner({ className, size = "md", showText = false }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Logo size={size} showText={showText} animated={true} />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}

export function LoadingTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>
      ))}
    </div>
  )
}
