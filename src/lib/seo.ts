import type { Document } from './content';
import { localePath, type Locale } from './i18n';
import type { Metadata } from 'next';
export function siteOrigin(): string {
  const origin = new URL(process.env.SITE_URL ?? 'http://localhost:3000');
  if (!['http:', 'https:'].includes(origin.protocol)) throw new Error('SITE_URL must be an HTTP(S) URL');
  return origin.origin;
}
export function alternatePaths(slug: string, docs: Document[]): Record<string, string> {
  if (slug && !docs.some(doc => doc.slug === slug)) return {};
  return { en: localePath('en', slug), 'x-default': localePath('en', slug) };
}
export function metadata(locale: Locale, slug: string, title: string, description: string, docs: Document[]): Metadata {
  const canonical = localePath(locale, slug);
  const shareUrl = new URL('/opengraph-image', siteOrigin()).href;
  const shareImage = { url: shareUrl, width: 1200, height: 630, alt: 'Bodycam Field Guide' };
  return {
    metadataBase: new URL(siteOrigin()),
    title: `${title} | Bodycam Wiki`, description,
    alternates: { canonical, languages: alternatePaths(slug, docs) },
    robots: { index: process.env.SITE_INDEXABLE === 'true', follow: true },
    openGraph: { title, description, url: canonical, type: slug && slug !== 'guides' ? 'article' : 'website', locale: 'en_US', images: [shareImage] },
    twitter: { card: 'summary_large_image', title, description, images: [shareUrl] },
  };
}
export function structuredData(slug: string, docs: Document[]) {
  if (slug !== '' && slug !== 'guides') return null;
  const origin = siteOrigin();
  const site = { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'Bodycam Wiki', url: `${origin}/`, inLanguage: 'en' };
  if (slug === '') return { '@context': 'https://schema.org', '@graph': [site] };
  const guides = docs.filter(doc => doc.locale === 'en' && doc.slug !== 'guides');
  return { '@context': 'https://schema.org', '@graph': [site, {
    '@type': 'ItemList', name: 'Bodycam guides', numberOfItems: guides.length,
    itemListElement: guides.map((doc, index) => ({ '@type': 'ListItem', position: index + 1, name: doc.title, url: new URL(localePath('en', doc.slug), origin).href })),
  }] };
}
export function serializeStructuredData(data: NonNullable<ReturnType<typeof structuredData>>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
