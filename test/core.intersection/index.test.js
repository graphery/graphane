import { test, expect } from '@playwright/test';
import getName          from '../../tools/playwright-helper/getname.js';
import wait             from '../../tools/playwright-helper/wait.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT   = '/';
const URL    = ROOT + 'test/core.intersection/cases/';
const FOLDER = './test/core.intersection/cases/';

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
      const component = page.locator('#container');
      await expect(component).toHaveScreenshot();
    });
    if (['case08'].includes(code)) {
      test('compare image after change intersectionRatio', async ({page}) => {
        await page.evaluate(_ => {
          const component = document.querySelector('g-my-component');
          component.intersectionRatio = 0.4;
        });
        const component = page.locator('#container');
        await expect(component).toHaveScreenshot();
      });
    } else {
      if (!['case10'].includes(code)) {
        test('compare image after middle scroll', async ({page}) => {
          await wait(100);
          await page.evaluate(_ => {
            const container = document.querySelector('#container');
            container.scroll(0, (container.scrollHeight - container.clientHeight) / 3);
          });
          await wait(100);
          const component = page.locator('#container');
          await expect(component).toHaveScreenshot();
        });
      }
      test('compare image after scroll', async ({page}) => {
        await wait(100);
        await page.evaluate(_ => {
          const container = document.querySelector('#container');
          container.scroll(0, container.scrollHeight - container.clientHeight);
        });
        await wait(100);
        const component = page.locator('#container');
        await expect(component).toHaveScreenshot();
      });
    }
  });
}
