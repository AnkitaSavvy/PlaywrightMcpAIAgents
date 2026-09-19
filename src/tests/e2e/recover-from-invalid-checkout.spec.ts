// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('End to end', () => {
  test('Order completes after fixing an invalid checkout form', async ({
    page,
    onCheckoutInfo,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // 1. Submit the blank form
    await onCheckoutInfo.continue();
    await expect(onCheckoutInfo.errorAlert).toHaveText('Error: First Name is required');

    // 2. Submit with only the first name
    await onCheckoutInfo.submit({ firstName: checkoutDetails.firstName });
    await expect(onCheckoutInfo.errorAlert).toHaveText('Error: Last Name is required');

    // 3. Complete the remaining fields and continue
    await onCheckoutInfo.submit({
      lastName: checkoutDetails.lastName,
      postalCode: checkoutDetails.postalCode,
    });
    await expect(page).toHaveURL(/checkout-step-two/);

    // 4. Finish the order
    await checkoutOverviewPage.finish();
    await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
  });
});
