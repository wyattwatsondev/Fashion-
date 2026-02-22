"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductGrid/ProductCard'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import { Skeleton } from '@/components/ui/skeleton'

function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm">
            <Skeleton className="aspect-square rounded-[1.5rem] mb-4" />
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-5 w-full mb-3" />
            <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-10 w-full rounded-full" />
        </div>
    )
}

export function ProductListing() {
    const searchParams = useSearchParams()
    const categoryFilter = searchParams.get('category')
    const [dbProducts, setDbProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDbProducts = async () => {
            try {
                const res = await fetch('/api/products')
                const data = await res.json()
                setDbProducts(data)
            } catch (error) {
                console.error('Error fetching products from DB:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchDbProducts()
    }, [])

    // Only use products from the database
    const dbProductsFiltered = dbProducts

    const minPrice = searchParams.get('min_price')
    const maxPrice = searchParams.get('max_price')

    const filteredProducts = dbProductsFiltered.filter(p => {
        const matchesCategory = !categoryFilter || p.category === categoryFilter
        const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price
        const matchesMinPrice = !minPrice || price >= parseFloat(minPrice)
        const matchesMaxPrice = !maxPrice || price <= parseFloat(maxPrice)
        return matchesCategory && matchesMinPrice && matchesMaxPrice
    })

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-bold text-black">{filteredProducts.length}</span> products
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="text-sm font-bold bg-transparent border-none focus:ring-0 p-0 cursor-pointer">
                        <option>Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={`${product.id}-${index}`}
                                id={product.id}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                originalPrice={'originalPrice' in product ? product.originalPrice : undefined}
                                image={product.image}
                                badge={'badge' in product ? product.badge : undefined}
                                rating={'rating' in product ? product.rating : undefined}
                            />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No products found for this filter.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
