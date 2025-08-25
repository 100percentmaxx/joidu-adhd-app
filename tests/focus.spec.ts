import { test, expect } from '@playwright/test';

test.describe('Focus Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/focus');
  });

  test('focus page loads with all components', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle(/focus/i);
    
    // Check for main focus components
    await expect(page.locator('h1')).toBeVisible();
  });

  test('focus setup flow', async ({ page }) => {
    // Navigate to setup if available
    await page.goto('/focus/setup');
    
    // Check if setup page loads
    await expect(page).toBeVisible();
  });

  test('focus active session', async ({ page }) => {
    // Navigate to active focus session
    await page.goto('/focus/active');
    
    // Check if active session page loads
    await expect(page).toBeVisible();
  });
});
