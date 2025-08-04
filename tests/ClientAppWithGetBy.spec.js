const { test, expect } = require('@playwright/test');

test('E2E With GetByLocators Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  const productName = 'ZARA COAT 3';
  const userName = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const cardBody = await page.locator('.card-body b');
  const products = page.locator('.card-body');
  const email = 'universuswebtech@gmail.com';

  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();

  //adding product to cart
  await page
    .locator('.card-body')
    .filter({ hasText: productName })
    .getByRole('button', { name: ' Add to Cart' })
    .click();

  await page
    .getByRole('listitem')
    .getByRole('button', { name: 'Cart' })
    .click();

  await page.locator('div li').first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  await page.getByRole('button', { name: 'India' }).nth(1).click();
  await page.getByText('PLACE ORDER').click();
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();
});
