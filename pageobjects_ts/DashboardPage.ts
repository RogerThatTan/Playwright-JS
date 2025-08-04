import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  page: Page;
  products: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;
  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName: string) {
    const allTitles = await this.productsText.allTextContents();
    console.log(allTitles);
    const count = await this.products.count();
    // Adding ZARA COAT 3
    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator('b').textContent()) === productName
      ) {
        //add to cart
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }

  async navigateToOrders() {
    await this.orders.click();
  }
}
module.exports = { DashboardPage };
