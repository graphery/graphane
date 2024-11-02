import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/shapes.extra.script.js';
const URL           = '/test/plugins/shapes.extra/cases/';
const FOLDER        = './test/plugins/shapes.extra/cases/';

const results = {
  case01 : `<svg viewBox="0 0 100 100" width="100" height="100"> <path stroke="black" stroke-width="3" fill="red" d="M66.0727,11.1971L88.8029,33.9273L88.8029,66.0727L66.0727,88.8029L33.9273,88.8029L11.1971,66.0727L11.1971,33.9273L33.9273,11.1971Z"></path> <text x="50" y="52" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-weight="bold" style="font-size: 1.2em;">STOP</text> </svg>`,
  case02 : `<svg viewBox="0 0 100 100" width="100" height="100"> <path stroke="black" stroke-width="3" fill="red" d="M8,50a42,42,0,1,0,84,0a42,42,0,1,0,-84,0"></path> <rect x="20" y="40" width="60" height="20" fill="white"></rect> </svg>`,
  case03 : `<svg viewBox="0 0 200 500" width="200" height="200"> <path d="M100,150L108.8168,237.8647L195.1057,219.0983L114.2658,254.6353L158.7785,330.9017L100,265L41.2215,330.9017L85.7342,254.6353L4.8943,219.0983L91.1832,237.8647Z"></path> </svg>`,
  case04 : `<svg viewBox="0 0 200 200" width="200"> <path fill="none" stroke-width="1" stroke="black" id="path" d="M100,1L185.7365,149.5L14.2635,149.5ZM1,100a99,99,0,1,0,198,0a99,99,0,1,0,-198,0"></path> </svg>`,
  case05 : `<svg viewBox="0 0 200 200" width="200"> <circle fill="red" cx="100" cy="100" r="100"></circle> <path fill="none" stroke-width="1" stroke="black" id="path" d="M100,0L200,100L100,200L0,100Z"></path> </svg>`,
  case06 : `<svg viewBox="0 0 200 200" width="200"> <circle fill="red" cx="100" cy="100" r="100"></circle> <path fill="none" stroke-width="1" stroke="black" id="path" d="M100,0L195.1057,69.0983L158.7785,180.9017L41.2215,180.9017L4.8943,69.0983Z"></path> </svg>`,
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
      const show = page.locator('svg');
      await expect(show).toHaveScreenshot()
    });
  });
}
