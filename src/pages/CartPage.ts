import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton = this.page.locator('[data-test="checkout"]');

  constructor(page: Page) {
    super(page);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
