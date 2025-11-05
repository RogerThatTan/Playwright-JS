class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator('tbody');
    this.rows = page.locator('tbody tr');
    this.orderdIdDetails = page.locator('.col-text');
  }
  async searchOrderAndSelect(orderId) {
    await this.ordersTable.waitFor();
    const rowsCount = await this.rows.count();
    for (let i = 0; i < rowsCount; ++i) {
      const row = this.rows.nth(i);
      const rowOrderId = await row.locator('th').textContent();
      if (orderId.includes(rowOrderId)) {
        await row.locator('button').first().click();
        break;
      }
    }
  }

  async getOrderId() {
    return await this.orderdIdDetails.textContent();
  }
}
module.exports = { OrdersHistoryPage };
