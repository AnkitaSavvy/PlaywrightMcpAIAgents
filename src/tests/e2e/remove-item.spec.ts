// spec: specs/ttacart-checkout-plan.md
// seed: src/seed.spec.ts
import { test, expect } from '../../fixtures/test-base';

test.describe('Checkout', () => {
  test('Remove item from cart', async ({ loggedIn }) => {
    // 1. Add the first item, then click Remove
    await loggedIn.addFirstItemToCart();
    await expect(loggedIn.cartLink).toHaveText('1');

    await loggedIn.removeFirstItem();
    await expect(loggedIn.addToCartButtons).toHaveCount(6);
    await expect(loggedIn.cartLink).toHaveText('');
  });
});
