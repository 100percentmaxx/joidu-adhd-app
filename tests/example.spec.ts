import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check if the page title is present
  await expect(page).toHaveTitle(/joidu/i);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Check if main navigation elements are present
  await expect(page.locator('nav')).toBeVisible();
});

test('focus page loads', async ({ page }) => {
  await page.goto('/focus');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check if focus page content is present
  await expect(page.locator('h1')).toBeVisible();
});
