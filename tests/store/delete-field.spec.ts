import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should delete a field and display success message', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Delete Field" button exists
    const deleteFieldButton = page.getByTestId('delete-field');
    await expect(deleteFieldButton).toBeVisible();

    // Click the "Delete Field" button
    await deleteFieldButton.click();

    // Ensure the success message is displayed
    const successMessage = page.locator('text=Field successfully deleted!');
    await expect(successMessage).toBeVisible();
  });
});
