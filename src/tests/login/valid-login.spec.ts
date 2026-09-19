// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';

test.describe('Login', () => {
  test('Valid login lands on products page', async ({ page, loginPage, inventoryPage }) => {
    // 1. Fill Username and Password, click Login
    await loginPage.open();
    await loginPage.loginAs(credentials.username, credentials.password);

    await expect(page).toHaveURL(/\/inventory/);
    await expect(page).toHaveTitle('TTACart - Products');
    await expect(inventoryPage.productButtons).toHaveCount(6);
  });
});
