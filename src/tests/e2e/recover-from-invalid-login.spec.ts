// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('End to end', () => {
  test('Order completes after a failed login is corrected', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // 1. Log in with a wrong password
    await loginPage.open();
    await loginPage.loginAs(credentials.username, 'wrong_pass');
    await expect(loginPage.errorAlert).toBeVisible();

    // 2. Correct the password and log in
    await loginPage.passwordInput.fill(credentials.password);
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/\/inventory/);

    // 3. Place an order
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submit(checkoutDetails);
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutCompletePage.thankYouHeading).toBeVisible();
  });
});
