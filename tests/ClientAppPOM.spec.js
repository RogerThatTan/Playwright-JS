const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage.js');
//annonymus function doesnt need function name in modern JS

test('Browser Context Playwright Test', async ({ browser, page }) => {
  const email = 'universuswebtech@gmail.com';
  const password = 'Iamking@000';
  const cardBody = await page.locator('.card-body b');

  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  loginPage.validLogin(email, password);
  await cardBody.first().waitFor();
  const allTitles = await cardBody.allTextContents();
  console.log(allTitles);
});
