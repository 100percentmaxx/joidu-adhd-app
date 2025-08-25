# Playwright Tests for Joidu

This directory contains end-to-end tests for the Joidu application using Playwright.

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm run test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific test file
npm run test tests/focus.spec.ts

# Run tests matching a pattern
npm run test -- --grep="focus"
```

### Test Structure

- `example.spec.ts` - Basic homepage and navigation tests
- `focus.spec.ts` - Focus functionality tests
- `habits.spec.ts` - Habits functionality tests

## Writing Tests

### Test File Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code that runs before each test
    await page.goto('/path');
  });

  test('test description', async ({ page }) => {
    // Test implementation
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Common Assertions

```typescript
// Check if element is visible
await expect(page.locator('button')).toBeVisible();

// Check if element has text
await expect(page.locator('h1')).toHaveText('Expected Text');

// Check if page has title
await expect(page).toHaveTitle(/expected title/i);

// Check if element is enabled
await expect(page.locator('input')).toBeEnabled();
```

### Page Navigation

```typescript
// Navigate to page
await page.goto('/path');

// Wait for page to load
await page.waitForLoadState('networkidle');

// Wait for specific element
await page.waitForSelector('button');
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the root of the project. It includes:

- Test directory: `./tests`
- Base URL: `http://localhost:3000`
- Browser support: Chromium, Firefox, WebKit
- Auto-start dev server for tests
- HTML reporter for test results

## Best Practices

1. Use descriptive test names
2. Group related tests with `test.describe()`
3. Use `test.beforeEach()` for common setup
4. Wait for elements to be ready before interacting
5. Use page object models for complex pages
6. Keep tests independent and isolated
