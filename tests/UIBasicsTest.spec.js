const { test, expect } = require('@playwright/test');
//annonymus function doesnt need function name in modern JS

test('Browser Context Playwright Test', async ({ browser }) => {
  //CHROME-plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
});

test('Page Playwright Test', async ({ page }) => {
  await page.goto('https:google.com');
  //get the title
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});

test.only('UI Control Dropdown & Radio Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const dropDown = page.locator('select.form-control ');
  await dropDown.selectOption('consult');
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  await page.pause();
});
