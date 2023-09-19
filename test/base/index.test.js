import { test, expect } from '@playwright/test';
import getName          from '../../tools/playwright-helper/getname.mjs';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/';
const URL           = ROOT + 'test/base/cases/';
const FOLDER        = './test/base/cases/';

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }`);
    });
   test('compare image', async ({page}) => {
      const show = page.locator('#case');
      await expect(show).toHaveScreenshot()
    });

  });
}
