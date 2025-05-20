import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should watch a document and display sync status', async ({ page }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Watch Document" button exists
    const watchDocButton = page.getByTestId('watch-doc');
    await expect(watchDocButton).toBeVisible();

    // Click the "Watch Document" button
    await watchDocButton.click();

    // Ensure the sync status is displayed
    const watchDocResult = page.getByTestId('watch-doc-result');
    await expect(watchDocResult).toBeVisible();

    // Verify the sync status
    await expect(watchDocResult).toHaveText('Document is synced successfully!');
  });
});
