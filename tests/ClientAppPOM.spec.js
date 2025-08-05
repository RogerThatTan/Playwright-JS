const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base.js');
const { POManager } = require('../pageobjects/POManager.js');
//Json->string->js object
const dataSet = JSON.parse(
  JSON.stringify(require('../utils/placeOrderTestData.json')),
);

for (const data of dataSet) {
  test(`Parametrized Data Test for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    //In the cart page now and checking the right product is added
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect('ind', 'India');
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

customtest(
  `Parametrized Data Custom Test`,
  async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    await loginPage.goTo();
    await loginPage.validLogin(
      testDataForOrder.username,
      testDataForOrder.password,
    );
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    //In the cart page now and checking the right product is added
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
  },
);
