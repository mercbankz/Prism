"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <CardTitle className="text-white">Something went wrong</CardTitle>
          <CardDescription className="text-slate-400">
            We encountered an unexpected error. Don't worry, your data is safe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400 font-mono">
                {error.message || 'Unknown error occurred'}
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <Button 
              onClick={resetError}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for handling async errors
export function useAsyncError() {
  const [error, setError] = React.useState<Error | null>(null)

  const throwError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return throwError
}

// Hook for safe async operations
export function useSafeAsync<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList = []
): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const execute = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFn()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Async operation failed:', err)
    } finally {
      setLoading(false)
    }
  }, [asyncFn, ...(deps || [])])

  React.useEffect(() => {
    execute()
  }, [execute])

  return { data, loading, error, refetch: execute }
}