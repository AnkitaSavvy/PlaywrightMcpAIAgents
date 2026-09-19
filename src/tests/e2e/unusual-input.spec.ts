// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';

test.describe('Checkout', () => {
  test('Checkout form: unusual input', async ({ page, onCheckoutInfo }) => {
    // 1. Enter special characters and digits in names, letters in postal code, click Continue
    await onCheckoutInfo.submit({ firstName: '!@#$%', lastName: '12345', postalCode: 'ABCDE' });

    // The app applies no format validation, so the order overview opens
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(onCheckoutInfo.errorAlert).toHaveCount(0);
  });
});
