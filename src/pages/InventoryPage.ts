import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productButtons = this.page.getByRole('button', { name: /add to cart|remove/i });
  readonly addToCartButtons = this.page.locator('[data-test^="add-to-cart"]');
  readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');

  constructor(page: Page) {
    super(page);
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async addFirstItemsToCart(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addToCartButtons.first().click();
    }
  }

  async removeFirstItem() {
    await this.productButtons.first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
