import { MetadataRoute } from 'next'
import inventory from '@/data/inventory.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthguard-ecosystem.com'

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/departments',
    '/products',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const departmentRoutes = inventory.departments.filter(d => d.isActive).map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const productRoutes = inventory.products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...departmentRoutes, ...productRoutes]
}
