// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Video pages', () => {
  test('Learn page shows video grid', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.getByRole('heading', { name: 'Open Banking Video Library' })).toBeVisible();
    const cards = page.locator('a[href^="/videos/"]');
    await expect(cards).toHaveCount(10);
  });

  test('video card links to detail page', async ({ page }) => {
    await page.goto('/learn');
    await page.locator('a[href="/videos/open-banking-explained"]').first().click();
    await expect(page).toHaveURL('/videos/open-banking-explained');
    await expect(page.getByRole('heading', { name: 'Open Banking Explained' })).toBeVisible();
  });

  test('video detail page shows YouTube embed', async ({ page }) => {
    await page.goto('/videos/open-banking-explained');
    const iframe = page.locator('iframe[src*="youtube.com/embed/3PtGXB0eofc"]');
    await expect(iframe).toBeVisible();
  });

  test('video detail page embed has rel=0', async ({ page }) => {
    await page.goto('/videos/open-banking-explained');
    const iframe = page.locator('iframe[src*="rel=0"]');
    await expect(iframe).toBeVisible();
  });

  test('video detail page has correct title', async ({ page }) => {
    await page.goto('/videos/open-banking-explained');
    await expect(page).toHaveTitle(/Open Banking Explained/);
  });

  test('unknown video slug returns 404', async ({ page }) => {
    const response = await page.goto('/videos/not-a-real-video');
    expect(response?.status()).toBe(404);
  });
});
