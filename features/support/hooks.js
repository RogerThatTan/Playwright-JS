const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager.js');
const playwright = require('@playwright/test');

// { tags: '@foo or @Regression' }
// { tags: '@foo and @Regression' }

Before({ tags: '@Regression or @Validation' }, async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'screenshot1.png' });
  }
});

After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log('I am last to execute');
});
