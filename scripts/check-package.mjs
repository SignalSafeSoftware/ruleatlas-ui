import assert from 'node:assert/strict';
import console from 'node:console';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const npmLocation = process.platform === 'win32'
  ? 'node_modules/npm/bin/npm-cli.js'
  : '../lib/node_modules/npm/bin/npm-cli.js';
const npmCli = resolve(dirname(process.execPath), npmLocation);
assert.ok(statSync(npmCli).isFile(), 'The active Node installation must include its npm CLI');
const directory = mkdtempSync(join(tmpdir(), 'ruleatlas-ui-installed-'));
const [packed] = JSON.parse(execFileSync(process.execPath, [
  npmCli, 'pack', '--json', '--pack-destination', directory,
], { cwd: root, encoding: 'utf8' }));
assert.ok(packed.filename);
for (const version of ['18.3.1', '19.2.7']) {
  const consumer = mkdtempSync(join(directory, `react-${version}-`));
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({
    private: true,
    type: 'module',
    dependencies: {
      '@ruleatlas/ui': `file:${join(directory, packed.filename)}`,
      react: version,
      'react-dom': version,
    },
  }));
  execFileSync(process.execPath, [
    npmCli, 'install', '--ignore-scripts', '--package-lock=false', '--no-audit', '--no-fund',
  ], { cwd: consumer, stdio: 'pipe' });
  writeFileSync(join(consumer, 'smoke.mjs'), `
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  FileTypesTable, FileTypeBadge, DiscoveryMetricsTable, DirectoryExplorer, folderExcludeGlob,
} from '@ruleatlas/ui';
assert.equal(typeof DirectoryExplorer, 'function');
assert.equal(typeof DiscoveryMetricsTable, 'function');
assert.equal(folderExcludeGlob('src/lib'), 'src/lib/**');
assert.match(
  renderToStaticMarkup(createElement(FileTypesTable, { rows: [] })),
  /No file type mappings/,
);
assert.match(
  renderToStaticMarkup(createElement(FileTypeBadge, { language: 'Python' })),
  /Python/,
);
`);
  execFileSync(process.execPath, ['smoke.mjs'], { cwd: consumer, stdio: 'inherit' });
  console.log(`Installed ESM and server rendering passed: React ${version}`);
}
