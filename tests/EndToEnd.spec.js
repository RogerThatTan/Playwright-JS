const { test, expect } = require('@playwright/test');
const { single } = require('rxjs');
//annonymus function doesnt need function name in modern JS

test('Browser Context Playwright Test', async ({ browser, page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  const productName = 'ZARA COAT 3';
  const userName = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const cardBody = await page.locator('.card-body b');
  const products = page.locator('.card-body');
  const email = 'anshika@gmail.com';

  await userName.fill(email);
  await userPassword.fill('Iamking@000');
  await page.locator("[value='Login']").click();

  //await page.waitForLoadState('networkidle'); //we are asking to wait till the network is idle so that we can get the AllTitle of the cardboard otherwise without this wait it will reutrn empoty array due to no proper loading
  //alternate wait
  await cardBody.first().waitFor();
  const allTitles = await cardBody.allTextContents();
  console.log(allTitles);

  const count = await products.count();
  // Adding ZARA COAT 3
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      //add to cart
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }

  //In the cart page now and checking the right product is added
  await page.locator("[routerlink*='cart']").click();
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
