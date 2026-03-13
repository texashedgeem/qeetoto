// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test('home page loads with site title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Qeetoto/);
  });

  test('nav contains all four links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Learn' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Request Test' })).toBeVisible();
  });

  test('nav logo links to home', async ({ page }) => {
    await page.goto('/learn');
    await page.getByRole('link', { name: 'Qeetoto' }).click();
    await expect(page).toHaveURL('/');
  });

  test('About Us nav link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL('/about-us');
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  });

  test('Learn nav link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Learn' }).click();
    await expect(page).toHaveURL('/learn');
    await expect(page.getByRole('heading', { name: 'Open Banking Video Library' })).toBeVisible();
  });

  test('Services nav link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
  });

  test('footer contains Qeetoto legal text', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('qeetoto.io is a tradename of Qeetoto Limited')).toBeVisible();
  });
});
