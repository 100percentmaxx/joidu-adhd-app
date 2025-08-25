import { test, expect } from '@playwright/test';

// Test configuration for external sites
test.describe('External Site Analysis', () => {
  // Disable webServer since we're testing external sites
  test.use({ baseURL: '' });

  test('analyze website structure', async ({ page }) => {
    // Navigate to the website you want to analyze
    await page.goto('https://example.com');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for reference
    await page.screenshot({ path: 'external-site-analysis.png', fullPage: true });
    
    // Analyze page structure
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('Page headings:', headings);
    
    // Get navigation elements
    const navElements = await page.locator('nav, [role="navigation"]').count();
    console.log('Navigation elements found:', navElements);
    
    // Get form elements
    const forms = await page.locator('form').count();
    console.log('Forms found:', forms);
    
    // Get button elements
    const buttons = await page.locator('button').count();
    console.log('Buttons found:', buttons);
    
    // Example: Analyze a specific feature
    // Look for common UI patterns
    const hasSidebar = await page.locator('[class*="sidebar"], [class*="side-nav"]').isVisible();
    console.log('Has sidebar:', hasSidebar);
    
    const hasHeader = await page.locator('header, [class*="header"]').isVisible();
    console.log('Has header:', hasHeader);
    
    const hasFooter = await page.locator('footer, [class*="footer"]').isVisible();
    console.log('Has footer:', hasFooter);
  });

  test('interact with specific features', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Example: Test a specific interaction
    // await page.click('button[aria-label="Menu"]');
    // await page.waitForSelector('.menu-panel');
    
    // Take screenshot of the interaction
    // await page.screenshot({ path: 'feature-interaction.png' });
  });

  test('extract design patterns', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Analyze color scheme
    const bodyStyles = await page.locator('body').evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize
      };
    });
    
    console.log('Design styles:', bodyStyles);
    
    // Look for common UI components
    const components = {
      cards: await page.locator('[class*="card"], .card, [data-testid*="card"]').count(),
      modals: await page.locator('[class*="modal"], .modal, [role="dialog"]').count(),
      dropdowns: await page.locator('[class*="dropdown"], .dropdown, select').count(),
      tabs: await page.locator('[class*="tab"], .tab, [role="tab"]').count()
    };
    
    console.log('UI components found:', components);
  });
});
