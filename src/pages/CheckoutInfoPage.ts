import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutDetails {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

export class CheckoutInfoPage extends BasePage {
  readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  readonly continueButton = this.page.locator('[data-test="continue"]');
  readonly cancelLink = this.page.getByRole('link', { name: 'Cancel' });
  readonly errorAlert = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  private async waitUntilReady() {
    await this.page.waitForLoadState('networkidle');
  }

  async fill({ firstName, lastName, postalCode }: CheckoutDetails) {
    await this.waitUntilReady();
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.waitUntilReady();
    await this.continueButton.click();
  }

  async submit(details: CheckoutDetails) {
    await this.fill(details);
    await this.continue();
  }
}
