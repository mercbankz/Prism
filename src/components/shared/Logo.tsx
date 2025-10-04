import React from 'react'
import Link from 'next/link'

interface LogoProps {
  className?: string
  size?: number | string
  showText?: boolean
  animated?: boolean
}

export function Logo({ className = "", size = 80, showText = true, animated = true }: LogoProps) {
  // Handle string sizes like "sm", "md", "lg"
  const getSize = () => {
    if (typeof size === 'string') {
      switch (size) {
        case 'sm': return 60
        case 'md': return 80
        case 'lg': return 120
        default: return 80
      }
    }
    return size
  }

  const actualSize = getSize()
  
  return (
    <Link href="/" className={`flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-300 ${className}`}>
      <div 
        className={`relative ${animated ? 'animate-float' : ''}`}
        style={{
          width: actualSize,
          height: actualSize,
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'
        }}
      >
        <svg
          width={actualSize}
          height={actualSize}
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
        <defs>
          {/* Blue to purple gradient for the sword */}
          <linearGradient id="swordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Sword Blade */}
        <path
          d="M50 10 L65 25 L60 75 L50 85 L40 75 L35 25 Z"
          fill="url(#swordGradient)"
          filter="url(#glow)"
        />
        
        {/* Sword Handle */}
        <rect
          x="45"
          y="75"
          width="10"
          height="15"
          fill="url(#swordGradient)"
          rx="2"
        />
        
        {/* Handle Guard */}
        <rect
          x="40"
          y="70"
          width="20"
          height="5"
          fill="url(#swordGradient)"
          rx="2"
        />
        
        {/* Handle Pommel */}
        <circle
          cx="50"
          cy="95"
          r="5"
          fill="url(#swordGradient)"
        />
        
        {/* Sparkle Effects */}
        <circle cx="55" cy="20" r="1.5" fill="#FFFFFF" opacity="0.8" />
        <circle cx="45" cy="30" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="60" cy="40" r="1.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="40" cy="50" r="1" fill="#FFFFFF" opacity="0.5" />
      </svg>
      </div>
      
      {/* Prism Text */}
      {showText && (
        <div className="mt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Prism
          </h1>
        </div>
      )}
    </Link>
  )
}

export default Logo