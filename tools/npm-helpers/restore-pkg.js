import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from "node:module";

const require   = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('restoring package.json');

// Define absolute paths for original pkg and temporary pkg.
const ORIG_PKG_PATH   = path.resolve(__dirname, '../../package.json');
const CACHED_PKG_PATH = path.resolve(__dirname, './cached-package.json');

// Obtain original/cached contents from `cached-package.json`.
const pkgData = JSON.stringify(require(CACHED_PKG_PATH), null, 2) + '\n';

// Write data from `cached-package.json` back to original `package.json`.
fs.writeFile(ORIG_PKG_PATH, pkgData, function (err) {
  if (err) throw err;
});

// Delete the temporary `cached-package.json` file.
fs.unlink(CACHED_PKG_PATH, function (err) {
  if (err) throw err;
});

console.log('package.json restored');
