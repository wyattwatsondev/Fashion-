'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import React from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fashion Enthusiast',
    content:
      'The quality of the products is incredible! I love how stylish and comfortable everything is. The HustleMob lifestyle is real.',
    rating: 5,
    image: '/ProductImages/91.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Daily Runner',
    content:
      'Best online shopping experience ever. Fast shipping, great selection, and the fit is absolutely perfect for my active lifestyle!',
    rating: 5,
    image: '/ProductImages/92.jpg',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    content:
      'Perfect fit and excellent quality. The prices are reasonable and the selection of hoodies and caps is just fantastic.',
    rating: 5,
    image: '/ProductImages/90.jpg',
  },
  {
    id: 4,
    name: 'James & Malik',
    role: 'Regular Customers',
    content:
      'We have been loyal customers for over a year now. Never disappointed with our purchases! The bundle deals are unbeatable.',
    rating: 5,
    image: '/ProductImages/93.jpg',
  },
]

export function TestimonialsSection() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading title="Client Reviews" subtitle="See what our community are saying about their HustleMob experience" />

        {/* Testimonials Grid */}
        <ProductCarousel>
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0 : 0.6 }}
              className="group bg-[#F8F8F8] p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm sm:hover:shadow-2xl sm:transition-all sm:duration-500 sm:hover:-translate-y-2 flex flex-col items-center text-center h-full"
            >
              {/* Client Image */}
              <div className="relative w-16 h-16 sm:w-24 h-24 mb-4 sm:mb-6 ring-4 ring-red-50 group-hover:ring-brand-red/20 transition-all duration-500 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Quote Icon */}
              <div className="mb-3 sm:mb-4 text-red-100 group-hover:text-brand-red transition-colors duration-500">
                <Quote className="w-5 h-5 sm:w-8 sm:h-8 fill-current" />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 sm:mb-8 italic leading-relaxed line-clamp-4 flex-grow text-xs sm:text-base">
                "{testimonial.content}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 fill-brand-red text-brand-red"
                  />
                ))}
              </div>

              {/* Author */}
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-lg">{testimonial.name}</h4>
                <p className="text-[10px] sm:text-sm font-black text-brand-red uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </ProductCarousel>

        {/* Trust Badge / Footer Note */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-full shadow-sm text-gray-600 font-medium">
            <div className="flex -space-x-3">
              {[90, 91, 92, 93].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src={`/ProductImages/${i}.jpg`} alt="Client" fill className="object-cover" />
                </div>
              ))}
            </div>
            <span className="ml-2 font-bold tracking-tight">Joined by +10,000 happy customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
