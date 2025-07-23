const { test, expect } = require('@playwright/test');
//annonymus function doesnt need function name in modern JS

test.only('Browser Context Playwright Test', async ({ browser }) => {
  //CHROME-plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  //css, Xpath

  await page.locator('#username').fill('rahulshettyacadem');
  await page.locator('[type=password]').fill('learning');
  await page.locator('#signInBtn').click();

  //error is dynamic
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

test('Page Playwright Test', async ({ page }) => {
  await page.goto('https:google.com');
  //get the title
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});
