"use client"

import { Suspense, lazy } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Lazy load chart components to reduce initial bundle size
const PieChart = lazy(() => import("recharts").then(module => ({ default: module.PieChart })))
const BarChart = lazy(() => import("recharts").then(module => ({ default: module.BarChart })))
const LineChart = lazy(() => import("recharts").then(module => ({ default: module.LineChart })))
const ResponsiveContainer = lazy(() => import("recharts").then(module => ({ default: module.ResponsiveContainer })))

interface LazyChartProps {
  type: 'pie' | 'bar' | 'line'
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LazyChart({ type, children, fallback }: LazyChartProps) {
  const defaultFallback = (
    <div className="w-full h-64 flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'pie' ? <PieChart>{children}</PieChart> : 
         type === 'bar' ? <BarChart>{children}</BarChart> :
         <LineChart>{children}</LineChart>}
      </ResponsiveContainer>
    </Suspense>
  )
}

// Export lazy-loaded chart components
export const LazyPieChart = lazy(() => import("recharts").then(module => ({ default: module.PieChart })))
export const LazyBarChart = lazy(() => import("recharts").then(module => ({ default: module.BarChart })))
export const LazyLineChart = lazy(() => import("recharts").then(module => ({ default: module.LineChart })))
export const LazyResponsiveContainer = lazy(() => import("recharts").then(module => ({ default: module.ResponsiveContainer })))

// Chart components that are commonly used together
export const ChartComponents = {
  Pie: lazy(() => import("recharts").then(module => ({ default: module.Pie as any }))),
  Cell: lazy(() => import("recharts").then(module => ({ default: module.Cell as any }))),
  Bar: lazy(() => import("recharts").then(module => ({ default: module.Bar as any }))),
  Line: lazy(() => import("recharts").then(module => ({ default: module.Line as any }))),
  XAxis: lazy(() => import("recharts").then(module => ({ default: module.XAxis as any }))),
  YAxis: lazy(() => import("recharts").then(module => ({ default: module.YAxis as any }))),
  CartesianGrid: lazy(() => import("recharts").then(module => ({ default: module.CartesianGrid as any }))),
  Tooltip: lazy(() => import("recharts").then(module => ({ default: module.Tooltip as any }))),
  Legend: lazy(() => import("recharts").then(module => ({ default: module.Legend as any }))),
}
