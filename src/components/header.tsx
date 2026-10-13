'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { localePath, type Locale } from '@/lib/i18n';
import { Logo, SteamButton } from './primitives';
const links = [
  { label: 'All guides', slug: 'guides' },
  { label: 'System requirements', slug: 'guides/system-requirements' },
  { label: 'Modes & Zombies', slug: 'guides/zombies' },
  { label: 'Updates', slug: 'guides/updates' },
];
export function Header({ locale, slug }: { locale: Locale; slug: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="container header-inner"><Logo locale={locale}/><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.slug} className={slug === link.slug ? 'active' : ''} href={localePath(locale, link.slug)}>{link.label}</Link>)}</nav><div className="header-actions"><div className="header-steam"><SteamButton locale={locale}/></div><button className="hamburger" ref={toggle} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span/><span/><span/></button></div></div>
    <nav id="mobile-menu" className="container mobile-nav" hidden={!open} aria-label="Mobile navigation">{links.map(link => <Link key={link.slug} href={localePath(locale, link.slug)} onClick={() => setOpen(false)}>{link.label}</Link>)}<SteamButton locale={locale}/></nav>
  </header>;
}
