'use client'

import React, { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  rotationSpeed: number
  fallSpeed: number
  horizontalSpeed: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle'
}

interface ConfettiAnimationProps {
  isActive: boolean
  onComplete?: () => void
  duration?: number
  pieceCount?: number
}

/**
 * CONFETTI ANIMATION COMPONENT
 * 
 * A celebratory confetti animation using Joidu's ADHD-friendly color palette.
 * Creates a joyful, rewarding experience when users complete onboarding.
 * The animation erupts from the center-top and gracefully falls while fading,
 * using colors that are vibrant but not overwhelming for ADHD users.
 * 
 * DESIGN PRINCIPLES:
 * - Uses only Joidu brand colors (no grays) for brand consistency
 * - Mixed shapes (circles, squares, triangles) for visual interest
 * - Smooth, natural physics-based falling animation
 * - Gentle fade-out to avoid harsh disappearance
 * - Full-screen coverage for maximum celebration impact
 * - Respects reduced motion preferences for accessibility
 * 
 * JOIDU COLOR PALETTE (No grays):
 * - Light Blue: #cae9ef, Dark Blue: #98e1ea
 * - Light Yellow: #fef7d6, Dark Yellow: #f7e98e
 * - Light Red: #efc7c2, Dark Red: #f4b7ae
 * - Light Purple: #e6e1f4, Dark Purple: #c8bfef
 * - Light Orange: #f9dac5, Dark Orange: #f9c075
 * - Light Green: #ddede3, Dark Green: #a8e2bb
 * - Primary Orange: #fa772c, Primary Blue: #2847ef
 */
export default function ConfettiAnimation({
  isActive,
  onComplete,
  duration = 2000,
  pieceCount = 50
}: ConfettiAnimationProps) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])
  const [animationComplete, setAnimationComplete] = useState(false)

  // Joidu color palette (excluding grays)
  const joiduColors = [
    '#cae9ef', // Light Blue
    '#98e1ea', // Dark Blue
    '#fef7d6', // Light Yellow
    '#f7e98e', // Dark Yellow
    '#efc7c2', // Light Red
    '#f4b7ae', // Dark Red
    '#e6e1f4', // Light Purple
    '#c8bfef', // Dark Purple
    '#f9dac5', // Light Orange
    '#f9c075', // Dark Orange
    '#ddede3', // Light Green
    '#a8e2bb', // Dark Green
    '#fa772c', // Primary Orange
    '#2847ef'  // Primary Blue
  ]

  const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle']

  /**
   * Generate random confetti pieces
   */
  const generateConfetti = (): ConfettiPiece[] => {
    const pieces: ConfettiPiece[] = []
    
    for (let i = 0; i < pieceCount; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth, // Spread across full width
        y: -50 - (Math.random() * 100), // Start above screen
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8, // Random rotation direction and speed
        fallSpeed: 2 + Math.random() * 4, // Varied fall speeds
        horizontalSpeed: (Math.random() - 0.5) * 2, // Slight horizontal drift
        color: joiduColors[Math.floor(Math.random() * joiduColors.length)],
        size: 8 + Math.random() * 8, // 8-16px size range
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      })
    }
    
    return pieces
  }

  /**
   * Initialize confetti when animation starts
   */
  useEffect(() => {
    if (isActive && !animationComplete) {
      setConfettiPieces(generateConfetti())
      
      // Auto-complete after duration
      const timer = setTimeout(() => {
        setAnimationComplete(true)
        if (onComplete) {
          onComplete()
        }
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isActive, duration, onComplete, animationComplete, pieceCount])

  /**
   * Animation loop for confetti movement
   */
  useEffect(() => {
    if (!isActive || animationComplete) return

    const animationInterval = setInterval(() => {
      setConfettiPieces(prevPieces => 
        prevPieces.map(piece => ({
          ...piece,
          y: piece.y + piece.fallSpeed,
          x: piece.x + piece.horizontalSpeed,
          rotation: piece.rotation + piece.rotationSpeed
        })).filter(piece => piece.y < window.innerHeight + 100) // Remove pieces that fall off screen
      )
    }, 16) // ~60fps

    return () => clearInterval(animationInterval)
  }, [isActive, animationComplete])

  /**
   * Reset animation state when inactive
   */
  useEffect(() => {
    if (!isActive) {
      setConfettiPieces([])
      setAnimationComplete(false)
    }
  }, [isActive])

  /**
   * Render confetti piece based on shape
   */
  const renderConfettiPiece = (piece: ConfettiPiece) => {
    const opacity = Math.max(0, 1 - (piece.y / window.innerHeight)) // Fade as it falls
    
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${piece.x}px`,
      top: `${piece.y}px`,
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      backgroundColor: piece.color,
      opacity,
      transform: `rotate(${piece.rotation}deg)`,
      pointerEvents: 'none',
      zIndex: 9999
    }

    switch (piece.shape) {
      case 'circle':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              borderRadius: '50%'
            }}
          />
        )
      
      case 'square':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              borderRadius: '2px'
            }}
          />
        )
      
      case 'triangle':
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
          />
        )
      
      default:
        return null
    }
  }

  // Don't render anything if not active
  if (!isActive) return null

  return (
    <>
      {/* Accessibility: Respect reduced motion preferences */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .confetti-container {
            display: none;
          }
        }
      `}</style>
      
      <div 
        className="confetti-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden'
        }}
        role="presentation"
        aria-hidden="true"
      >
        {confettiPieces.map(renderConfettiPiece)}
      </div>
    </>
  )
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic confetti animation
 * const [showConfetti, setShowConfetti] = useState(false)
 * 
 * <ConfettiAnimation 
 *   isActive={showConfetti}
 *   onComplete={() => {
 *     setShowConfetti(false)
 *     navigateToNextScreen()
 *   }}
 * />
 * 
 * // Custom duration and piece count
 * <ConfettiAnimation
 *   isActive={true}
 *   duration={3000}
 *   pieceCount={75}
 *   onComplete={() => console.log('Celebration complete!')}
 * />
 * 
 * // Integration with button press
 * const handleFinish = () => {
 *   setShowConfetti(true)
 *   // onComplete callback will handle navigation
 * }
 * 
 * DESIGN CONSIDERATIONS:
 * 
 * 1. **ADHD-Friendly Colors**: Uses only Joidu brand colors that are
 *    vibrant but not overwhelming or jarring
 * 
 * 2. **Natural Physics**: Confetti falls with realistic gravity and
 *    rotation for a satisfying visual experience
 * 
 * 3. **Performance Optimized**: Uses efficient animation techniques
 *    and cleans up pieces that fall off-screen
 * 
 * 4. **Accessibility**: Respects reduced motion preferences and
 *    includes proper ARIA attributes
 * 
 * 5. **Celebration Psychology**: Creates a moment of joy and accomplishment
 *    that reinforces positive feelings about completing onboarding
 * 
 * ANIMATION DETAILS:
 * 
 * - **Eruption Pattern**: Pieces start from random positions across top of screen
 * - **Fall Physics**: Varied fall speeds (2-6px per frame) for natural movement
 * - **Horizontal Drift**: Slight side-to-side movement for realism
 * - **Rotation**: Each piece rotates at different speeds and directions
 * - **Fade Effect**: Pieces gradually fade out as they fall
 * - **Shape Variety**: Mix of circles, squares, and triangles
 * - **Color Distribution**: Random selection from full Joidu palette
 * 
 * PERFORMANCE NOTES:
 * 
 * - Uses requestAnimationFrame-equivalent timing (16ms intervals)
 * - Automatically removes off-screen pieces to prevent memory leaks
 * - Optimized rendering with CSS transforms
 * - Non-blocking animation that doesn't interfere with user interaction
 */