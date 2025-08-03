const base = require('@playwright/test');
exports.customtest = base.test.extend({
  testDataForOrder: {
    username: 'universuswebtech@gmail.com',
    password: 'Iamking@000',
    productName: 'ZARA COAT 3',
  },
});
