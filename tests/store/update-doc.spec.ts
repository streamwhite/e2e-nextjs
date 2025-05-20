import { expect, test } from '@playwright/test';

test.describe('FirestoreFunctionsPage', () => {
  test('should display the sum result as 2 after clicking "Get Sum for Query"', async ({
    page,
  }) => {
    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url); // Replace with your app's URL

    // Ensure the "Get Sum for Query" button exists
    const getSumButton = page.getByTestId('update-doc');
    await expect(getSumButton).toBeVisible();

    // Click the "Get Sum for Query" button
    await getSumButton.click();

    // Ensure the sum result element exists
    const sumResult = page.getByTestId('update-doc-result');
    await expect(sumResult).toBeVisible();
  });

  test('should create a document with a custom ID and display success message', async ({
    page,
  }) => {
    // test this manually with local browser

    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    // Ensure the "Create Document with Custom ID" button exists
    const createDocButton = page.getByTestId('create-doc-custom-id');
    await expect(createDocButton).toBeVisible();

    // Click the "Create Document with Custom ID" button
    await createDocButton.click();

    // Ensure the success message is displayed
    const successMessage = page.getByText(
      'Document with custom ID successfully created!'
    );
    await expect(successMessage).toBeVisible();
  });

  test('should display an error message when trying to create a document with an existing ID', async ({
    page,
  }) => {
    // test this manually with local browser

    // Navigate to the page
    const url = 'http://localhost:3000/store-functions'; // Replace with your app's URL
    await page.goto(url);

    const existedDocBtn = page.getByTestId('check-doc-exists');
    await expect(existedDocBtn).toBeVisible();

    await existedDocBtn.click();

    // Ensure the error message is displayed
    const errorMessage = page.getByText(
      'Error: Document with this ID already exists!'
    );
    await expect(errorMessage).toBeVisible();
  });
});
