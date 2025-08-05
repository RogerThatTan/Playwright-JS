const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager.js');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
Given(
  'a login to Ecommerece application with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  },
);

When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.cartPage = this.poManager.getCartPage();
  await this.cartPage.VerifyProductIsDisplayed(productName);
  await this.cartPage.Checkout();
});

When('Enter valid details and Place the Order', async function () {
  // Write code here that turns the phrase above into concrete actions
  this.ordersReviewPage = this.poManager.getOrdersReviewPage();
  await this.ordersReviewPage.searchCountryAndSelect('ind', 'India');
  this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then('Verify the order is present in the OrderHistory', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
  this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(
    this.orderId.includes(await this.ordersHistoryPage.getOrderId()),
  ).toBeTruthy();
});
