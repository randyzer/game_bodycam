import Link from 'next/link';
import type { ReactNode } from 'react';
import { localePath, type Locale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import type { GuideItem } from '@/lib/guide-items';
export const steamUrl = 'https://store.steampowered.com/app/2406770/Bodycam/';
export function Logo({ locale }: { locale: Locale }) {
  return <Link className="logo" href={localePath(locale)} aria-label="Bodycam Wiki home"><img src="/favicon-32x32.png" width="32" height="32" alt="" /><span>BODYCAM<small>FIELD GUIDE</small></span></Link>;
}
export function SteamButton({ locale, primary = false }: { locale: Locale; primary?: boolean }) {
  return <a className={`button ${primary ? 'primary' : ''}`} href={steamUrl} target="_blank" rel="noopener noreferrer">{messages[locale].steam}<span aria-hidden="true"> ↗</span></a>;
}
export function SectionHeading({ label, title }: { label: string; title: string }) {
  return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2></div>;
}
export function Illustration({ className = '' }: { className?: string }) {
  return <img className={`illustration ${className}`} src="/images/bodycam-field.svg" width="1280" height="720" alt="Original abstract tactical field diagram, not a game screenshot" />;
}
export function GuideCard({ item, locale }: { item: GuideItem; locale: Locale }) {
  return <Link className="card guide-card" href={localePath(locale, item.slug)}><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><span className="card-action">{messages[locale].read} →</span></Link>;
}
export function Faq({ locale, items }: { locale: Locale; items: { question: string; answer: string }[] }) {
  const m = messages[locale];
  return <section className="faq" aria-labelledby="faq-heading"><div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="faq-heading">{m.faqTitle}</h2><p>{m.faqIntro}</p></div><div className="faq-list">{items.map(item => <details key={item.question}><summary>{item.question}<span className="chevron" aria-hidden="true" /></summary><div className="faq-answer">{item.answer}</div></details>)}</div></section>;
}
export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} ↗</a>;
}
