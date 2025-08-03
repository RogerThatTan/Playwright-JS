// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    //assertion validation
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        //Browser options
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on',
      },
    },
    {
      name: 'firefox',
      use: {
        //Browser options
        browserName: 'firefox',
        headless: true,
        screenshot: 'on',
        trace: 'on',
      },
    },
  ],
};

module.exports = config;
