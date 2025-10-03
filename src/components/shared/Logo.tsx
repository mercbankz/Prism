"use client"

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'gold'
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

export function Logo({ 
  size = 'md', 
  variant = 'default', 
  className = '',
  animated = false 
}: LogoProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark' || theme === 'system'

  const LogoComponent = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wolf Head Geometric Design */}
      <defs>
        {/* Gold gradient for dark mode */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        
        {/* White gradient for light mode */}
        <linearGradient id="white-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>

        {/* Primary gradient */}
        <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="100%" stopColor="#00E6A8" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Wolf Head Outline */}
      <path
        d="M20 35 Q15 25 25 20 Q35 15 50 20 Q65 15 75 20 Q85 25 80 35 Q85 45 80 55 Q75 65 65 70 Q55 75 50 80 Q45 75 35 70 Q25 65 20 55 Q15 45 20 35 Z"
        fill={variant === 'white' ? 'url(#white-gradient)' : 
              variant === 'gold' ? 'url(#gold-gradient)' : 
              isDark ? 'url(#gold-gradient)' : 'url(#primary-gradient)'}
        stroke={variant === 'white' ? '#000000' : 
                variant === 'gold' ? '#FFD700' : 
                isDark ? '#FFD700' : '#7C5CFF'}
        strokeWidth="2"
        filter={animated ? 'url(#glow)' : undefined}
      />

      {/* Wolf Eyes */}
      <circle
        cx="35"
        cy="40"
        r="3"
        fill={variant === 'white' ? '#000000' : '#FFFFFF'}
        opacity="0.8"
      />
      <circle
        cx="65"
        cy="40"
        r="3"
        fill={variant === 'white' ? '#000000' : '#FFFFFF'}
        opacity="0.8"
      />

      {/* Wolf Snout */}
      <ellipse
        cx="50"
        cy="60"
        rx="8"
        ry="6"
        fill={variant === 'white' ? '#000000' : 
              variant === 'gold' ? '#FFD700' : 
              isDark ? '#FFD700' : '#7C5CFF'}
        opacity="0.7"
      />

      {/* Wolf Ears */}
      <path
        d="M30 30 Q25 20 30 15 Q35 20 30 30"
        fill={variant === 'white' ? 'url(#white-gradient)' : 
              variant === 'gold' ? 'url(#gold-gradient)' : 
              isDark ? 'url(#gold-gradient)' : 'url(#primary-gradient)'}
        stroke={variant === 'white' ? '#000000' : 
                variant === 'gold' ? '#FFD700' : 
                isDark ? '#FFD700' : '#7C5CFF'}
        strokeWidth="1.5"
      />
      <path
        d="M70 30 Q75 20 70 15 Q65 20 70 30"
        fill={variant === 'white' ? 'url(#white-gradient)' : 
              variant === 'gold' ? 'url(#gold-gradient)' : 
              isDark ? 'url(#gold-gradient)' : 'url(#primary-gradient)'}
        stroke={variant === 'white' ? '#000000' : 
                variant === 'gold' ? '#FFD700' : 
                isDark ? '#FFD700' : '#7C5CFF'}
        strokeWidth="1.5"
      />

      {/* Inner ear details */}
      <path
        d="M30 25 Q28 20 30 18 Q32 20 30 25"
        fill={variant === 'white' ? '#000000' : '#000000'}
        opacity="0.3"
      />
      <path
        d="M70 25 Q72 20 70 18 Q68 20 70 25"
        fill={variant === 'white' ? '#000000' : '#000000'}
        opacity="0.3"
      />
    </svg>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoComponent />
      </motion.div>
    )
  }

  return <LogoComponent />
}

export default Logo
