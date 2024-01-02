import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT            = '/src';
const IMPORT_LIB      = ROOT + '/lib/gsvg.script.js';
const IMPORT_TEMPLATE = ROOT + '/plugins/template.engine.script.js';
const IMPORT_PLUGIN   = ROOT + '/plugins/intersection.script.js';
const URL             = '/test/plugins/intersection/cases/';
const FOLDER          = './test/plugins/intersection/cases/';

const dir = await opendir(FOLDER);
for await (const dirent of dir) {

  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));

  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT_LIB }&imp=${ IMPORT_TEMPLATE }&imp=${ IMPORT_PLUGIN }`);
      await wait(100);
    });

    test('compare image', async ({page}) => {
      const show = page.locator('#container');
      await expect(show).toHaveScreenshot()
    });

    test('compare image after middle scroll', async ({page}) => {
      await page.evaluate(_ => {
        const container = document.querySelector('#container');
        container.scroll(0, 300);
      });
      const component = page.locator('#container');
      await expect(component).toHaveScreenshot();
    });

    test('compare image after scroll', async ({page}) => {
      await page.evaluate(_ => {
        const container = document.querySelector('#container');
        container.scroll(0, 400);
      });
      const component = page.locator('#container');
      await expect(component).toHaveScreenshot();
    });

  });
}
