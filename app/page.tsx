import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { HeroBanner } from '@/components/Hero/HeroBanner'
import { CategoryGrid } from '@/components/ProductGrid/CategoryGrid'
import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { FeaturedBanner } from '@/components/FeaturedBanner/FeaturedBanner'
import { GallerySection } from '@/components/Gallery/GallerySection'
import { ShirtsCollection } from '@/components/Collections/ShirtsCollection'
import { AccessoriesCollection } from '@/components/Collections/AccessoriesCollection'
import { BundlesCombo } from '@/components/Collections/BundlesCombo'
import { TestimonialsSection } from '@/components/Testimonials/TestimonialsSection'
import { BlogSection } from '@/components/Blog/BlogSection'
import { Newsletter } from '@/components/Newsletter/Newsletter'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { prisma } from '@/lib/prisma'
import { Product } from '@/types/product'

async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return products as unknown as Product[]
  } catch (error) {
    console.error('Failed to fetch products for landing page:', error)
    return []
  }
}

export default async function Home() {
  const allProducts = await getAllProducts()

  // ── NEW ARRIVALS: 4 products from ALL categories (newest first) ──────────
  const newArrivals = allProducts.slice(0, 4)

  // ── BEST SELLERS: 8 products from ALL categories mixed ───────────────────
  const bestSellers = allProducts.slice(4, 12).length > 0
    ? allProducts.slice(4, 12)
    : allProducts.slice(0, 8)

  // ── STREETWEAR COLLECTION: 8 products — shirts + trousers ────────────────
  const streetwearCategories = ['mens-shirts', 'womens-shirts', 'shirts', 'trousers-shorts', 'mens-tshirt', 'womens-tshirt']
  const streetwear = allProducts
    .filter(p => p.category && streetwearCategories.includes(p.category))
    .slice(0, 8)

  // ── BUNDLES COMBO: 4 products from bundles category ──────────────────────
  const bundleCategories = ['bundles-combo', 'bundle', 'bundles']
  const bundlesRaw = allProducts.filter(p => p.category && bundleCategories.includes(p.category)).slice(0, 4)
  // Fallback: use latest 4 if no bundles in DB
  const bundles = bundlesRaw.length > 0 ? bundlesRaw : allProducts.slice(0, 4)

  // ── ACCESSORIES: 4 products from caps-hats category only ─────────────────
  const capRaw = allProducts.filter(p => p.category === 'caps-hats').slice(0, 4)
  // Fallback: broader accessories if no caps
  const accessories = capRaw.length > 0
    ? capRaw
    : allProducts.filter(p => p.category && ['hoodies', 'jackets', 'shoes'].includes(p.category)).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <TopBar />
      <Navigation />

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroBanner />
        <CategoryGrid />

        {/* NEW ARRIVALS — 4 products, 1 row */}
        <section className="bg-gray-50">
          <ProductGrid title="NEW ARRIVALS" items={newArrivals} />
        </section>

        <GallerySection />

        <section className="w-full py-10 sm:py-12 lg:py-16 bg-gray-50 overflow-hidden">
          <FeaturedBanner />
        </section>

        {/* STREETWEAR COLLECTION — 8 products (shirts + trousers), 2 rows */}
        <ShirtsCollection products={streetwear} />

        {/* BEST SELLERS — 8 products all mixed, 2 rows */}
        <section className="bg-gray-50">
          <ProductGrid title="BEST SELLERS" items={bestSellers} />
        </section>

        {/* BUNDLES COMBO — 4 products, 1 row */}
        <BundlesCombo products={bundles} />

        {/* ACCESSORIES & MORE — 4 cap products, 1 row */}
        <AccessoriesCollection products={accessories} />

        <TestimonialsSection />
        <BlogSection />
        <Newsletter />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
