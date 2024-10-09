import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const IMPORT = ROOT + 'src/component/composer.js';
const URL    = ROOT + 'test/component/composer/cases/';
const FOLDER = './test/component/composer/cases/';

const errors = {
  case07: `Not Found (404): http://localhost:7200/src/g-composer/test/assets/unknown.svg in svg /src/g-composer/test/assets/unknown.svg`,
  case54: `wrong is not defined in g-bind:x="wrong" <rect :x="wrong" :y="fail" width="100" height="100" fill="red"></rect> fail is not defined in g-bind:y="fail" <rect :x="wrong" :y="fail" width="100" height="100" fill="red"></rect>`,
  case55: `wrong is not defined in g-content="wrong" <text x="0" y="0" g-content="wrong"></text>`,
  case56: `wrong is not defined in g-for="x of wrong" <defs g-for="x of wrong"> <rect :x="x" :y="y" width="10" height="10"></rect> </defs>`,
  case57: `wrong is not defined in g-if="wrong" <g g-if="wrong"> <rect x="0" y="0" width="100" height="100" fill="red"></rect> </g> `,
  case58: `wrong is not defined in g-on:click="wrong" <rect @click="wrong" x="0" y="0" width="100" height="100" fill="red" style="cursor: pointer"></rect> `,
  case59: `Invalid or unexpected token in data {a": 10}`,
  case60: `y is not defined in methods x = y; `,
  case61: `x is not defined in config {conf: x + 10}`,
  case62: `Failed to fetch dynamically imported module: http://localhost:7200/non-exist.js in plugin ./non-exist.js`,
  case63: `Not Found (404): http://localhost:7200/non-exist.json in data ./non-exist.json`,
  case64: `Not Found (404): http://localhost:7200/non-exist.js in methods ./non-exist.js`,
  case65: `y is not defined in methods x = y * 10;`,
  case89: `Failed to fetch dynamically imported module: http://localhost:7200/non-exist.js in plugin ./non-exist.js The expression "value * 2" return NaN (Not a Number) value in g-bind:x="value * 2" <rect :x="value * 2" @click="wrong()" y="0" width="100" height="100" fill="red"></rect> wrong is not defined in g-on:click="wrong()" <rect :x="value * 2" @click="wrong()" y="0" width="100" height="100" fill="red"></rect> `,
  case90: `{"message":"Failed to fetch dynamically imported module: http://localhost:7200/non-exist.js","scope":"plugin","code":"./non-exist.js"} {"message":"The expression \\"value * 2\\" return NaN (Not a Number) value","scope":{"directive":"g-bind","argument":"x","expression":"value * 2"},"code":"<rect :x=\\"value * 2\\" @click=\\"wrong()\\" y=\\"0\\" width=\\"100\\" height=\\"100\\" fill=\\"red\\"></rect>"} {"message":"wrong is not defined","scope":{"directive":"g-on","argument":"click","expression":"wrong()"},"code":"<rect :x=\\"value * 2\\" @click=\\"wrong()\\" y=\\"0\\" width=\\"100\\" height=\\"100\\" fill=\\"red\\"></rect>"}`
}

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT }`);
    });

    if (!['case07', 'case08', 'case51', 'case52', 'case53'].includes(code)) {
      test('compare image', async ({page}) => {
        const show = page.locator(code === 'case91' ? '#group': 'g-composer');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case04', 'case05', 'case40', 'case41', 'case43', 'case51', 'case52', 'case53'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('#run');
        await run.click();
        await wait(500);
        const show = page.locator('g-composer');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case29', 'case30', 'case31', 'case32'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('g-composer', {hasText : 'click'});
        await run.click();
        await wait(500);
        const show = page.locator('#case g-composer');
        await expect(show).toHaveScreenshot()
      });
    }
    if (['case35'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('#check');
        await run.click();
        await wait(500);
        const show = page.locator('#case g-composer');
        await expect(show).toHaveScreenshot()
      });
    }

    if ('case08' === code) {
      test('events', async ({page}) => {
        const result = page.locator('#events');
        await expect(result).toHaveText(/resize/)
        await expect(result).toHaveText(/render/)
      });
    }

    if ('case09' === code) {
      test('hidden', async ({page}) => {
        const select = page.locator('#_hidden');
        await select.selectOption('');
        await wait(500);
        const show = page.locator('#case g-composer');
        await expect(show).toHaveScreenshot()
      });
    }

    if (errors[code]) {
      test('error', async({page}) => {
        const result = page.locator('#result');
        if (['case58', 'case89', 'case90'].includes(code)) {
          const run = page.locator('g-composer');
          await run.click();
          await wait(500);
        }
        await expect(result).toHaveText(errors[code]);
      });
    }

  });
}
