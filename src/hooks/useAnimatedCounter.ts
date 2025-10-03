import { useState, useEffect, useRef } from 'react'

interface UseAnimatedCounterOptions {
  duration?: number
  startOnMount?: boolean
  easeOut?: boolean
}

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 2000, startOnMount = true, easeOut = true } = options
  const [currentValue, setCurrentValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  const animate = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    setIsAnimating(true)
    const startValue = currentValue
    const difference = targetValue - startValue
    const startTime = Date.now()
    startTimeRef.current = startTime

    const animateFrame = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easedProgress = easeOut ? easeOutCubic(progress) : progress
      const newValue = startValue + (difference * easedProgress)
      
      setCurrentValue(Math.floor(newValue))
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFrame)
      } else {
        setCurrentValue(targetValue)
        setIsAnimating(false)
      }
    }

    animationRef.current = requestAnimationFrame(animateFrame)
  }

  useEffect(() => {
    if (startOnMount) {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => {
        animate()
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!startOnMount) {
      animate()
    }
  }, [targetValue])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    value: currentValue,
    isAnimating,
    animate
  }
}
