// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';

test.describe('Login', () => {
  test('Locked-out user cannot log in', async ({ page, loginPage }) => {
    // 1. Fill locked_out_user and Password, click Login
    await loginPage.open();
    await loginPage.loginAs(credentials.lockedOutUsername, credentials.password);

    await expect(page).toHaveTitle('TTACart - Login');
    await expect(loginPage.errorAlert).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});
