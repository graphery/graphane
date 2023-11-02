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
  case01 : `<svg viewBox="0 0 100 100" width="100" height="100"><path stroke="black" stroke-width="3" fill="red" d="M66.07270415933377,11.197059634525957L88.80294036547404,33.92729584066623L88.80294036547404,66.07270415933377L66.07270415933377,88.80294036547404L33.92729584066623,88.80294036547404L11.197059634525957,66.07270415933377L11.19705963452595,33.927295840666254L33.92729584066624,11.19705963452595Z"></path><text x="50" y="52" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-weight="bold" style="font-size: 1.2em;">STOP</text></svg>`,
  case02 : `<svg viewBox="0 0 100 100" width="100" height="100"><path stroke="black" stroke-width="3" fill="red" d="M8,50a42,42,0,1,0,84,0a42,42,0,1,0,-84,0"></path><rect x="20" y="40" width="60" height="20" fill="white"></rect></svg>`,
  case03 : `<svg viewBox="0 0 200 500" width="200" height="200"><path d="M100,150A100,100,0,0,0,0.38053019082543926,241.28442572523414L10.3424771717429,242.15598315271072A90,90,0,0,1,100,160Z"></path><path d="M205,250A105,105,0,0,0,109.1513529885041,145.3995567003667L107.40823813355094,165.32345066220162A85,85,0,0,1,185,250Z"></path><path d="M100,360A110,110,0,0,0,209.58141679009202,259.5871317022424L179.69557584733963,256.97245941981265A80,80,0,0,1,100,330Z"></path><path d="M-15,250A115,115,0,0,0,89.9770895840193,364.56239028055074L93.46331929392564,324.7146023568809A75,75,0,0,1,25,250Z"></path></svg>`,
  case04 : `<svg viewBox="0 0 200 500" width="200" height="200"><path fill="none" stroke-width="10" stroke="black" d="M0.38053019082543926,241.28442572523414A100,100,0,0,1,100,150"></path><path fill="none" stroke-width="10" stroke="black" d="M108.71557427476581,150.38053019082543A100,100,0,0,1,200,250"></path><path fill="none" stroke-width="10" stroke="black" d="M199.61946980917457,258.7155742747658A100,100,0,0,1,100,350"></path><path fill="none" stroke-width="10" stroke="black" d="M91.28442572523417,349.6194698091746A100,100,0,0,1,0,250"></path></svg>`,
  case05 : `<svg viewBox="0 0 200 500" width="200" height="200"><path d="M100,150L108.8167787843871,237.86474508437578L195.10565162951536,219.09830056250527L114.2658477444273,254.63525491562422L158.77852522924732,330.90169943749476L100,265L41.2214747707527,330.90169943749476L85.7341522555727,254.63525491562422L4.89434837048465,219.09830056250522L91.1832212156129,237.86474508437578Z"></path></svg>`,
  case06 : `<svg viewBox="0 0 200 200" width="200"><circle fill="red" cx="75" cy="100" r="50"></circle><path fill="none" stroke-width="1" stroke="black" id="path" d="M23.038475772933687,130A60,60,0,0,0,126.96152422706632,70"></path><text><textPath href="#path" method="align">testing the path</textPath></text></svg>`,
  case07 : `<svg viewBox="0 0 200 200" width="200"><path fill="none" stroke-width="1" stroke="black" id="path" d="M100,1L185.73651497465943,149.5L14.263485025340572,149.5ZM1,100a99,99,0,1,0,198,0a99,99,0,1,0,-198,0"></path></svg>`,
  case08 : `<svg viewBox="0 0 200 200" width="200"><circle fill="red" cx="100" cy="100" r="100"></circle><path fill="none" stroke-width="1" stroke="black" id="path" d="M100,0L200,100L100,200L0,100.00000000000001Z"></path></svg>`,
  case09 : `<svg viewBox="0 0 200 200" width="200"><circle fill="red" cx="100" cy="100" r="100"></circle><path fill="none" stroke-width="1" stroke="black" id="path" d="M100,0L195.10565162951536,69.09830056250526L158.77852522924732,180.90169943749476L41.2214747707527,180.90169943749476L4.89434837048465,69.09830056250523Z"></path></svg>`,
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
