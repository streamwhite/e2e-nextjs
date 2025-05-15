import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should display the sum result as 2 after clicking "Get Sum for Query"', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url); // Replace with your app's URL

    // Ensure the "Get Sum for Query" button exists
    const getSumButton = page.getByTestId('get-sum');
    await expect(getSumButton).toBeVisible();

    // Click the "Get Sum for Query" button
    await getSumButton.click();

    // Ensure the sum result element exists
    const sumResult = page.getByTestId('sum-result');
    await expect(sumResult).toBeVisible();

    // Verify the sum result
    await expect(sumResult).toHaveText('2');
  });
});
