import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { discoverContent, allRoutes, headings } from '../src/lib/content';
import { localePath, parsePath } from '../src/lib/i18n';
import { alternatePaths } from '../src/lib/seo';
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
