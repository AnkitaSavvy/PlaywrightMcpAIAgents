// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';

test.describe('Login', () => {
  test('Unknown username shows error', async ({ page, loginPage }) => {
    // 1. Fill an unknown Username and valid Password, click Login
    await loginPage.open();
    await loginPage.loginAs('nouser', credentials.password);

    await expect(page).toHaveTitle('TTACart - Login');
    await expect(loginPage.errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
