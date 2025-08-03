const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');

//annonymus function doesnt need function name in modern JS
test('Browser Context Playwright Test', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const email = 'universuswebtech@gmail.com';
  const password = 'Iamking@000';
  const productName = 'ZARA COAT 3';
  await loginPage.goTo();
  await loginPage.validLogin(email, password);
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

  //In the cart page now and checking the right product is added
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect('ind', 'India');
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  await page.pause();
});
