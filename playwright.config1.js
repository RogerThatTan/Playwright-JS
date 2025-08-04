// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { permission } from 'process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  retries: 1, //failed test will re try again according to the number
  workers: 3, // it will use 1 worker for multiple tests
  timeout: 10 * 1000,
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
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on',
        //...devices['iPhone 11'],
      },
    },
    {
      name: 'firefox',
      use: {
        //Browser options
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        video: 'on-first-retry',
        ignoreHttpsErrors: true, //ssl ignore
        permissions: ['geolocation'], //for google location permissions
        trace: 'on',
        viewport: { width: 720, height: 720 },
      },
    },
  ],
};

module.exports = config;
