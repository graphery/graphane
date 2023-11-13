import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from '../../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const IMPORT = ROOT + 'src/component/composer.js';
const URL    = ROOT + 'test/component/composer/cases/';
const FOLDER = './test/component/composer/cases/';

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT }`);
    });

    if (!['case07', 'case08', 'case09'].includes(code)) {
      test('compare image', async ({page}) => {
        const show = page.locator('#case g-composer');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case04', 'case05', 'case40', 'case41'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('#run');
        await run.click();
        await wait(500);
        const show = page.locator('#case g-composer');
        await expect(show).toHaveScreenshot()
      });
    }

    if (['case29', 'case30', 'case31', 'case32'].includes(code)) {
      test('compare image after run action', async ({page}) => {
        const run = page.locator('g-composer', { hasText: 'click' });
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

    if ('case07' === code) {
      test('compare message', async ({page}) => {
        const result = page.locator('#result');
        await expect(result).toHaveText('Not Found (404): http://localhost:7200/src/g-composer/test/assets/unknown.svg')
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

  });
}
