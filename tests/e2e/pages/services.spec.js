// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Services pages', () => {
  test('Services listing page shows all 8 services', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
    const cards = page.locator('main a[href^="/services/"]');
    await expect(cards).toHaveCount(8);
  });

  test('service card links to detail page', async ({ page }) => {
    await page.goto('/services');
    await page.locator('a[href="/services/consent-for-rent"]').first().click();
    await expect(page).toHaveURL('/services/consent-for-rent');
    await expect(page.getByRole('heading', { name: 'Consent for Rent' })).toBeVisible();
  });

  test('service detail page has correct title', async ({ page }) => {
    await page.goto('/services/payment-testing');
    await expect(page).toHaveTitle(/Payment Testing/);
  });

  test('unknown service slug returns 404', async ({ page }) => {
    const response = await page.goto('/services/not-a-real-service');
    expect(response?.status()).toBe(404);
  });
});
