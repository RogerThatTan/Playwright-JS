// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    //assertion validation
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    //Browser options
    browserName: 'firefox',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
};

module.exports = config;
