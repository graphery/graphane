import { test, expect } from '@playwright/test';
import getName          from '../../tools/playwright-helper/getname.js';
import wait             from '../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const URL    = ROOT + 'test/web-component/cases/';
const FOLDER = './test/web-component/cases/';

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
    if (!['case12'].includes(code)) {
      test('compare image', async ({page}) => {
        const component = page.locator('#case g-my-component');
        await expect(component).toHaveScreenshot();
      });
    }
    if (['case02', 'case03', 'case04', 'case05', 'case06'].includes(code)) {
      test('compare image after click', async ({page}) => {
        const component = page.locator('#case g-my-component');
        await component.click();
        await expect(component).toHaveScreenshot();
      });
    }
    if (['case03'].includes(code)) {
      test('check events', async ({page}) => {
        const result = page.locator('#case #result');
        await expect(result).toContainText(`ready event\nrender event\nrefresh event\n`);
        const component = page.locator('#case g-my-component');
        await component.click();
        await expect(result).toContainText(`ready event\nrender event\nrefresh event\nupdate event\nrefresh event\n`);
        await component.click({button : 'right'});
        await expect(result).toContainText(`ready event\nrender event\nrefresh event\nupdate event\nrefresh event\nrender event\nrefresh event\n`)
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
    if (['case07', 'case08'].includes(code)) {
      test('compare image after click', async ({page}) => {
        const button = page.locator('#update');
        await button.click();
        const component = page.locator('#case g-my-component');
        await expect(component).toHaveScreenshot();
      });
    }
    if (['case09'].includes(code)) {
      test('compare image after resize', async ({page}) => {
        await page.evaluate(async () => {
          document.querySelector('#container').style.width = '100px';
        });
        const component = page.locator('#case g-my-component');
        await expect(component).toHaveScreenshot();
      });
    }
    if (['case11'].includes(code)) {
      test('compare image after wait', async ({page}) => {
        await wait(3000);
        const component = page.locator('#case g-my-component');
        await expect(component).toHaveScreenshot();
      });
    }
    if (['case12'].includes(code)) {
      test('compare content after load', async ({page}) => {
        const button = page.locator('#update');
        await button.click();
        await wait(3000);
        const content = page.locator('#content');
        await expect(content).toContainText('hello Graphane')
      });
    }

  });
}
