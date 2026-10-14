import assert from 'node:assert/strict';
import { discoverContent, allRoutes } from '../src/lib/content';
const base=process.env.VERIFY_BASE_URL ?? 'http://localhost:3000';
const origin=new URL(process.env.VERIFY_SITE_ORIGIN ?? base).origin;
const paths=allRoutes(discoverContent());
for(const core of ['/','/guides/','/guides/system-requirements/','/guides/updates/']) assert.ok(paths.includes(core),`Missing route: ${core}`);
for(const path of paths){
  const response=await fetch(new URL(path,base));assert.equal(response.status,200,path);
  const html=await response.text();
  assert.ok(html.includes(`href="${origin}${path}"`),`Canonical missing: ${path}`);
  assert.ok(html.includes(`content="${process.env.SITE_INDEXABLE==='true'?'index':'noindex'}, follow"`),`Index state: ${path}`);
  assert.ok(!/Quarry Field|Bomb Farm|quarry-board/.test(html),`Template residue: ${path}`);
  assert.ok(html.includes(`property="og:image" content="${origin}/opengraph-image"`),`Share image missing: ${path}`);
  if(path==='/') assert.ok(html.includes('"@type":"WebSite"'), 'Home WebSite schema missing');
  if(path==='/guides/') assert.ok(html.includes('"@type":"ItemList"'), 'Guide ItemList schema missing');
  if(['/guides/gameplay/','/guides/controls/','/guides/best-settings/','/guides/zombies/'].includes(path)) {
    assert.ok(html.includes('<table>'),`Practical reference table missing: ${path}`);
  }
}
const shareImage=await fetch(new URL('/opengraph-image',base));
assert.equal(shareImage.status,200,'Share image response');
assert.ok(shareImage.headers.get('content-type')?.startsWith('image/png'),'Share image must be PNG');
const sitemap=await (await fetch(new URL('/sitemap.xml',base))).text();
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).sort(),[...paths].sort());
const robots=await (await fetch(new URL('/robots.txt',base))).text();assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.equal((await fetch(new URL('/guides/not-a-real-guide/',base))).status,404);
assert.equal((await fetch(new URL('/fr/guides/',base))).status,404);
const alias=await fetch(new URL('/en/guides/',base),{redirect:'manual'});assert.equal(alias.status,308);
console.log(`Verified ${paths.length} pages, canonical, index state, sitemap and 404s.`);
