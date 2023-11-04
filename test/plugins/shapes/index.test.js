import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/shapes.script.js';
const URL           = '/test/plugins/shapes/cases/';
const FOLDER        = './test/plugins/shapes/cases/';

const results = {
  case01 : `<svg viewBox="0 0 100 100" width="100" height="100"><path stroke="black" stroke-width="3" fill="red" d="M66.07,11.2L88.8,33.93L88.8,66.07L66.07,88.8L33.93,88.8L11.2,66.07L11.2,33.93L33.93,11.2Z"></path><text x="50" y="52" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-weight="bold" style="font-size: 1.2em;">STOP</text></svg>`,
  case02 : `<svg viewBox="0 0 100 100" width="100" height="100"><path stroke="black" stroke-width="3" fill="red" d="M8,50a42,42,0,1,0,84,0a42,42,0,1,0,-84,0"></path><rect x="20" y="40" width="60" height="20" fill="white"></rect></svg>`,
  case03 : `<svg viewBox="0 0 200 500" width="200" height="200"><path d="M100,150A100,100,0,0,0,0.38,241.28L10.34,242.16A90,90,0,0,1,100,160Z"></path><path d="M205,250A105,105,0,0,0,109.15,145.4L107.41,165.32A85,85,0,0,1,185,250Z"></path><path d="M100,360A110,110,0,0,0,209.58,259.59L179.7,256.97A80,80,0,0,1,100,330Z"></path><path d="M-15,250A115,115,0,0,0,89.98,364.56L93.46,324.71A75,75,0,0,1,25,250Z"></path></svg>`,
  case04 : `<svg viewBox="0 0 200 500" width="200" height="200"><path fill="none" stroke-width="10" stroke="black" d="M100,150A100,100,0,0,1,176.6,185.72"></path><path fill="none" stroke-width="10" stroke="black" d="M200,250A100,100,0,0,1,150,336.6"></path><path fill="none" stroke-width="10" stroke="black" d="M100,350A100,100,0,0,1,6.03,284.2"></path><path fill="none" stroke-width="10" stroke="black" d="M0,250A100,100,0,0,1,82.64,151.52"></path></svg>`,
  case05 : `<svg viewBox="0 0 200 500" width="200" height="200"><path d="M100,150L108.82,237.86L195.11,219.1L114.27,254.64L158.78,330.9L100,265L41.22,330.9L85.73,254.64L4.89,219.1L91.18,237.86Z"></path></svg>`,
  case06 : `<svg viewBox="0 0 200 200" width="200"><circle fill="red" cx="75" cy="100" r="50"></circle><path fill="none" stroke-width="1" stroke="black" id="path" d="M23.04,130A60,60,0,0,0,126.96,70"></path><text><textPath href="#path" method="align">testing the path</textPath></text></svg>`,
  case07 : `<svg viewBox="0 0 200 200" width="200"><path fill="none" stroke-width="1" stroke="black" id="path" d="M100,1L185.74,149.5L14.26,149.5ZM1,100a99,99,0,1,0,198,0a99,99,0,1,0,-198,0"></path></svg>`,
  case08 : `<svg viewBox="0 0 200 200" width="200"><circle fill="red" cx="100" cy="100" r="100"></circle><path fill="none" stroke-width="1" stroke="black" id="path" d="M100,0L200,100L100,200L0,100Z"></path></svg>`,
  case09 : `<svg viewBox="0 0 200 200" width="200"><circle fill="red" cx="100" cy="100" r="100"></circle><path fill="none" stroke-width="1" stroke="black" id="path" d="M100,0L195.11,69.1L158.78,180.9L41.22,180.9L4.89,69.1Z"></path></svg>`,
  case10 : `<svg viewBox="0 0 1000 800" width="300"> <defs> <marker viewBox="0,0,10,10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse" id="arrow"> <path fill="#00d800" d="M0,0L10,5L0,10z"></path></marker></defs> <text x="100" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,20A80,80,0,0,1,180,100"></path> <text x="300" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M300,20A80,80,0,0,0,220,100"></path> <text x="500" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M500,180A80,80,0,0,1,420,100"></path> <text x="700" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M700,180A80,80,0,0,0,780,100"></path> <text x="900" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">180,-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M820,100A80,80,0,0,1,980,100"></path> <text x="100" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">360</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,220A80,80,0,1,1,99.86,220"></path> <text x="300" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">90,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M300,220A80,80,0,0,1,380,300"></path> <text x="500" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M420,300A80,80,0,1,1,500,380"></path> <text x="700" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M700,220A80,80,0,1,1,620,300"></path> <text x="900" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M980,300A80,80,0,1,1,899.86,220"></path> <text x="100" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">360,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,420A80,80,0,1,1,99.86,420"></path> <text x="300" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">400</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M300,420A80,80,0,0,1,351.42,438.72"></path> <text x="500" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-400</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M500,420A80,80,0,0,0,448.58,438.72"></path> <text x="700" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-180,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M780,500A80,80,0,0,0,620,500"></path> <text x="900" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,-180</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M900,580A80,80,0,1,0,820,500"></path> <text x="100" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">0</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,620A80,80,0,0,0,100,620"></path> <text x="300" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">90,-300</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M369.28,660A80,80,0,0,1,340,769.28"></path> <text x="500" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-300,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M580,700A80,80,0,1,0,540,769.28"></path> <text x="700" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,60</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M769.28,660A80,80,0,1,0,740,769.28"></path> <text x="900" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">60,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M980,700A80,80,0,0,1,940,769.28"></path></svg>`,
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
      const show = page.locator('svg');
      await expect(show).toHaveScreenshot()
    });
  });
}
