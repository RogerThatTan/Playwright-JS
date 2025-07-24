const { test, expect } = require('@playwright/test');
//annonymus function doesnt need function name in modern JS

test('Browser Context Playwright Test', async ({ browser }) => {
  //CHROME-plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
});

test('Page Playwright Test', async ({ page }) => {
  await page.goto('https:google.com');
  //get the title
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
});

test('UI Control Dropdown,Checkbox & Radio Test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const dropDown = page.locator('select.form-control ');
  const documentLink = page.locator("[href*='documents-request']");
  await dropDown.selectOption('consult');

  //radio button working
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  //assertion
  console.log(await page.locator('.radiotextsty').last().isChecked());
  await expect(page.locator('.radiotextsty').last()).toBeChecked();

  //checkbox working
  await page.locator('#terms').click();
  await expect(page.locator('.radiotextsty').last()).toBeChecked();
  await page.locator('#terms').uncheck();
  expect(await page.locator('#terms').isChecked()).toBeFalsy();

  //checking the blinking text
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  //await page.pause();
});

test('Child Window Handle Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const documentLink = page.locator("[href*='documents-request']");

  //this promise is for handling new tabs
  const [newPage] = await Promise.all(
    //to run this bellow two line parallely
    [
      context.waitForEvent('page'), //listen any new page open (pending,rejected,fullfilled)
      documentLink.click(), //new page is opened
    ],
  );

  //grabing domain from the new tab and use it into previous login page username informtaion.
  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(domain);
  await page.locator('#username').fill(domain);
  await page.pause();
});
