// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';

const variations = [
  { label: 'hyphen and apostrophe in name', firstName: "Mary-Jane", lastName: "O'Neil", postalCode: '12345' },
  { label: 'space in last name and postal code', firstName: 'Anna', lastName: 'Smith Jones', postalCode: 'SW1A 1AA' },
  { label: 'long values', firstName: 'A'.repeat(50), lastName: 'B'.repeat(50), postalCode: '1'.repeat(10) },
];

test.describe('End to end', () => {
  for (const data of variations) {
    test(`Valid checkout data variation completes the order: ${data.label}`, async ({
      page,
      onCheckoutInfo,
      checkoutOverviewPage,
      checkoutCompletePage,
    }) => {
      // 1. Fill the checkout form with the variation and continue
      await onCheckoutInfo.submit(data);
      await expect(page).toHaveURL(/checkout-step-two/);

      // 2. Finish the order
      await checkoutOverviewPage.finish();
      await expect(page).toHaveURL(/checkout-complete/);
      await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
    });
  }
});
