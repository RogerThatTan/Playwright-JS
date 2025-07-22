const { test, expect } = require('@playwright/test');

test('CSS & Xpath Test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.locator("xpath=//*[@id='username']").fill('KolaKola');
  await page.locator('css=#password').fill('RCV');
});
