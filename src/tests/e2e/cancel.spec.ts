// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';

test.describe('Checkout', () => {
  test('Cancel checkout returns to cart', async ({ page, onCheckoutInfo }) => {
    // 1. Click Cancel on the checkout information page
    await onCheckoutInfo.cancelLink.click();

    await expect(page).toHaveURL(/\/cart/);
    await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
  });
});
