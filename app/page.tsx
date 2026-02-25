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

// Helper to fetch lean product data
async function getSectionProducts(options: {
  take?: number,
  where?: any,
  orderBy?: any
} = {}) {
  try {
    return await prisma.product.findMany({
      take: options.take || 8,
      where: options.where,
      orderBy: options.orderBy || { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        category: true,
        // originalPrice: true, // Add if these exist in DB
        // badge: true,
        // rating: true
      }
    }) as any[]
  } catch (error) {
    console.error('Failed to fetch section products:', error)
    return []
  }
}

export default async function Home() {
  console.time('HomeDataFetch');

  // Define categories early
  const streetwearCategories = ['mens-shirts', 'womens-shirts', 'shirts', 'trousers-shorts', 'mens-tshirt', 'womens-tshirt']
  const bundleCategories = ['bundles-combo', 'bundle', 'bundles']

  // Fetch all sections in parallel
  const [newArrivals, bestSellers, streetwear, bundles, accessories] = await Promise.all([
    getSectionProducts({ take: 4 }),
    getSectionProducts({ take: 8, orderBy: { name: 'asc' } }),
    getSectionProducts({
      take: 8,
      where: { category: { in: streetwearCategories } }
    }),
    getSectionProducts({
      take: 4,
      where: { category: { in: bundleCategories } }
    }),
    getSectionProducts({
      take: 4,
      where: { category: 'caps-hats' }
    })
  ]);

  console.timeEnd('HomeDataFetch');

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
