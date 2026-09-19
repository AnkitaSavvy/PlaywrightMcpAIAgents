// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';

const protectedPaths = ['inventory', 'cart', 'checkout-step-one', 'checkout-step-two', 'checkout-complete'];

test.describe('End to end', () => {
  for (const path of protectedPaths) {
    test(`Opening ${path} without logging in redirects to login`, async ({ page }) => {
      // 1. Open the page directly without logging in
      await page.goto(path);

      await expect(page).toHaveTitle('TTACart - Login');
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
  }
});
