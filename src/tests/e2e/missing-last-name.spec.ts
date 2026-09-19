// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('Checkout', () => {
  test('Checkout form: last name missing', async ({ page, onCheckoutInfo }) => {
    // 1. Fill only First Name, click Continue
    await onCheckoutInfo.submit({ firstName: checkoutDetails.firstName });

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(onCheckoutInfo.errorAlert).toHaveText('Error: Last Name is required');
  });
});
