const { expect, test } = require('@playwright/test');

test('Get by Text test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByText('Forgot Your Password?').click();
});

test('Get by label Test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByLabel('Remember me').click();
  await page.getByLabel('Remember me').click();
});

test('Get by placeholder Test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByPlaceholder('Remember me').fill('AVDS');
});

test('Get by Alternative Text Test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByAltText('Salesforce').click();
});

test('Get by Title Test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/about.htm');
  await page.getByTitle('ParaBank').click();
});

test('Get by Test ID Test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/about.htm');
  await page.getByTestId('').click();
});
