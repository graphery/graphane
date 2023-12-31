import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/observe.resize.script.js';
const URL           = '/test/plugins/observe.resize/cases/';
const FOLDER        = './test/plugins/observe.resize/cases/';
const pre           = `<svg viewBox="0 0 100 100" width="100" height="100"> <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line> <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line> </svg>`;
const pos           = `<svg viewBox="0 0 100 100" width="50" height="50"> <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line> <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line> </svg>`;
const results       = {
  case01       : pre,
  case01_after : pos,
  case02       : pre,
  case02_after : pos,
  case03       : pre,
  case03_after : pos,
  case04       : pre,
  case04_after : pos,
}

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT_LIB }&imp=${ IMPORT_PLUGIN }`);
    });

    test('compare source code result', async ({page}) => {
      const result = page.locator('#result');
      await expect(result).toHaveText(results[code]);
    });

    test('compare image', async ({page}) => {
      const show = page.locator('#show svg');
      await expect(show).toHaveScreenshot()
    });

    test('run action', async ({page}) => {
      const run = page.locator('#change');
      await run.click();
      await wait(500);
      const result = page.locator('#result');
      await expect(result).toHaveText(results[code + '_after']);
      const check = page.locator('#check');
      await expect(check).toHaveText('ok');
    });

    test('compare image after run action', async ({page}) => {
      const run = page.locator('#change');
      await run.click();
      await wait(500);
      const show = page.locator('#show svg');
      await expect(show).toHaveScreenshot()
    });

  });
}
