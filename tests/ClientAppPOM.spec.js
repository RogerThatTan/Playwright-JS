const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');

//annonymus function doesnt need function name in modern JS
test('Browser Context Playwright Test', async ({ browser, page }) => {
  const poManger = new POManager(page);
  const loginPage = poManger.getLoginPage();
  const dashboardPage = poManger.getDashboardPage();
  const email = 'universuswebtech@gmail.com';
  const password = 'Iamking@000';
  const productName = 'ZARA COAT 3';
  await loginPage.goTo();
  await loginPage.validLogin(email, password);

  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();
  //In the cart page now and checking the right product is added
  await page.locator('div li').first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  //Now Lets checkout
  await page.locator('text=Checkout').click();

  await page.locator("[placeholder*='Country']").pressSequentially('ind');
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator('button').nth(i).textContent();
    if (text === ' India') {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }

  //now lets verify the email address in the cart
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  await page.locator('.action__submit').click();

  //Order complete verification
  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. ',
  );

  const orderID = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  console.log(orderID);

  //now we will verify the order page that order is placed successfully
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (orderID.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderID.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
