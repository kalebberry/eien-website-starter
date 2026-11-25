import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const css = readFileSync('src/styles/vendors/koshi.css', 'utf8').replace(/\r\n/g, '\n');
assert.equal(createHash('sha256').update(css).digest('hex'), 'b9d5013b032b9f5e4afb522f04b82ce6c139fcbf4a8dda4f258388c82a7da5c9');
for (const dir of ['abstracts','base','themes','vendors','compositions','components','pages','utilities']) assert.ok(existsSync('src/styles/'+dir+'/index.css'), dir);
assert.ok(!existsSync('src/pages/playground.astro'));
assert.ok(!existsSync('src/styles/compositions/grid.css'));
console.log('Architecture checks passed');
