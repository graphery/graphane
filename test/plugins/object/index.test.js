import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT            = '/src';
const IMPORT_LIB      = ROOT + '/lib/gsvg.script.js';
const IMPORT_TEMPLATE = ROOT + '/plugins/template.engine.script.js';
const IMPORT_PLUGIN   = ROOT + '/plugins/object.script.js';
const URL             = '/test/plugins/object/cases/';
const FOLDER          = './test/plugins/object/cases/';

const results = {
  case01 : `{ "_$tag": "svg", "_$children": [ { "_$tag": "g", "_$children": [ { "_$tag": "rect", "_$children": [], "x": 40, "y": 40, "width": 20, "height": 20 } ], "fill": "orange" } ], "viewBox": "0 0 100 100", "id": "svg", "style": "width: 100px; height: 100px" }`,
  case02 : `{ "_$children": [ { "_$tag": "rect", "_$children": [], "x": 30, "y": 30, "width": 30, "height": 30, "fill": "blue" } ] }`,
  case03 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <rect x="20" y="20" width="80" height="80" fill="green"></rect> </g> </svg>`,
  case04 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect x="10" y="10" width="90" height="90" fill="red"></rect> </svg> `,
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
      const show = page.locator('svg#svg');
      await expect(show).toHaveScreenshot()
    });

  });

}
