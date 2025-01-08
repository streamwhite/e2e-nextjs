import { expect, test } from '@playwright/test';
import * as readline from 'readline';
import { confidentials, testIds } from './constants';

const signInPagePath = '/signin';

const { sendSigninLinkButton, signinWithLinkUserEmail, emailInput } = testIds;
const { email } = confidentials.signin;

async function promptQuestion(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

test.describe('SignInWithEmailLink Page', () => {
  test.beforeEach(async ({ page }) => {
    // Go to sign-in page
    await page.goto(`${signInPagePath}`);
    // Fill in the email input
    await page.fill(`[data-testid="${emailInput}"]`, email);

    // Click "Sign In with Email Link" button
    await page.click(`[data-testid="${sendSigninLinkButton}"]`);
  });

  test('should sign in with email link', async ({ page }) => {
    //   prompt tester for link in email content and go to the link
    //   right now do it manually
    const link = (await promptQuestion(
      'Enter the link from email: '
    )) as string;
    //   no way to input values for prompt

    //   link remove https by http
    await page.goto(`${link.replace('https', 'http')}`);

    // Check if the user is signed in
    await page.waitForSelector(`[data-testid="${signinWithLinkUserEmail}"]`);
    expect(
      await page.textContent(`[data-testid="${signinWithLinkUserEmail}"]`)
    ).toBe(email);
  });
});
