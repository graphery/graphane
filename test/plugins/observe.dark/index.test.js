import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/component/composer.js';
const IMPORT_PLUGIN = ROOT + '/plugins/observe.dark.script.js';
const URL           = '/test/plugins/observe.dark/cases/';
const FOLDER        = './test/plugins/observe.dark/cases/';

const results = {
  case01 : `<svg viewBox="0 0 100 100" width="100" height="100"> <style> .check { fill: #000; } :host(.dark) .check { fill: #fff; } </style> <rect x="10" y="10" width="80" height="80" class="check"></rect> </svg>`,
  case02 : `<svg viewBox="0 0 100 100" width="100" height="100"> <style> .check { fill: #000; } :host(.dark) .check { fill: #fff; } </style> <rect x="10" y="10" width="80" height="80" class="check"></rect> </svg>`,
  case03 : `<svg viewBox="0 0 100 100" width="100" height="100"> <style> .check { fill: #000; } :host(.dark) .check { fill: #fff; } </style> <rect x="10" y="10" width="80" height="80" class="check"></rect> </svg>`,
  case04 : `<svg viewBox="0 0 200 200" width="200"> <circle fill="red" cx="75" cy="100" r="50"></circle> <path fill="none" stroke-width="1" stroke="black" id="path" d="M23.0385,130A60,60,0,0,0,126.9615,70"></path> <text> <textPath href="#path" method="align">testing the path</textPath> </text> </svg>`,
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
      const show = page.locator('#show');
      await expect(show).toHaveScreenshot();
      await page.locator('#dark-mode').check();
      await expect(show).toHaveScreenshot();
    });
  });
}
