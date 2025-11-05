class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName) {
    const allTitles = await this.productsText.allTextContents();
    console.log(allTitles);
    const count = await this.products.count();
    // Adding product to cart - optimized to reduce DOM queries
    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);
      const productTitle = await product.locator('b').textContent();
      if (productTitle === productName) {
        //add to cart
        await product.locator('text= Add To Cart').click();
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
