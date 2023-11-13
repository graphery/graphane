import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/keep.aspect.script.js';
const URL           = '/test/plugins/keep.aspect/cases/';
const FOLDER        = './test/plugins/keep.aspect/cases/';

const results = {
  case01       : `<svg viewBox="0 0 100 100" width="100" height="100" style="border: 1px solid black;"> <line x1="0" x2="100" y1="0" y2="100" stroke="lightgrey" stroke-width="1"></line> <line x1="100" x2="0" y1="0" y2="100" stroke="lightgrey" stroke-width="1"></line> <text x="10" y="50" dominant-baseline="middle" style="font-family: sans-serif; font-size: 14px;">hello word</text> </svg>`,
  case01_after : `<svg viewBox="0 0 100 100" width="150" height="150" style="border: 1px solid black;"> <line x1="0" x2="100" y1="0" y2="100" stroke="lightgrey" stroke-width="1"></line> <line x1="100" x2="0" y1="0" y2="100" stroke="lightgrey" stroke-width="1"></line> <text x="10" y="50" dominant-baseline="middle" style="font-family: sans-serif; font-size: 14px;" transform="scale(0.6666666666666666,0.6666666666666666)translate(5,25)">hello word</text> </svg>`,
  case02       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <circle cx="30" cy="30" r="10" fill="none" stroke-width="5"></circle> <circle cx="60" cy="60" r="10" fill="none" stroke-width="5"></circle> </g> </svg>`,
  case02_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <circle cx="30" cy="30" r="10" fill="none" stroke-width="5" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"></circle> <circle cx="60" cy="60" r="10" fill="none" stroke-width="5"></circle> </g> </svg>`,
  case03       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <rect x="20" y="20" width="10" height="10" fill="none" stroke-width="2"></rect> <rect x="60" y="60" width="10" height="10" fill="none" stroke-width="2"></rect> </g> </svg>`,
  case03_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <rect x="20" y="20" width="10" height="10" fill="none" stroke-width="2" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"></rect> <rect x="60" y="60" width="10" height="10" fill="none" stroke-width="2"></rect> </g> </svg>`,
  case04       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <path fill="none" stroke-width="2" d="M20,20l0,10l10,0l0,-10Z"></path> <path fill="none" stroke-width="2" d="M60,60l0,10l10,0l0,-10Z"></path> </g> </svg>`,
  case04_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <path fill="none" stroke-width="2" d="M20,20l0,10l10,0l0,-10Z" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"></path> <path fill="none" stroke-width="2" d="M60,60l0,10l10,0l0,-10Z"></path> </g> </svg>`,
  case05       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <polygon fill="none" stroke-width="2" points="20,20,20,30,30,30,30,20"></polygon> <polygon fill="none" stroke-width="2" points="60,60,60,70,70,70,70,60"></polygon> </g> </svg>`,
  case05_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <polygon fill="none" stroke-width="2" points="20,20,20,30,30,30,30,20" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"></polygon> <polygon fill="none" stroke-width="2" points="60,60,60,70,70,70,70,60"></polygon> </g> </svg>`,
  case06       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <line x1="20" y1="20" x2="20" y2="30" stroke-width="2"></line> <line x1="20" y1="30" x2="30" y2="30" stroke-width="2"></line> <line x1="30" y1="30" x2="30" y2="20" stroke-width="2"></line> <line x1="30" y1="20" x2="20" y2="20" stroke-width="2"></line> <line x1="60" y1="60" x2="60" y2="70" stroke-width="2"></line> <line x1="60" y1="70" x2="70" y2="70" stroke-width="2"></line> <line x1="70" y1="70" x2="70" y2="60" stroke-width="2"></line> <line x1="70" y1="60" x2="60" y2="60" stroke-width="2"></line> </g> </svg>`,
  case06_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <line x1="20" y1="20" x2="20" y2="30" stroke-width="2" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"></line> <line x1="20" y1="30" x2="30" y2="30" stroke-width="2" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,15)"></line> <line x1="30" y1="30" x2="30" y2="20" stroke-width="2" transform="scale(0.6666666666666666,0.6666666666666666)translate(15,10)"></line> <line x1="30" y1="20" x2="20" y2="20" stroke-width="2" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"></line> <line x1="60" y1="60" x2="60" y2="70" stroke-width="2"></line> <line x1="60" y1="70" x2="70" y2="70" stroke-width="2"></line> <line x1="70" y1="70" x2="70" y2="60" stroke-width="2"></line> <line x1="70" y1="60" x2="60" y2="60" stroke-width="2"></line> </g> </svg>`,
  case07       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g stroke-width="2" style="stroke: rgb(0, 0, 0);"> <line x1="20" y1="20" x2="20" y2="30"></line> <line x1="20" y1="30" x2="30" y2="30"></line> <line x1="30" y1="30" x2="30" y2="20"></line> <line x1="30" y1="20" x2="20" y2="20"></line> </g> <g stroke-width="2" style="stroke: rgb(0, 0, 0);"> <line x1="60" y1="60" x2="60" y2="70"></line> <line x1="60" y1="70" x2="70" y2="70"></line> <line x1="70" y1="70" x2="70" y2="60"></line> <line x1="70" y1="60" x2="60" y2="60"></line> </g> </svg>`,
  case07_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g stroke-width="2" style="stroke: rgb(0, 0, 0);" transform="scale(0.6666666666666666,0.6666666666666666)translate(10,10)"> <line x1="20" y1="20" x2="20" y2="30"></line> <line x1="20" y1="30" x2="30" y2="30"></line> <line x1="30" y1="30" x2="30" y2="20"></line> <line x1="30" y1="20" x2="20" y2="20"></line> </g> <g stroke-width="2" style="stroke: rgb(0, 0, 0);"> <line x1="60" y1="60" x2="60" y2="70"></line> <line x1="60" y1="70" x2="70" y2="70"></line> <line x1="70" y1="70" x2="70" y2="60"></line> <line x1="70" y1="60" x2="60" y2="60"></line> </g> </svg>`,
  case08       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <line x1="20" y1="20" x2="20" y2="30" stroke-width="2" style="stroke-width: 2;"></line> <line x1="20" y1="30" x2="30" y2="30" stroke-width="2"></line> <line x1="30" y1="30" x2="30" y2="20" stroke-width="2"></line> <line x1="30" y1="20" x2="20" y2="20" stroke-width="2"></line> <line x1="60" y1="60" x2="60" y2="70" stroke-width="2"></line> <line x1="60" y1="70" x2="70" y2="70" stroke-width="2"></line> <line x1="70" y1="70" x2="70" y2="60" stroke-width="2"></line> <line x1="70" y1="60" x2="60" y2="60" stroke-width="2"></line> </g> </svg>`,
  case08_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <line x1="20" y1="20" x2="20" y2="30" stroke-width="2" style="stroke-width: 1.33333;"></line> <line x1="20" y1="30" x2="30" y2="30" stroke-width="2" style="stroke-width: 1.33333;"></line> <line x1="30" y1="30" x2="30" y2="20" stroke-width="2" style="stroke-width: 1.33333;"></line> <line x1="30" y1="20" x2="20" y2="20" stroke-width="2" style="stroke-width: 1.33333;"></line> <line x1="60" y1="60" x2="60" y2="70" stroke-width="2"></line> <line x1="60" y1="70" x2="70" y2="70" stroke-width="2"></line> <line x1="70" y1="70" x2="70" y2="60" stroke-width="2"></line> <line x1="70" y1="60" x2="60" y2="60" stroke-width="2"></line> </g> </svg>`,
  case09       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <polygon fill="none" stroke-width="2" points="20,20,20,30,30,30,30,20" style="stroke-width: 2;"></polygon> <polygon fill="none" stroke-width="2" points="60,60,60,70,70,70,70,60"></polygon> </g> </svg>`,
  case09_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g style="stroke: rgb(0, 0, 0);"> <polygon fill="none" stroke-width="2" points="20,20,20,30,30,30,30,20" style="stroke-width: 1.33333;"></polygon> <polygon fill="none" stroke-width="2" points="60,60,60,70,70,70,70,60"></polygon> </g> </svg>`,
  case10       : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g stroke-width="5" style="stroke: rgb(0, 0, 0);"> <line x1="10" x2="90" y1="10" y2="90" stroke-width="10" style="stroke-width: 10;"></line> <line x1="90" x2="10" y1="10" y2="90" style="stroke-width: 10;"></line> <line x1="0" x2="100" y1="50" y2="50"></line> <line x1="50" x2="50" y1="0" y2="100"></line> </g> </svg>`,
  case10_after : `<svg viewBox="0,0,100,100" preserveAspectRatio="none" width="100%" height="100%"> <g stroke-width="5" style="stroke: rgb(0, 0, 0);"> <line x1="10" x2="90" y1="10" y2="90" stroke-width="10" style="stroke-width: 6.66667;"></line> <line x1="90" x2="10" y1="10" y2="90" style="stroke-width: 6.66667;"></line> <line x1="0" x2="100" y1="50" y2="50" style="stroke-width: 3.33333;"></line> <line x1="50" x2="50" y1="0" y2="100"></line> </g> </svg>`
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

    if (results[code]) {

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
