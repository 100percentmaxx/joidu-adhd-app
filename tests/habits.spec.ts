import { test, expect } from '@playwright/test';

test.describe('Habits Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/habits');
  });

  test('habits page loads successfully', async ({ page }) => {
    // Check if the page loads
    await expect(page).toBeVisible();
    
    // Check for habits content
    await expect(page.locator('h1')).toBeVisible();
  });

  test('add habit flow', async ({ page }) => {
    // Navigate to add habit page
    await page.goto('/habits/add');
    
    // Check if add habit page loads
    await expect(page).toBeVisible();
  });

  test('habits welcome page', async ({ page }) => {
    // Navigate to welcome page
    await page.goto('/habits/welcome');
    
    // Check if welcome page loads
    await expect(page).toBeVisible();
  });
});
