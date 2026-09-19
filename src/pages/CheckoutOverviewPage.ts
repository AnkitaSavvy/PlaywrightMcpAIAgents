import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  readonly finishButton = this.page.locator('[data-test="finish"]');
  readonly paymentInfo = this.page.getByText('TTACard #31337');
  readonly shippingInfo = this.page.getByText('Free TTA Express Delivery!');
  readonly itemTotal = this.page.getByText(/Item total:/);
  readonly tax = this.page.getByText(/Tax:/);
  readonly total = this.page.getByText(/^Total:/);

  constructor(page: Page) {
    super(page);
  }

  async finish() {
    await this.finishButton.click();
  }
}
