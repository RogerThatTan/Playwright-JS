const { test, expect } = require('@playwright/test');
const { single } = require('rxjs');
//annonymus function doesnt need function name in modern JS

test.only('Browser Context Playwright Test', async ({ browser }) => {
  //CHROME-plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');

  //css, Xpath

  await userName.fill('rahulshetty');
  await page.locator('[type=password]').fill('learning');
  await signIn.click();

  //error is dynamic
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  await userName.fill('');
  await userName.fill('rahulshettyacademy');
  await signIn.click();
  console.log(await page.locator('.card-body a').nth(0).textContent());
});

test('Page Playwright Test', async ({ page }) => {
  await page.goto('https:google.com');
  //get the title
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});
