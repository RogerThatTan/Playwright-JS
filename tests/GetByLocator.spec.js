import { test, expect } from "@playwright/test";

test("Playwright Special locator Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await await page.getByPlaceholder("Password").fill("");
  await page.getByLabel("Gender").selectOption("Male");
});
