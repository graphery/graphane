import { defineConfig } from '@playwright/test';

let options = '';

if (process.argv.includes('--project=web-component')) {
  process.env.port = '7201';
  options          = '-t ./test/web-component/cases';
} else if (process.argv.includes('--project=svg')) {
  process.env.port = '7202';
  options          = '-i /src/svg/gsvg.script.js ' +
                     '-t test/svg/cases';
} else if (process.argv.includes('--project=svg.animateto')) {
  process.env.port = '7203';
  options          = '-i /src/svg/gsvg.script.js ' +
                     '-i /src/svg/plugins/gsvg.animateto.script.js ' +
                     '-t test/svg/plugins/animateto/cases';
} else if (process.argv.includes('--project=svg.debug')) {
  process.env.port = '7204';
  options          = '-i /src/svg/gsvg.script.js ' +
                     '-i /src/svg/plugins/gsvg.debug.script.js ' +
                     '-t test/svg/plugins/debug/cases';
} else if (process.argv.includes('--project=svg.keep.aspect')) {
  process.env.port = '7205';
  options          = '-i /src/svg/gsvg.script.js ' +
                     '-i /src/svg/plugins/gsvg.keep.aspect.script.js ' +
                     '-t test/svg/plugins/keep.aspect/cases';
} else if (process.argv.includes('--project=svg.observe.resize')) {
  process.env.port = '7206';
  options          = '-i /src/svg/gsvg.script.js ' +
                     '-i /src/svg/plugins/gsvg.observe.resize.script.js ' +
                     '-t test/svg/plugins/observe.resize/cases';
} else if (process.argv.includes('--project=svg.observe.style')) {
  process.env.port = '7207';
  options          = '-i /src/svg/gsvg.script.js ' +
                     '-i /src/svg/plugins/gsvg.observe.style.script.js ' +
                     '-t test/svg/plugins/observe.style/cases';
}

const webServer = process.env.port ? {
  command             : `node ./tools/workbench ${ options } -p ${ process.env.port }`,
  url                 : `http://localhost:${ process.env.port }/`,
  timeout             : 120000,
  reuseExistingServer : !process.env.CI,
} : undefined;

export default defineConfig({
  projects      : [
    {name : 'lib'},
    {name : 'web-component'},
    {name : 'svg'},
    {name : 'svg.animateto'},
    {name : 'svg.debug'},
    {name : 'svg.keep.aspect'},
    {name : 'svg.observe.resize'},
    {name : 'svg.observe.style'},
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

