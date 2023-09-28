import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const IMPORT = '/src/lib/gsvg.script.js';
const URL    = '/test/lib/gsvg/cases/';
const FOLDER = './test/lib/gsvg/cases/';

const BASE_1  = '<svg viewBox="0,0,100,100" width="100" height="100"><line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line><line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line></svg>';
const BASE_2  = '<svg viewBox="0,0,100,100" width="100" height="100"><circle cx="50" cy="50" r="40"></circle></svg>';
const BASE_3  = '<svg viewBox="0,0,100,100" width="100" height="100"><circle cx="50" cy="50" r="10" fill="none" stroke="black"></circle><circle cx="50" cy="50" r="20" fill="none" stroke="black"></circle><circle cx="50" cy="50" r="30" fill="none" stroke="black"></circle><circle cx="50" cy="50" r="40" fill="none" stroke="black"></circle></svg>';
const results = {
  case01      : '<svg viewBox="0 0 100 100" width="100" height="100"><line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line><line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line></svg>',
  case02      : BASE_1,
  case03      : BASE_1,
  case04      : BASE_1,
  case05      : '<svg viewBox="0,0,100,100" width="100" height="100"> <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line> <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line> </svg>',
  case06      : BASE_1,
  case07      : BASE_1,
  case08      : BASE_1,
  case09      : BASE_1,
  case10      : BASE_1,
  case11      : BASE_1,
  case12      : 'is not wrapped reference',
  case13      : 'is a wrapped reference',
  case14      : BASE_2,
  case15      : BASE_2,
  case16      : BASE_2,
  case17      : '<svg viewBox="0,0,100,100" width="100" height="100"><circle id="test" cx="50" cy="50" r="40"></circle></svg>',
  case18      : BASE_3,
  case19      : 'not found',
  case20      : BASE_3,
  case21      : '<svg viewBox="0,0,100,100" width="100" height="100"><g><circle id="test" cx="50" cy="50" r="40"></circle></g></svg>',
  case22      : BASE_2,
  case22_after: '',
  case23      : '<svg viewBox="0,0,100,100" width="100" height="100"><circle cx="50" cy="50" r="40"></circle></svg>',
  case23_after: `<svg viewBox="0,0,100,100" width="100" height="100"></svg>`,
  case24      : '<svg viewBox="0,0,100,100" width="100" height="100"><g><g></g><circle cx="50" cy="50" r="40"></circle></g></svg>',
  case25      : '<svg viewBox="0,0,100,100" width="100" height="100"><g><g></g></g><circle cx="50" cy="50" r="40"></circle></svg>',
  case26      : 'circle radius = 40',
  case27      : 'circle radius = 40',
  case27_value: '20',
  case27_after: 'circle radius = 20',
  case28      : 'circle fill-opacity = undefined',
  case28_value: '0.5',
  case28_after: 'circle fill-opacity = 0.5',
  case29      : 'circle style.opacity =',
  case29_value: '0.5',
  case29_after: 'circle style.opacity = 0.5',
  case30      : 'path.d = M10,30A20,20,0,0,1,50,30A20,20,0,0,1,90,30Q90,60,50,90Q10,60,10,30Z',
  case31      : 'SVG Text =',
  case31_value: 'hello',
  case31_after: 'SVG Text = hello',
  case32      : '<svg viewBox="0,0,100,100" width="100" height="100"><circle cx="30" cy="30" r="30" fill="blue"></circle><circle cx="60" cy="60" r="30" fill="red"></circle></svg>',
  case33      : '<svg viewBox="0,0,100,100" width="100" height="100"><circle cx="60" cy="60" r="30" stroke="red" stroke-width="5" id="gSVGObject1qmp1m895oo"></circle><use href="#gSVGObject1qmp1m895oo" x="-20" y="-20" fill="blue"></use></svg>',
  case34      : '<svg viewBox="0,0,100,100" width="100" height="100"><g fill="red"><circle cx="50" cy="50" r="40"></circle></g></svg>',
  case35      : '<svg viewBox="0,0,100,100" width="100" height="100"><g fill="red"><circle cx="50" cy="50" r="40"></circle></g></svg>',
  case36      : 'is a Graphane Object',
  case37      : '<svg viewBox="0,0,100,100" width="100" height="100"><clipPath id="myClip" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="1" r="0.5"></circle></clipPath><rect x="10" y="10" width="80" height="80" clip-path="url(#myClip)"></rect></svg>',
  case38      : 'gSVG(null) = null',
  case39      : 'gSVG().add(null) = null',
  case40      : 'svg[symbol] = checked',
  case41      : '<svg viewBox="0,0,100,100" width="100" height="100"><line x1="10" y1="50" x2="90" y2="50" stroke="black"></line></svg>'
}

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${URL}${dirent.name}&imp=${IMPORT}`);
    });

    if (!['case33'].includes(code) && results[code]) {
      test('compare source code result', async ({page}) => {
        const result = page.locator('#result');
        await expect(result).toHaveText(results[code]);
      });
    }
    if (!['case38', 'case39', 'case40'].includes(code)) {
      test('compare image', async ({page}) => {
        const show = page.locator('#show svg');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case22', 'case23'].includes(code)) {
      test('run action', async ({page}) => {
        const run = page.locator('#run');
        await run.click();
        await wait(1050);
        const result = page.locator('#result');
        await expect(result).toHaveText(results[code + '_after']);
      });
    }

    if (['case23'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('#run');
        await run.click();
        await wait(1050);
        const show = page.locator('#show svg');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case27', 'case28', 'case31'].includes(code)) {
      test('update value', async ({page}) => {
        await page.fill('#input', results[code + '_value']);
        const result = page.locator('#result');
        await expect(result).toHaveText(results[code + '_after']);
      });
      test('compare image after run action', async ({page}) => {
        await page.fill('#input', results[code + '_value']);
        page.locator('#result');
        const show   = page.locator('#show svg');
        await expect(show).toHaveScreenshot()
      });
    }

  });
}
