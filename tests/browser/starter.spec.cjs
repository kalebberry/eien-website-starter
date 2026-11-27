const { test, expect } = require('../../.test-tools/node_modules/@playwright/test');
for (const width of [320,375,768,1024,1440]) {
  test('starter fits viewport '+width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', {level:1})).toHaveText('Eien Starter');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.evaluate(() => {
      const grid = document.createElement('div');
      grid.className = 'kos-grid';
      grid.style.setProperty('--kos-grid-min-item-size','10rem');
      grid.innerHTML = '<div>A</div><div>B</div>';
      document.querySelector('main').append(grid);
    });
    await expect(page.locator('.kos-grid')).toHaveCSS('display','grid');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}
