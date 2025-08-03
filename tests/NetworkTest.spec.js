const { expect, test, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');
const loginPayLoad = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
};
const orderPayload = {
  orders: [{ country: 'Cuba', productOrderedId: '67a8dde5c0d3e6622a297cc8' }],
};

const fakePayLoadOrders = {
  data: [],
  message: 'No Orders',
};

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
});

//Create order is successfull
test('Browser Context Playwright Test', async ({ page }) => {
  //adding token from the API into browser local storage.
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  //await page.waitForLoadState('networkidle'); //we are asking to wait till the network is idle so that we can get the AllTitle of the cardboard otherwise without this wait it will reutrn empoty array due to no proper loading
  //alternate wait
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //intercepting response - API response  -> {fakeResponse} --> browser -> render data on fornt end
    },
  );
  //now we will verify the order page that order is placed successfully
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
  );
  console.log(await page.locator('.mt-4').textContent());
});

//Verify if order created is showing history page
//Precondtion - create order - get order id
