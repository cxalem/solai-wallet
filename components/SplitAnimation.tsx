"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function SplitAnimation() {
  const [animate, setAnimate] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Get container dimensions for proper centering
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    // Animation timing
    const interval = setInterval(() => {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 3000)
    }, 4000)

    // Initial animation
    setAnimate(true)
    setTimeout(() => setAnimate(false), 3000)

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  // Calculate center based on actual container dimensions
  const centerX = dimensions.width / 2;
  // Position the main coin higher by offsetting from center.
  const verticalOffset = dimensions.height * 0.15; // 15% higher than center.
  const centerY = dimensions.height / 2 - verticalOffset;
  const radius = Math.min(dimensions.width, dimensions.height) * 0.25; // Responsive radius.

  // Calculate positions for the split coins.
  const positions = {
    main: { x: centerX, y: centerY },
    left: { x: centerX - radius, y: centerY + radius * 0.8 },
    bottom: { x: centerX, y: centerY + radius },
    right: { x: centerX + radius, y: centerY + radius * 0.8 },
  }

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      {dimensions.width > 0 && (
        <>
          {/* Main USDC coin */}
          <motion.div
            className="absolute z-10"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              transform: "translate(-50%, -50%)", // Center the element on its position.
            }}
            animate={animate ? { y: -30 } : { y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-2xl">USDC</span>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-300"
                animate={{ scale: animate ? [1, 1.2, 1.2] : 1, opacity: animate ? [1, 0.8, 0] : 1 }}
                transition={{ duration: 1, times: [0, 0.5, 1] }}
              />
            </div>
          </motion.div>

          {/* Left split coin */}
          <motion.div
            className="absolute z-10"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              transform: "translate(-50%, -50%)", // Center the element on its position againz.
            }}
            animate={
              animate
                ? {
                    x: positions.left.x - positions.main.x,
                    y: positions.left.y - positions.main.y,
                    opacity: [0, 1],
                    scale: [0, 1],
                  }
                : {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold">40%</span>
            </div>
          </motion.div>

          {/* Bottom split coin */}
          <motion.div
            className="absolute z-10"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              transform: "translate(-50%, -50%)", // Center the element on its position again.
            }}
            animate={
              animate
                ? {
                    x: positions.bottom.x - positions.main.x,
                    y: positions.bottom.y - positions.main.y,
                    opacity: [0, 1],
                    scale: [0, 1],
                  }
                : {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }
            }
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold">30%</span>
            </div>
          </motion.div>

          {/* Right split coin */}
          <motion.div
            className="absolute z-10"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              transform: "translate(-50%, -50%)", // Center the element on its position againnn.
            }}
            animate={
              animate
                ? {
                    x: positions.right.x - positions.main.x,
                    y: positions.right.y - positions.main.y,
                    opacity: [0, 1],
                    scale: [0, 1],
                  }
                : {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }
            }
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold">30%</span>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
