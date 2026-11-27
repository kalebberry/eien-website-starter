import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(p,'utf8');
test('generated typography covers every configured step', () => {
  const tokens = JSON.parse(read('src/design-tokens/tokens.json'));
  const css = read('src/styles/abstracts/font-sizes.css');
  for (const key of Object.keys(tokens.size.font)) assert.ok(css.includes('--fs-'+key+':'), key);
});
test('generated themes resolve semantic color aliases', () => {
  const css = read('src/styles/themes/theme.css');
  assert.ok(css.includes("[data-theme='light']"));
  assert.ok(css.includes("[data-theme='dark']"));
  assert.ok(!css.includes('{color.'));
});
