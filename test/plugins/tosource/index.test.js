import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from "../../../tools/playwright-helper/wait.js";
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT            = '/src';
const IMPORT_LIB      = ROOT + '/lib/gsvg.script.js';
const IMPORT_TEMPLATE = ROOT + '/plugins/template.engine.script.js';
const IMPORT_PLUGIN   = ROOT + '/plugins/tosource.script.js';
const URL             = '/test/plugins/tosource/cases/';
const FOLDER          = './test/plugins/tosource/cases/';

const results = {
  case01 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,100,100" width="100" height="100"> <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"/> <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"/> </svg>`,
  case02 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <text x="0" y="50">hello world</text> </svg>`,
  case03 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="25" cy="50" r="20" fill="violet"/> </svg>`,
  case04 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect x="10" y="10" width="80" height="80" fill="red"/> </svg>`,
  case05 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect style="cursor: pointer" x="10" y="10" width="80" height="80" fill="red"></rect> </svg>`,
  case06 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <circle r="25" cx="25" cy="25" fill="red"></circle> </g> <g> <circle r="25" cx="50" cy="50" fill="green"></circle> </g> <g> <circle r="25" cx="75" cy="75" fill="blue"></circle> </g> </svg>`,
  case07 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <defs> <circle id="test" r="25"/> </defs> <g> <use href="#test" id="circle_a" x="25" y="25" fill="red"/> <text fill="white" x="22" y="31">a</text> </g> <g> <use href="#test" id="circle_b" x="50" y="50" fill="green"/> <text fill="white" x="47" y="56">b</text> </g> <g> <use href="#test" id="circle_c" x="75" y="75" fill="blue"/> <text fill="white" x="72" y="81">c</text> </g> </svg>`,
}

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT_LIB }&imp=${ IMPORT_TEMPLATE }&imp=${ IMPORT_PLUGIN }`);
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
