export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export function localePath(_locale: Locale, slug = ''): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}/` : '/';
}
export function parsePath(path: string[] = []): { locale: Locale; slug: string } | null {
  if (path.some(part => !/^[a-z0-9-]+$/.test(part))) return null;
  if (path[0] === 'en') return null;
  if (path.length && path[0] !== 'guides') return null;
  return { locale: 'en', slug: path.join('/') };
}
