import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly thankYouHeading = this.page.getByRole('heading', { name: 'Thank you for your order!' });
  readonly dispatchMessage = this.page.getByText(
    'Your order has been dispatched, and will arrive just as fast as the TTA Express pony can get there!',
  );
  readonly backHomeLink = this.page.getByRole('link', { name: 'Back Home' });

  constructor(page: Page) {
    super(page);
  }

  async backHome() {
    await this.backHomeLink.click();
  }
}
