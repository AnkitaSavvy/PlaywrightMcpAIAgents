// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';

test.describe('Checkout', () => {
  test('Checkout form: all fields blank', async ({ page, onCheckoutInfo }) => {
    // 1. Click Continue with all fields empty
    await onCheckoutInfo.continue();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(onCheckoutInfo.errorAlert).toHaveText('Error: First Name is required');
  });
});
