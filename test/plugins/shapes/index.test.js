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
  case01 : `<svg viewBox="0 0 100 100" width="100" height="100"> <path stroke="black" stroke-width="3" fill="red" d="M66.0727,11.1971L88.8029,33.9273L88.8029,66.0727L66.0727,88.8029L33.9273,88.8029L11.1971,66.0727L11.1971,33.9273L33.9273,11.1971Z"></path> <text x="50" y="52" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-weight="bold" style="font-size: 1.2em;">STOP</text> </svg>`,
  case02 : `<svg viewBox="0 0 200 500" width="200" height="200"> <path d="M100,150A100,100,0,0,0,0.3805,241.2844L10.3425,242.156A90,90,0,0,1,100,160Z"></path> <path d="M109.1514,145.3996A105,105,0,0,1,205,250L185,250A85,85,0,0,0,107.4082,165.3235Z"></path> <path d="M209.5814,259.5871A110,110,0,0,1,100,360L100,330A80,80,0,0,0,179.6956,256.9725Z"></path> <path d="M-15,250A115,115,0,0,0,89.9771,364.5624L93.4633,324.7146A75,75,0,0,1,25,250Z"></path> </svg>`,
  case03 : `<svg viewBox="0 0 200 500" width="200" height="200"> <path fill="none" stroke-width="10" stroke="black" d="M100,150A100,100,0,0,1,176.6044,185.7212"></path> <path fill="none" stroke-width="10" stroke="black" d="M200,250A100,100,0,0,1,150,336.6025"></path> <path fill="none" stroke-width="10" stroke="black" d="M100,350A100,100,0,0,1,6.0307,284.202"></path> <path fill="none" stroke-width="10" stroke="black" d="M0,250A100,100,0,0,1,82.6352,151.5192"></path> </svg>`,
  case04 : `<svg viewBox="0 0 200 200" width="200"> <circle fill="red" cx="75" cy="100" r="50"></circle> <path fill="none" stroke-width="1" stroke="black" id="path" d="M23.0385,130A60,60,0,0,0,126.9615,70"></path> <text> <textPath href="#path" method="align">testing the path</textPath> </text> </svg>`,
  case05 : `<svg viewBox="0 0 1000 800" width="300"> <defs> <marker viewBox="0,0,10,10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse" id="arrow"> <path fill="#00d800" d="M0,0L10,5L0,10z"></path> </marker> </defs> <text x="100" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,20A80,80,0,0,1,180,100"></path> <text x="300" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M300,20A80,80,0,0,0,220,100"></path> <text x="500" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M500,180A80,80,0,0,1,420,100"></path> <text x="700" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M700,180A80,80,0,0,0,780,100"></path> <text x="900" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">180,-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M820,100A80,80,0,0,1,980,100"></path> <text x="100" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">360</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,220A80,80,0,1,1,99.8604,220.0001"></path> <text x="300" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">90,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M300,220A80,80,0,0,1,380,300"></path> <text x="500" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M420,300A80,80,0,1,1,500,380"></path> <text x="700" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M700,220A80,80,0,1,1,620,300"></path> <text x="900" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M980,300A80,80,0,1,1,900,220"></path> <text x="100" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">360,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,420A80,80,0,1,1,99.8604,420.0001"></path> <text x="300" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">400</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M300,420A80,80,0,0,1,351.423,438.7164"></path> <text x="500" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-400</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M500,420A80,80,0,0,0,448.577,438.7164"></path> <text x="700" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-180,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M780,500A80,80,0,0,0,620,500"></path> <text x="900" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,-180</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M900,580A80,80,0,1,0,820,500"></path> <text x="100" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">0</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M100,620A80,80,0,0,0,100,620"></path> <text x="300" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">90,-300</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M369.282,660A80,80,0,0,1,340,769.282"></path> <text x="500" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-300,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M580,700A80,80,0,1,0,540,769.282"></path> <text x="700" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,60</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M769.282,660A80,80,0,1,0,740,769.282"></path> <text x="900" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">60,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" d="M980,700A80,80,0,0,1,940,769.282"></path> </svg>`,
  case06 : `<svg viewBox="0 0 1000 800" width="300"> <text x="100" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,20A80,80,0,0,1,180,100L170,100A70,70,0,0,0,100,30Z"></path> <text x="300" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M300,20A80,80,0,0,0,220,100L230,100A70,70,0,0,1,300,30Z"></path> <text x="500" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M500,180A80,80,0,0,1,420,100L430,100A70,70,0,0,0,500,170Z"></path> <text x="700" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M700,180A80,80,0,0,0,780,100L770,100A70,70,0,0,1,700,170Z"></path> <text x="900" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">180,-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M820,100A80,80,0,0,1,980,100L970,100A70,70,0,0,0,830,100Z"></path> <text x="100" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">360</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,220A80,80,0,1,1,99.8604,220.0001L100,230A70,70,0,1,0,100.1222,230.0001Z"></path> <text x="300" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">90,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M300,220A80,80,0,0,1,380,300L370,300A70,70,0,0,0,300,230Z"></path> <text x="500" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M420,300A80,80,0,1,1,500,380L500,370A70,70,0,1,0,430,300Z"></path> <text x="700" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M700,220A80,80,0,1,1,620,300L630,300A70,70,0,1,0,700,230Z"></path> <text x="900" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M980,300A80,80,0,1,1,900,220L900,230A70,70,0,1,0,970,300Z"></path> <text x="100" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">360,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,420A80,80,0,1,1,99.8604,420.0001L100,430A70,70,0,1,0,100.1222,430.0001Z"></path> <text x="300" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">400</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M300,420A80,80,0,0,1,351.423,438.7164L344.9951,446.3769A70,70,0,0,0,300,430Z"></path> <text x="500" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-400</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M500,420A80,80,0,0,0,448.577,438.7164L455.0049,446.3769A70,70,0,0,1,500,430Z"></path> <text x="700" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-180,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M780,500A80,80,0,0,0,620,500L630,500A70,70,0,0,1,770,500Z"></path> <text x="900" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,-180</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M900,580A80,80,0,1,0,820,500L830,500A70,70,0,1,1,900,570Z"></path> <text x="100" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">0</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,620A80,80,0,0,0,100,620L100,630A70,70,0,0,0,100,630Z"></path> <text x="300" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">90,-300</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M369.282,660A80,80,0,0,1,340,769.282L335,760.6218A70,70,0,0,0,360.6218,665Z"></path> <text x="500" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-300,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M580,700A80,80,0,1,0,540,769.282L535,760.6218A70,70,0,1,1,570,700Z"></path> <text x="700" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,60</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M769.282,660A80,80,0,1,0,740,769.282L735,760.6218A70,70,0,1,1,760.6218,665Z"></path> <text x="900" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">60,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M980,700A80,80,0,0,1,940,769.282L935,760.6218A70,70,0,0,0,970,700Z"></path> </svg>`,
  case07 : `<svg viewBox="0 0 1000 800" width="300"> <text x="100" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,20A80,80,0,0,1,180,100L100,100Z"></path> <text x="300" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M300,20A80,80,0,0,0,220,100L300,100Z"></path> <text x="500" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M500,180A80,80,0,0,1,420,100L500,100Z"></path> <text x="700" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">-90,180</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M700,180A80,80,0,0,0,780,100L700,100Z"></path> <text x="900" y="100" font-size="35" text-anchor="middle" dominant-baseline="middle">180,-90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M820,100A80,80,0,0,1,980,100L900,100Z"></path> <text x="100" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">360</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,220A80,80,0,1,1,99.8604,220.0001L100,300Z"></path> <text x="300" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">90,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M300,220A80,80,0,0,1,380,300L300,300Z"></path> <text x="500" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M420,300A80,80,0,1,1,500,380L500,300Z"></path> <text x="700" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M700,220A80,80,0,1,1,620,300L700,300Z"></path> <text x="900" y="300" font-size="35" text-anchor="middle" dominant-baseline="middle">270,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M980,300A80,80,0,1,1,900,220L900,300Z"></path> <text x="100" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">360,360</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,420A80,80,0,1,1,99.8604,420.0001L100,500Z"></path> <text x="300" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">400</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M300,420A80,80,0,0,1,351.423,438.7164L300,500Z"></path> <text x="500" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-400</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M500,420A80,80,0,0,0,448.577,438.7164L500,500Z"></path> <text x="700" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-180,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M780,500A80,80,0,0,0,620,500L700,500Z"></path> <text x="900" y="500" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,-180</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M900,580A80,80,0,1,0,820,500L900,500Z"></path> <text x="100" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">0</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M100,620A80,80,0,0,0,100,620L100,700Z"></path> <text x="300" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">90,-300</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M369.282,660A80,80,0,0,1,340,769.282L300,700Z"></path> <text x="500" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-300,90</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M580,700A80,80,0,1,0,540,769.282L500,700Z"></path> <text x="700" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">-270,60</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M769.282,660A80,80,0,1,0,740,769.282L700,700Z"></path> <text x="900" y="700" font-size="35" text-anchor="middle" dominant-baseline="middle">60,-270</text> <path fill="none" stroke-width="3" stroke="black" id="path" d="M980,700A80,80,0,0,1,940,769.282L900,700Z"></path> </svg>`,
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
