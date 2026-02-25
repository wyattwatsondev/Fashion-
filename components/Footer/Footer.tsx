'use client'

import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/hutlemoblogo.png"
                alt="HustleMob Logo"
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Excellence in streetwear. Join the community and wear your hustle with pride.
            </p>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="mailto:Hustlemoblifestyle1@gmail.com" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                <Mail className="w-4 h-4" />
                Hustlemoblifestyle1@gmail.com
              </a>
              <a href="https://wa.me/17737105399" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                <Phone className="w-4 h-4" />
                (773) 710-5399
              </a>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=100077499841358" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-brand-red text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/glewis_hustlemob/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-brand-red text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-12">
            <h3 className="text-white font-heading font-semibold text-base mb-6 underline decoration-brand-red decoration-2 underline-offset-8">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-brand-red transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-red rounded-full" />
                  All Products
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-brand-red transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-red rounded-full" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-brand-red transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-red rounded-full" />
                  Our Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:pl-12">
            <h3 className="text-white font-heading font-semibold text-base mb-6 underline decoration-brand-red decoration-2 underline-offset-8">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="hover:text-brand-red transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-red rounded-full" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-brand-red transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-red rounded-full" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-red transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-red rounded-full" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            © 2026 HustleMob. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <Link href="/policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-red transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
