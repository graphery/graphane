import { test, expect } from '@playwright/test';
import getName          from '../../../tools/playwright-helper/getname.js';
import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';

const ROOT          = '/src';
const IMPORT_LIB    = ROOT + '/lib/gsvg.script.js';
const IMPORT_PLUGIN = ROOT + '/plugins/debug.script.js';
const URL           = '/test/plugins/debug/cases/';
const FOLDER        = './test/plugins/debug/cases/';

const results = {
  case01       : 'gSVG debug - call gSVG(  )gSVG debug - call svg.viewBox( "0 0 100 100" )gSVG debug - call svg.width( 100 )gSVG debug - call svg.height( 100 )gSVG debug - call svg.add( "rect" )gSVG debug - call rect.x( 5 )gSVG debug - call rect.y( 5 )gSVG debug - call rect.width( 90 )gSVG debug - call rect.height( 90 )gSVG debug - call rect.stroke_width( 5 )gSVG debug - call rect.stroke( "black" )gSVG debug - call rect.fill( "none" )gSVG debug - call svg.attachTo( "#show" )',
  case02       : /gSVG debug - unknown method rect.kk\(\) .*/,
  case03       : /gSVG debug - invalid element svg.add\( 'kk' \) .*/,
  case04       : /.*gSVG debug - call svg.sum\( 10, 10 \).*gSVG debug - unknown method svg.mult\(\).*/,
  case05       : /gSVG debug - unknown method rect.x1\(\).*/,
  case06       : /.*gSVG debug - call rect.style.stroke_width\( 5 \).*/,
  case07       : /gSVG debug - unknown method rect.style.kk\(\).*/,
  case08       : /.*gSVG debug - call rect.classList.add\( "red" \).*/,
  case09       : /gSVG debug - unknown method rect.classList.delete\(\).*/,
  case10       : /.*gSVG debug - call path.d.M\( 5, 5 \).*/,
  case11       : /gSVG debug - unknown method path.d.circle\(\).*/,
  case12       : /.*gSVG debug - call path.d.rect\( 5, 5, 90, 90 \).*/,
  case13       : /^$/,
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

    test('compare log result', async ({page}) => {
      const result = page.locator('#log');
      await expect(result).toHaveText(results[code]);
    });

    test('compare image', async ({page}) => {
      const show = page.locator('#show svg');
      await expect(show).toHaveScreenshot()
    });

  });
}
