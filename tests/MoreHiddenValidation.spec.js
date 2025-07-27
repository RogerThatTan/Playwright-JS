const { test, expect } = require('@playwright/test');

test('Popup Validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //   await page.goto('https://www.google.com/');
  //   await page.goBack(); //it will go back to rahul again from google
  //   await page.goForward(); //it will go to google from rahul

  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
});
