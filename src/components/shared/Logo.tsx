"use client"

import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8", 
  lg: "w-12 h-12",
  xl: "w-16 h-16"
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg", 
  xl: "text-2xl"
}

export function Logo({ size = "md", className = "", showText = true }: LogoProps) {
  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Kingdom Hearts Keyblade-inspired SVG */}
      <motion.div
        className={sizeClasses[size]}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-primary"
          fill="currentColor"
        >
          {/* Keyblade Blade */}
          <path 
            d="M50 10 L55 15 L55 25 L50 30 L45 25 L45 15 Z" 
            fill="url(#gradient1)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Main Blade */}
          <rect 
            x="47" 
            y="30" 
            width="6" 
            height="40" 
            fill="url(#gradient2)"
            stroke="currentColor"
            strokeWidth="1"
            rx="2"
          />
          
          {/* Cross Guard */}
          <rect 
            x="35" 
            y="60" 
            width="30" 
            height="8" 
            fill="url(#gradient3)"
            stroke="currentColor"
            strokeWidth="1"
            rx="4"
          />
          
          {/* Handle */}
          <rect 
            x="47" 
            y="68" 
            width="6" 
            height="15" 
            fill="url(#gradient4)"
            stroke="currentColor"
            strokeWidth="1"
            rx="3"
          />
          
          {/* Pommel */}
          <circle 
            cx="50" 
            cy="88" 
            r="8" 
            fill="url(#gradient5)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Heart Symbol */}
          <path 
            d="M50 82 C46 78, 42 82, 42 86 C42 90, 50 96, 50 96 C50 96, 58 90, 58 86 C58 82, 54 78, 50 82 Z" 
            fill="currentColor"
            opacity="0.8"
          />
          
          {/* Decorative Elements */}
          <circle cx="40" cy="64" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="60" cy="64" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="50" cy="72" r="1.5" fill="currentColor" opacity="0.4" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Text */}
      {showText && (
        <motion.span 
          className={`font-bold ${textSizeClasses[size]} text-foreground`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Prism
        </motion.span>
      )}
    </motion.div>
  )
}