// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';
import { checkoutDetails, otherValidUsers } from '../../testdata/checkout';

test.describe('End to end', () => {
  for (const username of otherValidUsers) {
    test(`Other valid user completes an order: ${username}`, async ({
      page,
      loginPage,
      inventoryPage,
      cartPage,
      checkoutInfoPage,
      checkoutOverviewPage,
      checkoutCompletePage,
    }) => {
      // 1. Log in as the user
      await loginPage.open();
      await loginPage.loginAs(username, credentials.password);
      await expect(page).toHaveURL(/\/inventory/);

      // 2. Add the first item, open the cart and check out
      await inventoryPage.addFirstItemToCart();
      await expect(inventoryPage.cartLink).toHaveText('1');
      await inventoryPage.openCart();
      await cartPage.checkout();

      // 3. Fill the details, continue and finish
      await checkoutInfoPage.submit(checkoutDetails);
      await checkoutOverviewPage.finish();

      await expect(page).toHaveURL(/checkout-complete/);
      await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
    });
  }
});
