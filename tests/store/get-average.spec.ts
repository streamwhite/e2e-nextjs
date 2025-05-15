import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should display the average result as 4.5 after clicking "Get Average for Query"', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Get Average for Query" button exists
    const getAverageButton = page.getByTestId('get-average');
    await expect(getAverageButton).toBeVisible();

    // Click the "Get Average for Query" button
    await getAverageButton.click();

    // Ensure the average result element exists
    const averageResult = page.getByTestId('average-result');
    await expect(averageResult).toBeVisible();

    // Verify the average result
    await expect(averageResult).toHaveText('3.5');
  });
});
