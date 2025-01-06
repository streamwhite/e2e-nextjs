import { expect, test } from '@playwright/test';
import { confidentials, testIds } from './constants';

const { email, password, wrongEmail, wrongPassword } = confidentials.signin;

test.describe('Sign In', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
  });

  test('should sign in successfully', async ({ page }) => {
    await page.fill(`[data-testid="${testIds.emailInput}"]`, email);
    await page.fill(`[data-testid="${testIds.passwordInput}"]`, password);
    await page.click(`[data-testid="${testIds.signInButton}"]`);
    await page.waitForSelector(`[data-testid="${testIds.signedIn}"]`);
    await expect(
      page.locator(`[data-testid="${testIds.signedIn}"]`)
    ).toBeVisible();
  });

  test('should show error for incorrect credentials', async ({ page }) => {
    await page.fill(`[data-testid="${testIds.emailInput}"]`, wrongEmail);
    await page.fill(`[data-testid="${testIds.passwordInput}"]`, wrongPassword);
    await page.click(`[data-testid="${testIds.signInButton}"]`);
    await page.waitForSelector(`[data-testid="${testIds.signInError}"]`);
    await expect(
      page.locator(`[data-testid="${testIds.signInError}"]`)
    ).toBeVisible();
  });
});
