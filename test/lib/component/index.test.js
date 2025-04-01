import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const IMPORT = ROOT + 'src/lib/component.script.js';
const URL    = ROOT + 'test/lib/component/cases/';
const FOLDER = './test/lib/component/cases/';

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT }`);
      await wait(1000);
    });

    test('compare image', async ({page}) => {
      const show = page.locator('my-component,my-icon');
      await expect(show).toHaveScreenshot()
    });

  });
}
