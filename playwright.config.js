import { defineConfig } from '@playwright/test';

let options = '';

if (process.argv.includes('--project=web-component')) {
  process.env.port = '7201';
  options = '-t ./test/web-component/cases'
} else if (process.argv.includes('--project=svg')) {
  process.env.port = '7202';
  options = '-i /src/svg/gsvg.script.js ' +
            '-t test/svg/cases'
} else if (process.argv.includes('--project=svg.animateto')) {
  process.env.port = '7203';
  options = '-i /src/svg/gsvg.script.js' +
            '-i /src/svg/plugins/gsvg.animateto.script.js ' +
            '-t test/svg/plugins/animateto/cases'
}

const webServer = process.env.port ? {
  command             : `node ./tools/workbench ${ options } -p ${ process.env.port } -s`,
  url                 : `http://localhost:${ process.env.port }/`,
  reuseExistingServer : !process.env.CI,
} : undefined;

export default defineConfig({
  projects  : [
    {name : 'lib'},
    {name : 'web-component'},
    {name : 'svg'},
    {name : 'svg.animateto'},
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

