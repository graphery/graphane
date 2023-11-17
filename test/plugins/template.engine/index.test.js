import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import wait             from "../../../tools/playwright-helper/wait.js";
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/template.engine.script.js';
const URL           = '/test/plugins/template.engine/cases/';
const FOLDER        = './test/plugins/template.engine/cases/';

const results = {
  case01 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect x="10" y="10" width="80" height="80" fill="red"></rect> </svg>`,
  case02 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <text x="0" y="50">hello world</text> </svg>`,
  case03 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <rect x="40" y="40" width="20" height="20" fill="green"></rect> </g> </svg>`,
  case04 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="25" cy="50" r="20" fill="violet" style="visibility: inherit;"></circle> <circle cx="75" cy="50" r="20" fill="orange" style="visibility: hidden;"></circle> </svg>`,
  case05 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect x="10" y="10" width="80" height="80" fill="red"></rect> </svg>`,
  case06 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect x="10" y="10" width="80" height="80" fill="red"></rect> </svg>`,
  case07 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect style="cursor: pointer" x="10" y="10" width="80" height="80" fill="red"></rect> </svg>`,
  case08 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <rect style="cursor: pointer" x="10" y="10" width="80" height="80" fill="red"></rect> </svg>`,
  case09 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <circle r="25" cx="25" cy="25" fill="red"></circle> </g> <g> <circle r="25" cx="50" cy="50" fill="green"></circle> </g> <g> <circle r="25" cx="75" cy="75" fill="blue"></circle> </g> <defs> <circle :cx="value.cx" :cy="value.cy" :fill="value.color" r="25"></circle> </defs> </svg>`,
  case10 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <circle r="25" id="circle0" cx="25" cy="25" fill="red"></circle> <text fill="white" x="22" y="31">1</text> </g> <g> <circle r="25" id="circle1" cx="50" cy="50" fill="green"></circle> <text fill="white" x="47" y="56">2</text> </g> <g> <circle r="25" id="circle2" cx="75" cy="75" fill="blue"></circle> <text fill="white" x="72" y="81">3</text> </g> <defs> <circle :id=""circle" + idx" :cx="value.cx" :cy="value.cy" :fill="value.color" r="25"></circle> <text g-content="idx + 1" :x="value.cx - 3" :y="value.cy + 6" fill="white"></text> </defs> </svg>`,
  case11 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <circle r="25" id="circle0" cx="25" cy="25" fill="red"></circle> <text fill="white" x="22" y="31">1</text> </g> <g> <circle r="25" id="circle1" cx="50" cy="50" fill="green"></circle> <text fill="white" x="47" y="56">2</text> </g> <g> <circle r="25" id="circle2" cx="75" cy="75" fill="blue"></circle> <text fill="white" x="72" y="81">3</text> </g> <defs> <circle :id=""circle" + idx" :cx="cx" :cy="cy" :fill="color" r="25"></circle> <text g-content="idx + 1" :x="cx - 3" :y="cy + 6" fill="white"></text> </defs> </svg>`,
  case12 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="50" cy="50" r="40" class="bordered warning"></circle> </svg>`,
  case13 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="25" cy="50" r="20" class="bordered warning"></circle> <circle cx="75" cy="50" r="20" class="bordered"></circle> </svg>`,
  case14 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="25" cy="50" r="20" class="bordered warning"></circle> <circle cx="75" cy="50" r="20" class="bordered"></circle> </svg>`,
  case15 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="25" cy="50" r="20" class="warning bordered"></circle> <circle cx="75" cy="50" r="20" class="bordered"></circle> </svg>`,
  case16 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="25" cy="50" r="20" style="stroke-width: 5; fill: orange; stroke: red;"></circle> <circle cx="75" cy="50" r="20" style="stroke-width: 5; fill: green; stroke: blue;"></circle> </svg>`,
  case17 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="25" cy="50" r="20" style="stroke-width: 5; fill: orange; stroke: red;"></circle> <circle cx="75" cy="50" r="20" style="stroke-width: 5"></circle> </svg>`,
  case18 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <circle cx="25" cy="50" r="20" style="stroke-width: 5; fill: orange; stroke: red;"></circle> <circle cx="75" cy="50" r="20" style="stroke-width: 5; fill: green; stroke: blue;"></circle> </svg>`,
  case19 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <style> .bordered { stroke-width: 5; stroke: red; } .warning { fill: orange; } </style> <text x="5" y="20" style="font-family: Arial, sans-serif;">Hello</text> <text x="5" y="40" style="font-family: Arial;">world</text> </svg>`,
  case20 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle r="10" id="circle1" cx="80" cy="20" fill="red"></circle> <circle r="10" id="circle2" cx="50" cy="50" fill="green"></circle> <circle r="10" id="circle3" cx="20" cy="80" fill="blue"></circle> </svg>`,
  case21 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <rect x="10" y="10" width="80" height="80" transform="translate(0,0)scale(0.2,0.1)"></rect> </g> <g> <rect x="10" y="10" width="80" height="80" transform="translate(20,0)scale(0.2,0.30000000000000004)"></rect> </g> <g> <rect x="10" y="10" width="80" height="80" transform="translate(40,0)scale(0.2,0.5)"></rect> </g> <g> <rect x="10" y="10" width="80" height="80" transform="translate(60,0)scale(0.2,0.7000000000000001)"></rect> </g> <g> <rect x="10" y="10" width="80" height="80" transform="translate(80,0)scale(0.2,0.9)"></rect> </g> <defs> <rect x="10" y="10" width="80" height="80" :transform="$$.translate(n * 20, 0).scale(0.2, (n * 0.2) + 0.1)"></rect> </defs> </svg>`,
  case22 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g> <circle r="25" id="circle_a" cx="25" cy="25" fill="red"></circle> <text fill="white" x="22" y="31">a</text> </g> <g> <circle r="25" id="circle_b" cx="50" cy="50" fill="green"></circle> <text fill="white" x="47" y="56">b</text> </g> <g> <circle r="25" id="circle_c" cx="75" cy="75" fill="blue"></circle> <text fill="white" x="72" y="81">c</text> </g> <defs> <circle :id=""circle_" + key" :cx="value.cx" :cy="value.cy" :fill="value.color" r="25"></circle> <text g-content="key" :x="value.cx - 3" :y="value.cy + 6" fill="white"></text> </defs> </svg>`,
  case23 : `<svg id="svg" style="border: 1px solid black; width: 125px; height: 125px;" viewbox="0 0 125 100"> <g> <circle r="25" id="circle_0" cx="25" cy="25" fill="red"></circle> <text fill="white" x="22" y="31">0</text> </g> <g> <circle r="25" id="circle_1" cx="50" cy="50" fill="green"></circle> <text fill="white" x="47" y="56">1</text> </g> <g> <circle r="25" id="circle_2" cx="75" cy="75" fill="blue"></circle> <text fill="white" x="72" y="81">2</text> </g> <g> <circle r="25" id="circle_3" cx="100" cy="100" fill="orange"></circle> <text fill="white" x="97" y="106">3</text> </g> <defs> <circle :id=""circle_" + idx" :cx="(idx + 1) * 25" :cy="(idx + 1) * 25" :fill="color" r="25"></circle> <text g-content="idx" :x="((idx + 1) * 25) - 3" :y="((idx + 1) * 25) + 6" fill="white"></text> </defs> </svg>`,
  case24 : `<svg id="svg" viewBox="0 0 200 200" width="200" height="200"> <g> <rect id="rect" height="18" width="18" fill="#00D800" x="0" y="0"></rect> </g> <g> <rect id="rect" height="18" width="18" fill="#00D800" x="20" y="0"></rect> </g> <g> <rect id="rect" height="18" width="18" fill="#00D800" x="40" y="0"></rect> </g> <g> <rect id="rect" height="18" width="18" fill="#00D800" x="60" y="0"></rect> </g> <g> <rect id="rect" height="18" width="18" fill="#00D800" x="80" y="0"></rect> </g> <defs> <rect id="rect" height="18" width="18" fill="#00D800" :x="(n - (Math.floor(n / 10) * 10)) * 20" :y="Math.floor(n / 10) * 20"></rect> </defs> </svg>`,
  case25 : `<svg id="svg" viewBox="0 0 200 200" width="200" height="200"> <!-- safe ---> <defs> <rect id="rect" height="18" width="18" fill="#00D800"></rect> </defs> <g> <use href="#rect" x="0" y="0"></use> </g> <g> <use href="#rect" x="20" y="0"></use> </g> <g> <use href="#rect" x="40" y="0"></use> </g> <g> <use href="#rect" x="60" y="0"></use> </g> <g> <use href="#rect" x="80" y="0"></use> </g> <defs> <use :x="(n - (Math.floor(n / 10) * 10)) * 20" :y="Math.floor(n / 10) * 20" href="#rect"></use> </defs> </svg>`,
  case26 : `<svg id="svg" viewBox="0 0 400 200" width="200" height="100"> <g> <rect y="0" height="200" width="38" fill="#00D800" x="0" style="visibility: inherit;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="40" style="visibility: inherit;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="80" style="visibility: inherit;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="120" style="visibility: inherit;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="160" style="visibility: inherit;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="200" style="visibility: hidden;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="240" style="visibility: hidden;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="280" style="visibility: hidden;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="320" style="visibility: hidden;"></rect> </g> <g> <rect y="0" height="200" width="38" fill="#00D800" x="360" style="visibility: hidden;"></rect> </g> <defs> <rect g-if="value > col" :x="col * 40" y="0" height="200" width="38" fill="#00D800"></rect> </defs> </svg>`,
  case30 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <g transform="translate(0, 25)" style="visibility: inherit;"> <circle cx="20" cy="20" r="20" fill="red"></circle> <g transform="translate(0, 30)" style="visibility: hidden;"> <circle cx="20" cy="20" r="20" fill="blue"></circle> </g> </g> <g transform="translate(50, 25)" style="visibility: hidden;"> <circle cx="20" cy="20" r="20" fill="orange"></circle> <g transform="translate(0, 30)" style="visibility: inherit;"> <circle cx="20" cy="20" r="20" fill="violet"></circle> </g> </g> </svg>`,
  case31 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="20" cy="20" fill="red"></circle> <circle cx="40" cy="40" fill="blue"></circle> <circle cx="60" cy="60" fill="green"></circle> <circle cx="80" cy="80" fill="orange"></circle> </svg>`,
  case32 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="20" cy="20" fill="red"></circle> <circle cx="40" cy="40" fill="blue"></circle> <circle cx="60" cy="60" fill="green"></circle> <circle cx="80" cy="80" fill="orange"></circle> </svg>`,
  case33 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="20" cy="20" r="20" fill="red"></circle> <circle cx="40" cy="40" r="20" fill="blue"></circle> <circle cx="60" cy="60" r="20" fill="green"></circle> <circle cx="80" cy="80" r="20" fill="orange"></circle> </svg>`,
  case34 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="20" cy="20" fill="red"></circle> <circle cx="40" cy="40" fill="blue"></circle> <circle cx="60" cy="60" fill="green"></circle> <circle cx="80" cy="80" fill="orange"></circle> </svg>`,
  case35 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px"> <circle cx="20" cy="20" fill="red"></circle> <circle cx="40" cy="40" fill="blue"></circle> <circle cx="60" cy="60" fill="green"></circle> <circle cx="80" cy="80" fill="orange"></circle> </svg>`,
  case36 : `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px;"> <g> <circle r="25" id="circle0" cx="25" cy="25" fill="red"></circle> <text fill="white" x="22" y="31">1</text> </g> <g> <circle r="25" id="circle1" cx="50" cy="50" fill="green"></circle> <text fill="white" x="47" y="56">2</text> </g> <g> <circle r="25" id="circle2" cx="75" cy="75" fill="blue"></circle> <text fill="white" x="72" y="81">3</text> </g> <defs> <circle :id=""circle" + idx" :cx="value.cx" :cy="value.cy" :fill="value.color" r="25"></circle> <text g-content="idx + 1" :x="value.cx - 3" :y="value.cy + 6" fill="white"></text> </defs> </svg>`,
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

    if (!['case27', 'case28', 'case29'].includes(code)) {
      test('compare source code result', async ({page}) => {
        const result = page.locator('#result');
        await expect(result).toHaveText(results[code]);
      });
    }

    test('compare image', async ({page}) => {
      if (!['case31', 'case32', 'case33', 'case34', 'case35'].includes(code)) {
        await wait(3000);
      }
      const show = page.locator('svg');
      await expect(show).toHaveScreenshot()
    });
  });
}
