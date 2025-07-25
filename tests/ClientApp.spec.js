const { test, expect } = require('@playwright/test');
const { single } = require('rxjs');
//annonymus function doesnt need function name in modern JS

test('Browser Context Playwright Test', async ({ browser, page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  const userName = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const cardBody = await page.locator('.card-body b');

  await userName.fill('anshika@gmail.com');
  await userPassword.fill('Iamking@000');
  await page.locator("[value='Login']").click();

  //await page.waitForLoadState('networkidle'); //we are asking to wait till the network is idle so that we can get the AllTitle of the cardboard otherwise without this wait it will reutrn empoty array due to no proper loading
  //alternate wait
  await cardBody.first().waitFor();
  const allTitles = await cardBody.allTextContents();
  console.log(allTitles);
});
