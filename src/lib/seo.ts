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
  return {
    metadataBase: new URL(siteOrigin()),
    title: `${title} | Bodycam Wiki`, description,
    alternates: { canonical, languages: alternatePaths(slug, docs) },
    robots: { index: process.env.SITE_INDEXABLE === 'true', follow: true },
    openGraph: { title, description, url: canonical, type: slug && slug !== 'guides' ? 'article' : 'website', locale: 'en_US' },
  };
}
