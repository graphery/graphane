import { defineConfig } from '@playwright/test';

let options = '';

if (process.argv.includes('--project=composer')) {
  process.env.port = '7200';
  options          = '-i /src/component/composer.js ' +
                     '-t test/component/composer/cases';
} else if (process.argv.includes('--project=core')) {
  process.env.port = '7201';
  options          = '-t ./test/core/cases';
} else if (process.argv.includes('--project=svg')) {
  process.env.port = '7202';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-t test/lib/cases';
} else if (process.argv.includes('--project=animateto')) {
  process.env.port = '7203';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/animateto.script.js ' +
                     '-t test/plugins/animateto/cases';
} else if (process.argv.includes('--project=debug')) {
  process.env.port = '7204';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/debug.script.js ' +
                     '-t test/plugins/debug/cases';
} else if (process.argv.includes('--project=non.scaling.size')) {
  process.env.port = '7205';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/non.scaling.size.script.js ' +
                     '-t test/plugins/non.scaling.size/cases';
} else if (process.argv.includes('--project=observe.resize')) {
  process.env.port = '7206';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/observe.resize.script.js ' +
                     '-t test/plugins/observe.resize/cases';
} else if (process.argv.includes('--project=observe.style')) {
  process.env.port = '7207';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/observe.style.script.js ' +
                     '-t test/plugins/observe.style/cases';
} else if (process.argv.includes('--project=template.engine')) {
  process.env.port = '7208';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/template.engine.script.js ' +
                     '-t test/plugins/template.engine/cases';
} else if (process.argv.includes('--project=shapes')) {
  process.env.port = '7209';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/shapes.script.js ' +
                     '-t test/plugins/shapes/cases';
} else if (process.argv.includes('--project=load')) {
  process.env.port = '7210';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/template.engine.script.js ' +
                     '-i /src/plugins/load.script.js ' +
                     '-t test/plugins/load/cases';
} else if (process.argv.includes('--project=core.intersection')) {
  process.env.port = '7211';
  options          = '-t ./test/core.intersection/cases';
} else if (process.argv.includes('--project=plugin.intersection')) {
  process.env.port = '7212';
  options          = '-t ./test/plugin.intersection/cases';
} else if (process.argv.includes('--project=object')) {
  process.env.port = '7213';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/template.engine.script.js ' +
                     '-i /src/plugins/object.script.js ' +
                     '-t test/plugins/object/cases';
} else if (process.argv.includes('--project=tosource')) {
  process.env.port = '7214';
  options          = '-i /src/lib/gsvg.script.js ' +
                     '-i /src/plugins/template.engine.script.js ' +
                     '-i /src/plugins/tosource.script.js ' +
                     '-t test/plugins/tosource/cases';
}
const webServer = process.env.port ? {
  command             : `node ./tools/workbench ${ options } -p ${ process.env.port }`,
  url                 : `http://localhost:${ process.env.port }/`,
  timeout             : 120000,
  reuseExistingServer : !process.env.CI,
} : undefined;

export default defineConfig({
  projects      : [
    {name : 'helpers'},
    {name : 'core'},
    {name : 'composer'},
    {name : 'svg'},
    {name : 'animateto'},
    {name : 'debug'},
    {name : 'non.scaling.size'},
    {name : 'observe.resize'},
    {name : 'observe.style'},
    {name : 'template.engine'},
    {name : 'shapes'},
    {name : 'load'},
    {name : 'core.intersection'},
    {name : 'plugin.intersection'},
    {name : 'object'},
    {name : 'tosource'},
  ],
  testDir       : './test',
  fullyParallel : true,
  forbidOnly    : !!process.env.CI,
  retries       : process.env.CI ? 2 : 0,
  workers       : process.env.CI ? 1 : undefined,
  reporter      : 'list',
  use           : {
    trace    : 'on-first-retry',
    browsers : ['chromium'],
    viewport : {width : 1280, height : 720},
    baseURL  : `http://localhost:${ process.env.port }/`,
  },
  webServer,
});

