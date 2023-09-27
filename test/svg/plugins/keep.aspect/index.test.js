import { test, expect } from '@playwright/test';
import getName          from '../../../../tools/playwright-helper/getname.js';
import wait             from '../../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src/svg';
const IMPORT_LIB    = ROOT + '/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/gsvg.keep.aspect.script.js';
const URL           = '/test/svg/plugins/keep.aspect/cases/';
const FOLDER        = './test/svg/plugins/keep.aspect/cases/';

const results       = {
  case01       : '<svg viewBox="0 0 100 100" width="200" height="200" style="border: 1px solid black;"><text x="20" y="100" transform="scale( 0.5, 0.5)" style="font-family: sans-serif; font-size: 14px;">hello word</text></svg>',
  case01_after : '<svg viewBox="0 0 100 100" width="100" height="100" style="border: 1px solid black;"><text x="10" y="50" transform="scale( 1, 1)" style="font-family: sans-serif; font-size: 14px;">hello word</text></svg>',
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

    if (code === 'case01') {

      test('compare source code result', async ({page}) => {
        const result = page.locator('#result');
        await expect(result).toHaveText(results[code]);
      });

      test('run action', async ({page}) => {
        const run = page.locator('#change');
        await run.click();
        await wait(500);
        const result = page.locator('#result');
        await expect(result).toHaveText(results[code + '_after']);
      });

    }

    test('compare image', async ({page}) => {
      const show = page.locator('#show svg');
      await expect(show).toHaveScreenshot()
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
