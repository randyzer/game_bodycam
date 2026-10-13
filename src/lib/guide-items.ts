import type { Document } from './content';
import type { Locale } from './i18n';
export type GuideItem = { title: string; description: string; category: string; slug: string };
export function relatedGuides(locale: Locale, slug: string, docs: Document[]): GuideItem[] {
  const current = docs.find(doc => doc.locale === locale && doc.slug === slug);
  return docs.filter(doc => doc.locale === locale && doc.slug !== slug && doc.slug !== 'guides')
    .sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category) || a.title.localeCompare(b.title))
    .slice(0, 3).map(doc => ({ title: doc.title, description: doc.description, category: doc.category, slug: doc.slug }));
}
