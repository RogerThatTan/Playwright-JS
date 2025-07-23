const { test } = require('@playwright/test');
//annonymus function doesnt need function name in modern JS

test('Browser Context Playwright Test', async ({ browser }) => {
  //CHROME-plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Page Playwright Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  //continue automation
});
