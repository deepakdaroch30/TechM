import { expect, test, type Locator } from '@playwright/test';

function previewValue(value: string) {
  if (!value) return '(empty)';
  if (value.length <= 48) return value;
  return `${value.slice(0, 45)}...`;
}

async function runLoggedStep(stepTitle: string, fn: () => Promise<void>) {
  await test.step(stepTitle, async () => {
    console.log(`[STEP] ${stepTitle}`);
    try {
      await fn();
      console.log(`[PASS] ${stepTitle}`);
    } catch (error: any) {
      const message = error?.message ? String(error.message) : 'Unknown Playwright error';
      console.error(`[FAIL] ${stepTitle} :: ${message}`);
      throw error;
    }
  });
}

export async function fillText(locator: Locator, label: string, value: string) {
  await runLoggedStep(`Fill textbox: ${label}`, async () => {
    await expect(locator, `Textbox should be visible before filling: ${label}`).toBeVisible();
    await locator.fill('');
    await locator.fill(value);
    console.log(`[DATA] ${label} <= ${previewValue(value)}`);
  });
}

export async function clickElement(locator: Locator, label: string) {
  await runLoggedStep(`Click control: ${label}`, async () => {
    await expect(locator, `Control should be visible before click: ${label}`).toBeVisible();
    await locator.click();
  });
}

export async function selectDropdownOption(locator: Locator, label: string, value: string) {
  await runLoggedStep(`Select dropdown: ${label} -> ${value}`, async () => {
    await expect(locator, `Dropdown should be visible before selection: ${label}`).toBeVisible();
    await locator.selectOption(value);
  });
}

export async function assertVisible(locator: Locator, label: string) {
  await runLoggedStep(`Assert visible: ${label}`, async () => {
    await expect(locator, `Expected visible: ${label}`).toBeVisible();
  });
}

export async function assertNotVisible(locator: Locator, label: string) {
  await runLoggedStep(`Assert hidden: ${label}`, async () => {
    await expect(locator, `Expected hidden: ${label}`).not.toBeVisible();
  });
}

export async function assertCount(locator: Locator, label: string, count: number) {
  await runLoggedStep(`Assert count: ${label} -> ${count}`, async () => {
    await expect(locator, `Expected count ${count}: ${label}`).toHaveCount(count);
  });
}
