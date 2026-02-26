'use client'

import { CategoryCard } from './CategoryCard'
import categories from '@/data/categories.json'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

export function CategoryGrid() {
  return (
    <section className="w-full py-6 sm:py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">
      <SectionHeading title="Shop by Category" subtitle="Explore our curated collections across all major categories" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
        className="grid grid-cols-4 sm:grid-cols-4 gap-2 gap-y-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mt-6"
      >
        {categories.categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
