import { Page, test } from '@playwright/test';

export async function visualStep(page: Page, title: string, action: () => Promise<void>) {
  await test.step(title, async () => {
    await action();
    await test.info().attach(title, { body: await page.screenshot(), contentType: 'image/png' });
  });
}
