import { test as base } from '@playwright/test';
import { credentials } from '../config/credentials';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

type States = {
  loggedIn: InventoryPage;
  itemInCart: CartPage;
  onCheckoutInfo: CheckoutInfoPage;
};

export const test = base.extend<Pages & States>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutInfoPage: async ({ page }, use) => use(new CheckoutInfoPage(page)),
  checkoutOverviewPage: async ({ page }, use) => use(new CheckoutOverviewPage(page)),
  checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),

  loggedIn: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.open();
    await loginPage.loginAs(credentials.username, credentials.password);
    await use(inventoryPage);
  },

  itemInCart: async ({ loggedIn, cartPage }, use) => {
    await loggedIn.addFirstItemToCart();
    await loggedIn.openCart();
    await use(cartPage);
  },

  onCheckoutInfo: async ({ itemInCart, checkoutInfoPage }, use) => {
    await itemInCart.checkout();
    await use(checkoutInfoPage);
  },
});

export { expect } from '@playwright/test';
