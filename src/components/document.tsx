import Link from 'next/link';
import type { ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { headings, headingId, type Document as GuideDocument } from '@/lib/content';
import { localePath } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { relatedGuides } from '@/lib/guide-items';
import { Faq, GuideCard, Illustration, SourceLink } from './primitives';
type AstNode = { type: string; tagName?: string; value?: string; children?: AstNode[]; properties?: Record<string, unknown> };
function addHeadingIds() {
  return (tree: AstNode) => { const seen = new Map<string, number>();
    const text = (node: AstNode): string => node.value ?? node.children?.map(text).join('') ?? '';
    function walk(node: AstNode) { if (node.tagName === 'h2') node.properties = { ...node.properties, id: headingId(text(node), seen) }; node.children?.forEach(walk); }
    walk(tree);
  };
}
export function DocumentPage({ doc, docs }: { doc: GuideDocument; docs: GuideDocument[] }) {
  const m = messages[doc.locale]; const outline = headings(doc.body); const related = relatedGuides(doc.locale, doc.slug, docs);
  return <article className="document container"><nav className="breadcrumbs" aria-label="Breadcrumbs"><Link href={localePath(doc.locale)}>Home</Link><span>/</span>{doc.slug === 'guides' ? <span aria-current="page">All guides</span> : <><Link href={localePath(doc.locale,'guides')}>Guides</Link><span>/</span><span aria-current="page">{doc.title}</span></>}</nav><div className="document-heading"><span className="category-badge">{doc.category}</span><h1>{doc.title}</h1><p>{doc.description}</p><div className="document-date">{m.updated}: <time dateTime={doc.publishedAt}>{doc.publishedAt}</time> · Sources linked below</div></div><Illustration className="document-cover"/><div className="document-columns"><div className="prose" data-mdx-body><MDXRemote source={doc.body} options={{ blockJS: true, mdxOptions: { rehypePlugins: [addHeadingIds] } }} components={{ GuideLink: ({ slug, children }: { slug: string; children: ReactNode }) => <Link href={localePath(doc.locale,slug)}>{children}</Link>, SourceLink }}/></div><aside className="document-aside"><nav className="toc" aria-label={m.toc}><p>{m.toc}</p><ul>{outline.map(item => <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>)}</ul></nav></aside></div>{doc.faq.length>0 && <Faq locale={doc.locale} items={doc.faq}/ >}{related.length>0 && <section className="related"><p className="eyebrow">NEXT READING</p><h2>{m.related}</h2><div className="grid-three">{related.map(item => <GuideCard locale={doc.locale} item={item} key={item.slug}/>)}</div></section>}</article>;
}
