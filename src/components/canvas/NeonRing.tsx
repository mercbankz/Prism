"use client"

import { useEffect, useRef } from 'react'

interface NeonRingProps {
  className?: string
  size?: number
  glowIntensity?: number
  rotationSpeed?: number
  pulseSpeed?: number
}

export default function NeonRing({ 
  className = '',
  size = 400,
  glowIntensity = 0.6,
  rotationSpeed = 20,
  pulseSpeed = 3
}: NeonRingProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Create animated gradient
    const defs = svg.querySelector('defs')
    if (!defs) return

    // Remove existing gradients
    const existingGradients = defs.querySelectorAll('linearGradient, radialGradient')
    existingGradients.forEach(gradient => gradient.remove())

    // Create primary gradient
    const primaryGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    primaryGradient.setAttribute('id', 'primary-gradient')
    primaryGradient.setAttribute('x1', '0%')
    primaryGradient.setAttribute('y1', '0%')
    primaryGradient.setAttribute('x2', '100%')
    primaryGradient.setAttribute('y2', '100%')

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop1.setAttribute('offset', '0%')
    stop1.setAttribute('stop-color', '#7C5CFF')
    stop1.setAttribute('stop-opacity', '0.8')

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop2.setAttribute('offset', '50%')
    stop2.setAttribute('stop-color', '#00E6A8')
    stop2.setAttribute('stop-opacity', '0.6')

    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop3.setAttribute('offset', '100%')
    stop3.setAttribute('stop-color', '#2DD4BF')
    stop3.setAttribute('stop-opacity', '0.4')

    primaryGradient.appendChild(stop1)
    primaryGradient.appendChild(stop2)
    primaryGradient.appendChild(stop3)

    // Create glow gradient
    const glowGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient')
    glowGradient.setAttribute('id', 'glow-gradient')
    glowGradient.setAttribute('cx', '50%')
    glowGradient.setAttribute('cy', '50%')
    glowGradient.setAttribute('r', '50%')

    const glowStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    glowStop1.setAttribute('offset', '0%')
    glowStop1.setAttribute('stop-color', '#7C5CFF')
    glowStop1.setAttribute('stop-opacity', `${glowIntensity * 0.3}`)

    const glowStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    glowStop2.setAttribute('offset', '70%')
    glowStop2.setAttribute('stop-color', '#00E6A8')
    glowStop2.setAttribute('stop-opacity', `${glowIntensity * 0.2}`)

    const glowStop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    glowStop3.setAttribute('offset', '100%')
    glowStop3.setAttribute('stop-color', '#2DD4BF')
    glowStop3.setAttribute('stop-opacity', '0')

    glowGradient.appendChild(glowStop1)
    glowGradient.appendChild(glowStop2)
    glowGradient.appendChild(glowStop3)

    defs.appendChild(primaryGradient)
    defs.appendChild(glowGradient)

    // Create filter for glow effect
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', 'glow-filter')
    filter.setAttribute('x', '-50%')
    filter.setAttribute('y', '-50%')
    filter.setAttribute('width', '200%')
    filter.setAttribute('height', '200%')

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    feGaussianBlur.setAttribute('stdDeviation', '4')
    feGaussianBlur.setAttribute('result', 'coloredBlur')

    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
    feMergeNode1.setAttribute('in', 'coloredBlur')
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
    feMergeNode2.setAttribute('in', 'SourceGraphic')

    feMerge.appendChild(feMergeNode1)
    feMerge.appendChild(feMergeNode2)
    filter.appendChild(feGaussianBlur)
    filter.appendChild(feMerge)

    defs.appendChild(filter)

    // Animate the gradients
    const animateGradient = () => {
      const time = Date.now() / 1000
      const pulse = Math.sin(time * pulseSpeed) * 0.3 + 0.7
      
      stop1.setAttribute('stop-opacity', `${0.8 * pulse}`)
      stop2.setAttribute('stop-opacity', `${0.6 * pulse}`)
      stop3.setAttribute('stop-opacity', `${0.4 * pulse}`)
      
      glowStop1.setAttribute('stop-opacity', `${glowIntensity * 0.3 * pulse}`)
      glowStop2.setAttribute('stop-opacity', `${glowIntensity * 0.2 * pulse}`)
      
      requestAnimationFrame(animateGradient)
    }
    
    animateGradient()
  }, [glowIntensity, pulseSpeed])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`neon-ring ${className}`}
      style={{
        animation: `neon-rotate ${rotationSpeed}s linear infinite`
      }}
    >
      <defs>
        {/* Gradients and filters will be added dynamically */}
      </defs>
      
      {/* Background glow */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 20}
        fill="url(#glow-gradient)"
        opacity={0.3}
      />
      
      {/* Main ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 40}
        fill="none"
        stroke="url(#primary-gradient)"
        strokeWidth="3"
        filter="url(#glow-filter)"
        opacity={0.8}
      />
      
      {/* Inner ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 80}
        fill="none"
        stroke="url(#primary-gradient)"
        strokeWidth="2"
        filter="url(#glow-filter)"
        opacity={0.6}
      />
      
      {/* Accent dots */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * Math.PI / 180
        const x = size / 2 + Math.cos(angle) * (size / 2 - 60)
        const y = size / 2 + Math.sin(angle) * (size / 2 - 60)
        
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="url(#primary-gradient)"
            filter="url(#glow-filter)"
            opacity={0.9}
          />
        )
      })}
      
      {/* Central core */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r="8"
        fill="url(#primary-gradient)"
        filter="url(#glow-filter)"
        opacity={0.7}
      />
    </svg>
  )
}
