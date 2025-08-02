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
  // await page.pause();

  page.on('dialog', (dialog) => dialog.accept());
  //   page.on('dialog', (dialog) => dialog.dismiss()); //to cancel/reject the pop up
  await page.locator('#confirmbtn').click();

  //Mouse Hover
  await page.locator('#mousehover').hover();
  // .text
  //Switching to another iFrames in main HTML
  await page.pause();

  const framesPage = page.frameLocator('#courses-iframe');
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator('.text h2').textContent();
  console.log(textCheck.split(' ')[1]);
});

test.only('Screenshot and Visual Comparison', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#displayed-text').screenshot({ path: 'partial.png' });
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
});
