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

  //radio button working
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  //assertion
  console.log(await page.locator('.radiotextsty').last().isChecked());
  await expect(page.locator('.radiotextsty').last()).toBeChecked();

  //checkbox working
  await page.locator('#terms').click();
  await expect(page.locator('.radiotextsty').last()).toBeChecked();
  await page.locator('#terms').uncheck();
  expect(await page.locator('#terms').isChecked()).toBeFalsy();

  //await page.pause();
});
