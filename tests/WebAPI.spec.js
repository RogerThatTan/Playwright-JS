const { expect, test, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');
const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
};
const orderPayload = {
  orders: [{ country: 'Cuba', productOrderedId: '67a8dde5c0d3e6622a297cc8' }],
};
let token;
let orderId;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  apiUtils.createOrder(orderPayload);
});

//Create order is successfull
test('Browser Context Playwright Test', async ({ page }) => {
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  const orderId = createOrder(orderPayload);
  //adding token from the API into browser local storage.
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

  //await page.waitForLoadState('networkidle'); //we are asking to wait till the network is idle so that we can get the AllTitle of the cardboard otherwise without this wait it will reutrn empoty array due to no proper loading
  //alternate wait
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  //now we will verify the order page that order is placed successfully
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  await page.pause();

  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing history page
//Precondtion - create order - get order id
