import { test, expect } from '@playwright/test';

test('should have correct page title', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
  await expect(page).toHaveTitle(/TTACart/);
});

