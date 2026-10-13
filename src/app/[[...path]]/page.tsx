import { notFound } from 'next/navigation';
import { discoverContent, allRoutes } from '@/lib/content';
import { parsePath } from '@/lib/i18n';
import { metadata } from '@/lib/seo';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Home } from '@/components/home';
import { DocumentPage } from '@/components/document';
export const dynamicParams = false;
export function generateStaticParams() { return allRoutes(discoverContent()).map(url => ({ path: url.split('/').filter(Boolean) })); }
type Props = { params: Promise<{ path?: string[] }> };
export async function generateMetadata({ params }: Props) {
  const route = parsePath((await params).path); if (!route) return { title: 'Page not found', robots: { index: false } };
  const docs = discoverContent(); const doc = docs.find(item => item.locale === route.locale && item.slug === route.slug);
  if (route.slug && !doc) return { title: 'Page not found', robots: { index: false } };
  return metadata(route.locale, route.slug, doc?.title ?? 'Bodycam guides, settings and modes', doc?.description ?? 'Independent Bodycam guides for PC players, with official sources for modes, system requirements, maps and updates.', docs);
}
export default async function Page({ params }: Props) {
  const route = parsePath((await params).path); if (!route) notFound();
  const docs = discoverContent(); const doc = docs.find(item => item.locale === route.locale && item.slug === route.slug); if (route.slug && !doc) notFound();
  return <><Header locale={route.locale} slug={route.slug}/><main id="main-content">{doc ? <DocumentPage doc={doc} docs={docs}/> : <Home locale={route.locale} docs={docs}/>}</main><Footer locale={route.locale}/></>;
}
