import { expect, test } from '@playwright/test';

const routes = [
  { id: 'home', relativeUrl: './' },
  { id: 'credits', relativeUrl: 'credits' },
];

test.describe('visual regression', () => {
  for (const route of routes) {
    test(`${route.id} matches baseline`, async ({ page, baseURL }) => {
      if (!baseURL) {
        throw new Error('BASE_URL is not defined. Set BASE_URL before running npm run visual:test.');
      }

      const targetUrl = new URL(route.relativeUrl, baseURL).toString();

      await page.goto(targetUrl, { waitUntil: 'networkidle' });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addStyleTag({
        content: '*,:before,:after{animation:none !important;transition:none !important;}',
      });

      await expect(page).toHaveScreenshot(`${route.id}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
