import { test, expect } from '@playwright/test';
import { getExecutionCredentials } from './framework/support/runtime';

test('basic test', async ({ page }) => {
  const credentials = getExecutionCredentials();
  console.log('Execution actor:', credentials.actorEmail || 'local-user');
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveURL(/.*/);
});