import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/seo';
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_INDEXABLE === 'true';
  return { rules: { userAgent: '*', ...(indexable ? { allow: '/' } : { disallow: '/' }) }, sitemap: `${siteOrigin()}/sitemap.xml` };
}
