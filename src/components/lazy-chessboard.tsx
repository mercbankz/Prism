"use client"

import { Suspense, lazy } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Lazy load the chessboard component as it's quite large
const Chessboard = lazy(() => import("react-chessboard").then(module => ({ default: module.Chessboard })))

interface LazyChessboardProps {
  position?: string
  onPieceDrop?: (sourceSquare: string, targetSquare: string) => boolean
  boardWidth?: number
  arePiecesDraggable?: boolean
  customBoardStyle?: Record<string, string>
  customDarkSquareStyle?: Record<string, string>
  customLightSquareStyle?: Record<string, string>
  customPieces?: any
  [key: string]: any
}

export function LazyChessboard(props: LazyChessboardProps) {
  return (
    <Suspense 
      fallback={
        <div className="chess-board bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-lg aspect-square flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Loading chess board...</p>
          </div>
        </div>
      }
    >
      <div className="chess-board">
        <Chessboard {...props} />
      </div>
    </Suspense>
  )
}
