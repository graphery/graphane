import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/animateto.script.js';
const URL           = '/test/plugins/animateto/cases/';
const FOLDER        = './test/plugins/animateto/cases/';

const results = {
  case01       : `<svg viewBox="0,0,100,100" width="100" height="100"> <circle cx="10" cy="10" r="10"></circle> </svg>`,
  case01_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <circle cx="90" cy="90" r="10"></circle> </svg>`,
  case02       : `<svg viewBox="0,0,100,100" width="100" height="100"> <circle cx="10" cy="10" r="10"></circle> </svg>`,
  case02_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <circle cx="10" cy="90" r="10"></circle> </svg>`,
  case03       : `<svg viewBox="0,0,100,100" width="100" height="100"> <text x="0" y="50">hello world</text> </svg>`,
  case03_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <text x="0" y="50" style="text-shadow: rgb(255, 0, 0) 2px 2px 2px;">hello world</text> </svg>`,
  case04       : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="0" y="0" width="20" height="20" fill="black"></rect> </svg>`,
  case04_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="0" y="0" width="20" height="20" fill="black" transform="translate(80,80)"></rect> </svg>`,
  case05       : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="40" y="40" width="20" height="20" fill="black"></rect> </svg>`,
  case05_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="40" y="40" width="20" height="20" fill="black" transform="rotate(315, 50, 50)"></rect> </svg>`,
  case06       : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="40" y="40" width="20" height="20" fill="black"></rect> </svg>`,
  case06_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="40" y="40" width="20" height="20" fill="black" transform="rotate(315, 50, 50)"></rect> </svg>`,
  case07       : `<svg viewBox="0,0,500,500" width="100" height="100"> <path stroke="black" stroke-width="10" d="M100,100L400,400M100,400L400,100"></path> </svg>`,
  case07_after : `<svg viewBox="0,0,500,500" width="100" height="100"> <path stroke="black" stroke-width="10" d="M150,300L225,400M225,400L400,100"></path> </svg>`,
  case08       : `<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="10" y1="10" x2="10" y2="90" stroke="black"></line> </svg>`,
  case08_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="90" y1="10" x2="10" y2="90" stroke="black"></line> </svg>`,
  case09       : `<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="10" y1="10" x2="10" y2="90" stroke="black"></line> </svg>`,
  case09_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="90" y1="10" x2="10" y2="90" stroke="black"></line> </svg>`,
  case10       : `<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="10" y1="10" x2="10" y2="90" stroke="black"></line> </svg>`,
  case10_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="90" y1="10" x2="10" y2="90" stroke="black"></line> </svg>`,
  case11       : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="0" y="0" width="40" height="40" fill="black"></rect> </svg>`,
  case11_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="0" y="0" width="40" height="40" fill="black"></rect> </svg>`,
  case12       : `<svg viewBox="0,0,100,100" width="100" height="100"> <circle cx="10" cy="10" r="10" fill="black" stroke="red" stroke-width="1"></circle> </svg>`,
  case12_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <circle cx="10" cy="10" r="10" fill="black" stroke="red" stroke-width="1"></circle> </svg>`,
  case13       : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="20" y="20" width="60" height="60" fill="black"></rect> </svg>`,
  case13_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="20" y="20" width="60" height="60" fill="black" rx="0" ry="0"></rect> </svg>`,
  case14       : `<svg viewBox="0,0,100,100" width="100" height="100"> <text x="10" y="10" fill="black">test</text> </svg>`,
  case14_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <text x="10" y="80" fill="black">test</text> </svg>`,
  case15       : `<svg viewBox="0,0,100,100" width="100" height="100"> <text dx="10" dy="10" rotate="0" fill="black">test</text> </svg>`,
  case15_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <text dx="10" dy="80" rotate="0" fill="black">test</text> </svg>`,
  case16       : `<svg viewBox="0,0,100,100" width="100" height="100"> <text x="0" y="0"> <tspan x="10" y="10" fill="black">test</tspan> </text> </svg>`,
  case16_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <text x="0" y="0"> <tspan x="10" y="80" fill="black">test</tspan> </text> </svg>`,
  case17       : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="0" y="0" width="10" height="10" fill="red"></rect> <rect x="90" y="0" width="10" height="10" fill="green"></rect> <rect x="90" y="90" width="10" height="10" fill="blue"></rect> <rect x="0" y="90" width="10" height="10" fill="violet"></rect> </svg>`,
  case17_after : `<svg viewBox="0,0,100,100" width="100" height="100"> <rect x="0" y="0" width="10" height="10" fill="red"></rect> <rect x="90" y="0" width="10" height="10" fill="green"></rect> <rect x="90" y="90" width="10" height="10" fill="blue"></rect> <rect x="0" y="90" width="10" height="10" fill="violet"></rect> </svg>`,
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
      const run = page.locator('#run');
      await run.click();
      await wait(1050);
      const result = page.locator('#result');
      await expect(result).toHaveText(results[code + '_after']);
    });

    test('compare image after run action', async ({page}) => {
      const run = page.locator('#run');
      await run.click();
      await wait(1050);
      const show = page.locator('#show svg');
      await expect(show).toHaveScreenshot()
    });

  });
}
