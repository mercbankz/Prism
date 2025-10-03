"use client"

import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
  animated?: boolean
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

export function Logo({ size = "md", className = "", showText = true, animated = true }: LogoProps) {
  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Kingdom Hearts Keyblade-inspired SVG with 3D effects */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={animated ? { 
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={animated ? { 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-2xl"
          fill="currentColor"
          style={{
            filter: "drop-shadow(0 0 20px hsl(var(--primary)))"
          }}
        >
          {/* 3D Shadow Layer */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Enhanced Gradients with Gold */}
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="30%" stopColor="#FFA500" />
              <stop offset="70%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FF6347" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6347" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
            
            {/* 3D Shadow */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Keyblade Blade with 3D effect */}
          <path 
            d="M50 10 L55 15 L55 25 L50 30 L45 25 L45 15 Z" 
            fill="url(#gradient1)"
            stroke="#B8860B"
            strokeWidth="0.5"
            filter="url(#shadow)"
          />
          
          {/* Main Blade with metallic look */}
          <rect 
            x="47" 
            y="30" 
            width="6" 
            height="40" 
            fill="url(#gradient2)"
            stroke="#B8860B"
            strokeWidth="0.5"
            rx="2"
            filter="url(#shadow)"
          />
          
          {/* Cross Guard with ornate design */}
          <rect 
            x="35" 
            y="60" 
            width="30" 
            height="8" 
            fill="url(#gradient3)"
            stroke="#B8860B"
            strokeWidth="0.5"
            rx="4"
            filter="url(#shadow)"
          />
          
          {/* Handle */}
          <rect 
            x="47" 
            y="68" 
            width="6" 
            height="15" 
            fill="url(#gradient4)"
            stroke="#B8860B"
            strokeWidth="0.5"
            rx="3"
            filter="url(#shadow)"
          />
          
          {/* Pommel with glow */}
          <circle 
            cx="50" 
            cy="88" 
            r="8" 
            fill="url(#gradient5)"
            stroke="#B8860B"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          
          {/* Heart Symbol with glow */}
          <path 
            d="M50 82 C46 78, 42 82, 42 86 C42 90, 50 96, 50 96 C50 96, 58 90, 58 86 C58 82, 54 78, 50 82 Z" 
            fill="#FFD700"
            opacity="0.9"
            filter="url(#glow)"
          />
          
          {/* Decorative Elements with glow */}
          <circle cx="40" cy="64" r="2" fill="#FFD700" opacity="0.8" filter="url(#glow)" />
          <circle cx="60" cy="64" r="2" fill="#FFD700" opacity="0.8" filter="url(#glow)" />
          <circle cx="50" cy="72" r="1.5" fill="#FFD700" opacity="0.6" filter="url(#glow)" />
          
          {/* Additional decorative elements */}
          <path d="M35 64 L30 64 L30 68 L35 68 Z" fill="#FFD700" opacity="0.6" />
          <path d="M65 64 L70 64 L70 68 L65 68 Z" fill="#FFD700" opacity="0.6" />
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