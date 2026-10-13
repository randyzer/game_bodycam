import type { MetadataRoute } from 'next';
import { allRoutes, discoverContent } from '@/lib/content';
import { siteOrigin } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  const docs = discoverContent(); const origin = siteOrigin();
  return allRoutes(docs).map(path => ({ url: `${origin}${path}`, ...(docs.find(item => path === `/${item.slug}/`)?.publishedAt ? { lastModified: docs.find(item => path === `/${item.slug}/`)!.publishedAt } : {}) }));
}
