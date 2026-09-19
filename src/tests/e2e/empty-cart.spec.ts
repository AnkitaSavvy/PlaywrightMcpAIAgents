// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('Checkout', () => {
  test('Checkout with empty cart', async ({
    page,
    loggedIn,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    // 1. Open the cart without adding items, click Checkout
    await loggedIn.openCart();
    await expect(page).toHaveURL(/\/cart/);
    await cartPage.checkout();

    // The app does not block checkout for an empty cart: it proceeds with a $0.00 total
    await expect(page).toHaveURL(/checkout-step-one/);
    await checkoutInfoPage.submit(checkoutDetails);
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutOverviewPage.total).toHaveText('Total: $0.00');
  });
});
