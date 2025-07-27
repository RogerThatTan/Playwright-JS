const { test, expect } = require('@playwright/test');

test('Popup Validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //   await page.goto('https://www.google.com/');
  //   await page.goBack(); //it will go back to rahul again from google
  //   await page.goForward(); //it will go to google from rahul

  //this code block is for hide/show elements
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();

  //how to handle alert JS pop up which is know dialogue in PlayWright
  await page.pause();

  page.on('dialog', (dialog) => dialog.accept());
  //   page.on('dialog', (dialog) => dialog.dismiss()); //to cancel/reject the pop up
  await page.locator('#confirmbtn').click();

  //Mouse Hover
  await page.locator('#mousehover').hover();
  await page.getByRole('link', { name: 'Top' }).click();
});
