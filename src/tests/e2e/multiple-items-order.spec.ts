// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('End to end', () => {
  test('Order with multiple items shows correct totals', async ({
    page,
    loggedIn,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // 1. Add the first three products
    await loggedIn.addFirstItemsToCart(3);
    await expect(loggedIn.cartLink).toHaveText('3');

    // 2. Open the cart and check out
    await loggedIn.openCart();
    await cartPage.checkout();

    // 3. Fill the details and continue
    await checkoutInfoPage.submit(checkoutDetails);
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $41.97');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $3.36');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $45.33');

    // 4. Finish the order
    await checkoutOverviewPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
  });
});
