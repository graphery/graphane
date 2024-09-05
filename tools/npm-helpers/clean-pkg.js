import fs                from 'node:fs';
import path              from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from "node:module";

const require   = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('cleaning package.json');

// Define absolute paths for original pkg and temporary pkg.
const ORIG_PKG_PATH   = path.resolve(__dirname, '../../package.json');
const CACHED_PKG_PATH = path.resolve(__dirname, './cached-package.json');

// Obtain original `package.json` contents.
const pkgData = require(ORIG_PKG_PATH);

// Write/cache the original `package.json` data to `cached-package.json` file.
fs.writeFile(CACHED_PKG_PATH, JSON.stringify(pkgData), function (err) {
  if (err) throw err;
});

// Update the pkgData
delete pkgData.scripts;
delete pkgData.devDependencies;

// Overwrite original `package.json` with new data (i.e. minus the specific data).
fs.writeFile(ORIG_PKG_PATH, JSON.stringify(pkgData, null, 2), function (err) {
  if (err) throw err;
});

console.log('package.json cleaned');
