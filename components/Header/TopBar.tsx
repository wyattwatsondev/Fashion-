'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function TopBar() {
  // Permanently visible per user preference
  const isVisible = true;


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-gray-800 text-white 
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
                7737105399
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate max-w-[110px] sm:max-w-none lowercase">
                Hustlemoblifestyle1@gmail.com
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}