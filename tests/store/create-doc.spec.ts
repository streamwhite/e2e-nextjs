import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should create a document and display success message', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Create Document" button exists
    const createDocButton = page.getByTestId('create-doc');
    await expect(createDocButton).toBeVisible();

    // Click the "Create Document" button
    await createDocButton.click();

    // Ensure the success message is displayed
    const successMessage = page.locator('text=Document successfully created!');
    await expect(successMessage).toBeVisible();
  });

  test('should display an error message if document creation fails', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Create Document" button exists
    const createDocButton = page.getByTestId('create-doc-fail');
    await expect(createDocButton).toBeVisible();

    // Click the "Create Document" button
    await createDocButton.click();

    // Ensure the error message is displayed
    const errorMessage = page.locator('text=Failed to create document');
    await expect(errorMessage).toBeVisible();
  });
});
