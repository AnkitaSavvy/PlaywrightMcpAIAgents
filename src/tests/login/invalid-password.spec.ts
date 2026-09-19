// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';

test.describe('Login', () => {
  test('Wrong password shows error', async ({ page, loginPage }) => {
    // 1. Fill Username and a wrong Password, click Login
    await loginPage.open();
    await loginPage.loginAs(credentials.username, 'wrong_pass');

    await expect(page).toHaveTitle('TTACart - Login');
    await expect(loginPage.errorAlert).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
