import { confidentials, testIds } from '@/tests/auth/constants';
import { expect, test } from '@playwright/test';

const { email, password } = confidentials.signin;
const { sendEmailButton, emailSentMessage } = testIds;

test.describe('Reset Password Page', () => {
  test.beforeEach(async ({ page }) => {
    // Sign user in
    await page.goto('/signin');
    await page.fill(`[data-testid="${testIds.emailInput}"]`, email);
    await page.fill(`[data-testid="${testIds.passwordInput}"]`, password);
    await page.click(`[data-testid="${testIds.signInButton}"]`);
    await page.waitForSelector(`[data-testid="${testIds.signedIn}"]`);

    // Go to reset password page
    await page.goto('/reset-pass');
  });

  test('should send password reset email', async ({ page }) => {
    // Click button and check email is sent
    await page.click(`[data-testid="${sendEmailButton}"]`);
    await page.waitForSelector(`[data-testid="${emailSentMessage}"]`);
    await expect(
      page.locator(`[data-testid="${emailSentMessage}"]`)
    ).toBeVisible();
  });
});
