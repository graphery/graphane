import { test, expect } from '@playwright/test';
import getName          from '../../tools/playwright-helper/getname.js';
import wait             from '../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const URL    = ROOT + 'test/component/cases/';
const FOLDER = './test/component/cases/';

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }`);
      await wait(100);
    });
    test('compare image', async ({page}) => {
      const component = page.locator('#case g-my-component');
      await expect(component).toHaveScreenshot();
    });
    if (['case02', 'case03', 'case04', 'case05'].includes(code)) {
      test('compare image after click', async ({page}) => {
        const component = page.locator('#case g-my-component');
        await component.click();
        await expect(component).toHaveScreenshot();
      });
    }
    if (['case03'].includes(code)) {
      test('check events', async ({page}) => {
        const result = page.locator('#case #result');
        expect(await result.innerText()).toBe(`ready event\nrender event\nrefresh event\n`);
        const component = page.locator('#case g-my-component');
        await component.click();
        expect(await result.innerText()).toBe(`ready event\nrender event\nrefresh event\nupdate event\nrefresh event\n`);
        await component.click({button : 'right'});
        expect(await result.innerText()).toBe(`ready event\nrender event\nrefresh event\nupdate event\nrefresh event\nrender event\nrefresh event\n`)
      });
    }
    if (['case04'].includes(code)) {
      test('check update attribute', async ({page}) => {
        const component = page.locator('#case g-my-component');
        await expect(component).toHaveScreenshot();
        await component.click({button : 'right'});
        await expect(component).toHaveScreenshot();
        await component.click({button : 'right'});
        await expect(component).toHaveScreenshot();
      });
    }

  });
}
