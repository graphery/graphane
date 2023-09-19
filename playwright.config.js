import { defineConfig } from '@playwright/test';

if (process.argv.includes('--project=base')) {
  process.env.port = '7202';
}

const webServer = process.env.port ? {
  command             : `node ./tools/workbench -t ./test/component/cases -p ${ process.env.port } -s`,
  url                 : `http://localhost:${ process.env.port }/`,
  reuseExistingServer : !process.env.CI,
} : undefined;

export default defineConfig({
  projects  : [
    {name : 'base'},
    {name : 'lib'},
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

