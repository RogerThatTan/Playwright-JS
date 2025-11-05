const { LoginPage } = require('./LoginPage.js');
const { DashboardPage } = require('./DashboardPage.js');
const { CartPage } = require('./CartPage.js');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
class POManager {
  constructor(page) {
    this.page = page;
    this._loginPage = null;
    this._dashboardPage = null;
    this._cartPage = null;
    this._ordersHistoryPage = null;
    this._ordersReviewPage = null;
  }

  getLoginPage() {
    if (!this._loginPage) {
      this._loginPage = new LoginPage(this.page);
    }
    return this._loginPage;
  }
  getCartPage() {
    if (!this._cartPage) {
      this._cartPage = new CartPage(this.page);
    }
    return this._cartPage;
  }
  getDashboardPage() {
    if (!this._dashboardPage) {
      this._dashboardPage = new DashboardPage(this.page);
    }
    return this._dashboardPage;
  }

  getOrdersHistoryPage() {
    if (!this._ordersHistoryPage) {
      this._ordersHistoryPage = new OrdersHistoryPage(this.page);
    }
    return this._ordersHistoryPage;
  }

  getOrdersReviewPage() {
    if (!this._ordersReviewPage) {
      this._ordersReviewPage = new OrdersReviewPage(this.page);
    }
    return this._ordersReviewPage;
  }
}
module.exports = { POManager };
