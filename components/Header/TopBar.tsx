'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true)

  // Auto hide after 8 seconds
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => setIsVisible(false), 8000)
    return () => clearTimeout(timer)
  }, [isVisible])

  // Show again when user scrolls to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-gray-900 text-white 
                     flex items-center justify-between 
                     h-9 sm:h-11
                     px-3 sm:px-8
                     text-[11px] sm:text-sm
                     shadow-md"
        >
          {/* Left Side */}
          <p className="font-medium truncate">
            Get 25% OFF on your first order!
          </p>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Phone */}
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                +1 (234) 567-890
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate max-w-[110px] sm:max-w-none">
                hello@example.com
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close top bar"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}