import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should display the count result as 1 after clicking "Get Count for Query"', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Get Count for Query" button exists
    const getCountButton = page.getByTestId('get-count');
    await expect(getCountButton).toBeVisible();

    // Click the "Get Count for Query" button
    await getCountButton.click();

    // Ensure the count result element exists
    const countResult = page.getByTestId('count-result');
    await expect(countResult).toBeVisible();

    // Verify the count result
    await expect(countResult).toHaveText('1');
  });
});
