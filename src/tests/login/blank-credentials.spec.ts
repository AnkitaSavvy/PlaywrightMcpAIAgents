// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';
import { credentials } from '../../config/credentials';

test.describe('Login', () => {
  test('Blank credentials do not log in', async ({ page, loginPage }) => {
    await loginPage.open();

    // 1. Click Login with both fields empty
    await loginPage.loginButton.click();
    await expect(page).toHaveTitle('TTACart - Login');
    await expect(loginPage.usernameInput).toBeFocused();
    await expect(loginPage.errorAlert).toHaveCount(0);

    // 2. Fill only Username, click Login
    await loginPage.usernameInput.fill(credentials.username);
    await loginPage.loginButton.click();
    await expect(page).toHaveTitle('TTACart - Login');
    await expect(loginPage.passwordInput).toBeFocused();
    await expect(loginPage.errorAlert).toHaveCount(0);

    // 3. Fill only Password, click Login
    await loginPage.usernameInput.clear();
    await loginPage.passwordInput.fill(credentials.password);
    await loginPage.loginButton.click();
    await expect(page).toHaveTitle('TTACart - Login');
    await expect(loginPage.usernameInput).toBeFocused();
    await expect(loginPage.errorAlert).toHaveCount(0);
  });
});
