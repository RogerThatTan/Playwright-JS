const { expect, test } = require('@playwright/test');

test('Get by role test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Forgot login info?' }).click();
});
