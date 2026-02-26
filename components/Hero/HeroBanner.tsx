'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set a target date (e.g., 5 days from now for demo)
    const target = new Date()
    target.setDate(target.getDate() + 5)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = target.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
<section className="relative w-full min-h-[500px] lg:h-[80vh] flex items-center 
bg-gradient-to-br from-[#fff8f9] via-[#fff1f2] to-[#ffffff] 
overflow-hidden py-8 lg:py-0 px-4 sm:px-6 lg:px-28">     {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-brand-red/5 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] bg-black/5 blur-[100px] rounded-full z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-20">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left items-center lg:items-start"
        >
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-black font-bold tracking-[0.2em] uppercase text-xs sm:text-base flex items-center gap-3">
              HustleMob - Lifestyle <span className="h-0.5 w-8 sm:w-12 bg-brand-red"></span>
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading leading-tight lg:leading-[0.9] mt-4">
              Unleashing <br />
              <span className="text-brand-red italic">Streetwear</span> <br />
              <span className="font-sans font-black uppercase text-black">brilliance</span>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 lg:pt-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-black hover:bg-brand-red text-white uppercase font-black tracking-widest px-6 sm:px-7 h-11 sm:h-12 rounded-full transition-all duration-300 shadow-xl hover:shadow-brand-red/20 active:scale-95 text-xs sm:text-sm"
            >
              Shop Collection
            </Link>

            <Link
              href="/blogs"
              className="inline-flex items-center justify-center border-2 border-black hover:border-brand-red hover:text-brand-red uppercase font-black tracking-widest px-6 sm:px-7 h-11 sm:h-12 rounded-full transition-all duration-300 active:scale-95 text-xs sm:text-sm"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Right Visual - Centered and smaller on mobile */}
        <div className="relative h-[250px] sm:h-[400px] lg:h-full w-full flex items-center justify-center order-last lg:order-none">
          {/* Background Gradient Glow */}
          <div className="absolute inset-0 bg-brand-red/5 blur-[80px] sm:blur-[120px] rounded-full z-0" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[70%] sm:w-[80%] lg:w-full h-full z-10"
          >
            <Image
              src="/55-removebg-preview.png"
              alt="HustleMob Featured"
              fill
              className="object-contain lg:object-cover sm:scale-110 lg:scale-110"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Subtle background texture or grid */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
    </section>
  )
}
