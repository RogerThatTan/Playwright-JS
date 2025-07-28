const { expect, test, request } = require('@playwright/test');
const { application } = require('express');
const { json } = require('stream/consumers');
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
  //login API
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: loginPayLoad,
    },
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  // we need to parse it to extract the token
  token = loginResponseJson.token;
  console.log(token);

  //
  const orderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  );
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponse);
  orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {});

//Create order is successfull
test('Browser Context Playwright Test', async ({ browser, page }) => {
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
