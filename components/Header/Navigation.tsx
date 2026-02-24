'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { useFashionStore } from '@/lib/store'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: "Men's shirts", href: '/products?category=mens-shirts' },
  { name: "Women's shirts", href: '/products?category=womens-shirts' },
  { name: 'Shoes', href: '/products?category=shoes' },
  { name: 'Caps & Hats', href: '/products?category=caps-hats' },
  { name: 'Hoodies', href: '/products?category=hoodies' },
  { name: 'Jackets', href: '/products?category=jackets' },
]

export function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { cart, setCartOpen } = useFashionStore()
  const searchRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true)
        try {
          const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&limit=5&skip=0`)
          const data = await res.json()
          setSearchResults(data.products || [])
          setShowResults(true)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Close search results on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
      setIsOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 uppercase ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/hutlemoblogo.png"
              alt="YourStore Logo"
              width={140}
              height={40}
              priority
              className="h-8 sm:h-12 w-auto object-cover"
            />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-[10px] font-bold text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Desktop only */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-xs relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setShowResults(true)}
                  className="bg-transparent outline-none text-[12px] font-bold flex-1 text-gray-800 placeholder-gray-500"
                />
                <button type="submit">
                  {isSearching ? <Loader2 className="w-4 h-4 text-gray-400 ml-2 animate-spin" /> : <Search className="w-4 h-4 text-gray-400 ml-2" />}
                </button>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden py-2 min-w-[280px]">
                  {isSearching && searchResults.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => {
                            setShowResults(false)
                            setSearchQuery('')
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-black truncate uppercase">{product.name}</p>
                            <p className="text-[10px] text-brand-red font-bold uppercase">{product.category}</p>
                          </div>
                          <p className="text-[11px] font-bold">${product.price}</p>
                        </Link>
                      ))}
                      <Link
                        href={`/products?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setShowResults(false)}
                        className="block px-4 py-2 text-center text-[10px] font-bold text-gray-500 hover:text-black border-t border-gray-100 mt-1 uppercase"
                      >
                        See all results
                      </Link>
                    </>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No products found</div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Button>



            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-[11px] font-bold text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm flex-1 text-gray-800 placeholder-gray-500"
                />
                <button type="submit">
                  <Search className="w-4 h-4 text-gray-400 ml-2" />
                </button>
              </form>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
