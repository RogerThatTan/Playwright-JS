const { test, expect } = require('@playwright/test');

test('Security Test Request Intercept', async ({ page }) => {
  //login
  await page.goto('https://rahulshettyacademy.com/client');
  const userName = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const cardBody = await page.locator('.card-body b');
  await userName.fill('universuswebtech@gmail.com');
  await userPassword.fill('Iamking@000');
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await cardBody.first().waitFor();

  //login and reach orders page
  await page.locator("button[routerlink*='myorders']").click();

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    (route) =>
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator('p').last()).toHaveText(
    'You are not authorize to view this order',
  );
});
