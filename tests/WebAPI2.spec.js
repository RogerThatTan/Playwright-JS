const { test, expect } = require('@playwright/test');

//login from the UI ->.json

//test browser,cart-,order,orderdetails,orderhistory
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.getByPlaceholder('email@example.com').fill('anshika@gmail.com');
  await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
  await page.getByRole('button', { name: 'login' }).click();
  await page.waitForLoadState('networkidle');

  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Client App login', async () => {
  const email = 'anshika@gmail.com';
  const productName = 'ZARA COAT 3';
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');

  const products = page.locator('.card-body');
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
  const count = await products.count();
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
  //   await page.pause();
});

test('Test Case 2', async () => {
  const email = '';
  const productName = 'ZARA COAT 3';
  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');

  const products = page.locator('.card-body');
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
});
