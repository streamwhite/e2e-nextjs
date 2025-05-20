import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should fetch and display docs data successfully', async ({ page }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Get Document Data" button exists
    const getDocDataButton = page.getByTestId('get-docs-data');
    await expect(getDocDataButton).toBeVisible();

    // Click the "Get Document Data" button
    await getDocDataButton.click();

    // Ensure the document data result element exists
    const docDataResult = page.getByTestId('docs-data-result');
    await expect(docDataResult).toBeVisible();
  });
});
