// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { checkoutDetails } from '../../testdata/checkout';
import { visualStep } from '../../utils/visualStep';

test.describe('Checkout', () => {
  test('Happy path: complete an order end to end', async ({
    page,
    loggedIn,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // 1. Log in (handled by the loggedIn fixture)
    await expect(page).toHaveTitle('TTACart - Products');

    // 2. Add the first product to the cart
    await loggedIn.addFirstItemToCart();
    await expect(loggedIn.productButtons.first()).toHaveText('Remove');
    await expect(loggedIn.cartLink).toHaveText('1');

    // 3. Open the cart
    await loggedIn.openCart();
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
    await expect(page.getByText('$15.99')).toBeVisible();

    // 4. Click Checkout
    await cartPage.checkout();
    await expect(page).toHaveTitle('TTACart - Checkout: Your Information');

    // 5. Fill the details and continue
    await checkoutInfoPage.submit(checkoutDetails);
    await expect(page).toHaveTitle('TTACart - Checkout: Overview');
    await expect(checkoutOverviewPage.paymentInfo).toBeVisible();
    await expect(checkoutOverviewPage.shippingInfo).toBeVisible();
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $15.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $1.28');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $17.27');

    // 6. Click Finish
    await visualStep(page, 'Finish the order', () => checkoutOverviewPage.finish());
    await expect(page).toHaveTitle('TTACart - Checkout: Complete!');
    await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
    await expect(checkoutCompletePage.dispatchMessage).toBeVisible();

    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/\/inventory/);
  });
});
