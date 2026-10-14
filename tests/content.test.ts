import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { discoverContent, allRoutes, headings } from '../src/lib/content';
import { localePath, parsePath } from '../src/lib/i18n';
import { alternatePaths, metadata, serializeStructuredData, structuredData } from '../src/lib/seo';
const valid = '---\ntitle: A real guide\ndescription: A complete guide for a first session.\ncategory: Guide\npublishedAt: "2026-10-14"\n---\n\n## First decision\n\nOriginal content.\n\n## First decision\n\nAnother decision.';
test('English-only canonical paths fail closed for unsupported locales and traversal', () => {
  assert.equal(localePath('en', 'guides/how-to-play'), '/guides/how-to-play/');
  assert.deepEqual(parsePath(['guides','how-to-play']), { locale:'en',slug:'guides/how-to-play' });
  assert.equal(parsePath(['fr','guides']), null); assert.equal(parsePath(['guides','..','private']), null);
});
test('a new English MDX adds one route and canonical alternate only', async () => {
  const temp = await mkdtemp(join(tmpdir(),'bodycam-mdx-'));
  try { await mkdir(join(temp,'en','guides'),{recursive:true}); await writeFile(join(temp,'en','guides','extra.mdx'),valid);
    const docs=discoverContent(temp); assert.equal(docs.length,1);
    assert.deepEqual(allRoutes(docs),['/','/guides/extra/']);
    assert.deepEqual(alternatePaths('guides/extra',docs),{en:'/guides/extra/','x-default':'/guides/extra/'});
  } finally { await rm(temp,{recursive:true,force:true}); }
});
test('invalid metadata cannot enter route discovery', async () => {
  const temp=await mkdtemp(join(tmpdir(),'bodycam-invalid-'));
  try { await mkdir(join(temp,'en','guides'),{recursive:true}); await writeFile(join(temp,'en','guides','bad.mdx'),'---\ntitle: Missing fields\n---\nContent'); assert.throws(()=>discoverContent(temp),/description/); }
  finally { await rm(temp,{recursive:true,force:true}); }
});
test('heading anchors are stable and collision-free', () => {
  assert.deepEqual(headings(valid.split('---')[2]),[{text:'First decision',id:'first-decision'},{text:'First decision',id:'first-decision-2'}]);
  const ids=headings('## Foo\n## Foo\n## Foo-2\n## Foo').map(h=>h.id); assert.equal(new Set(ids).size,ids.length);
});
test('new task guides have real routes and every GuideLink resolves', () => {
  const docs = discoverContent();
  const routes = new Set(allRoutes(docs));
  for (const slug of ['gameplay', 'controls', 'best-settings', 'zombies']) assert.ok(routes.has(`/guides/${slug}/`));
  for (const doc of docs) {
    for (const match of doc.body.matchAll(/<GuideLink slug="([^"]+)"/g)) {
      assert.ok(routes.has(localePath(doc.locale, match[1])), `${doc.slug} links to missing ${match[1]}`);
    }
  }
});
test('share metadata and guide list schema reflect published pages', () => {
  const docs = discoverContent();
  const pageMetadata = metadata('en', '', 'Bodycam guides', 'Practical game guides', docs);
  const images = pageMetadata.openGraph?.images;
  assert.ok(Array.isArray(images));
  assert.ok(images[0] && typeof images[0] === 'object' && 'url' in images[0]);
  assert.ok(String(images[0].url).endsWith('/opengraph-image'));
  assert.ok(pageMetadata.twitter && 'card' in pageMetadata.twitter);
  assert.equal(pageMetadata.twitter.card, 'summary_large_image');
  assert.equal(structuredData('guides/controls', docs), null);
  const schema = structuredData('guides', docs);
  assert.ok(schema);
  const data = JSON.parse(serializeStructuredData(schema)) as { '@graph': { '@type': string; numberOfItems?: number; itemListElement?: { url: string }[] }[] };
  const list = data['@graph'].find(item => item['@type'] === 'ItemList');
  assert.equal(list?.numberOfItems, docs.length - 1);
  assert.ok(list?.itemListElement?.some(item => item.url.endsWith('/guides/controls/')));
  assert.ok(list?.itemListElement?.some(item => item.url.endsWith('/guides/best-settings/')));
});
