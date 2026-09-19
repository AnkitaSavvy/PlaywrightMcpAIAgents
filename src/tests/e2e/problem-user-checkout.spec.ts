// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';
import { checkoutDetails } from '../../testdata/checkout';

test.describe('End to end', () => {
  test('Problem user cannot complete checkout (known site defect)', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
  }) => {
    // 1. Log in as problem_user, add an item and check out
    await loginPage.open();
    await loginPage.loginAs('problem_user', credentials.password);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();

    // 2. Fill valid details and continue
    await checkoutInfoPage.submit(checkoutDetails);

    // The form does not keep the entered values, so checkout is rejected
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutInfoPage.errorAlert).toHaveText('Error: First Name is required');
  });
});
