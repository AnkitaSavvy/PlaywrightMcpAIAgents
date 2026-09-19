import { Page } from '@playwright/test';
import { createLogger } from '../utils/logger';

export abstract class BasePage {
  protected readonly log = createLogger(this.constructor.name);

  constructor(protected readonly page: Page) {}

  async goto(path = './') {
    this.log.info(`goto ${path}`);
    await this.page.goto(path);
  }
}
