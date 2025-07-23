const { test } = require('@playwright/test');
//annonymus function doesnt need function name in modern JS

test('First Playwright Test', async ({ browser }) => {
  //CHROME-plugins/cookies

  const context = browser.newContext();
});
