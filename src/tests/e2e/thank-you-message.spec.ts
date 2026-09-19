// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('Checkout', () => {
  test('Order confirmation shows thank-you message', async ({
    page,
    onCheckoutInfo,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // 1. Fill the checkout details and continue to the overview
    await onCheckoutInfo.submit(checkoutDetails);

    // 2. Click Finish
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page).toHaveTitle('TTACart - Checkout: Complete!');
    await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
    await expect(checkoutCompletePage.dispatchMessage).toBeVisible();
    await expect(checkoutCompletePage.backHomeLink).toBeVisible();
  });
});
