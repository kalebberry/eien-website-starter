const { test, expect } = require('../../.test-tools/node_modules/@playwright/test');

function normalizeColor(color) {
  if (!color) return '';
  const trimmed = color.trim().toLowerCase();
  const hex3 = trimmed.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (hex3) {
    return `#${hex3[1]}${hex3[1]}${hex3[2]}${hex3[2]}${hex3[3]}${hex3[3]}`.toUpperCase();
  }
  const hex6 = trimmed.match(/^#([0-9a-f]{6})$/i);
  if (hex6) {
    return trimmed.toUpperCase();
  }
  const rgb = trimmed.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgb) {
    const r = parseInt(rgb[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(rgb[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(rgb[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase();
  }
  return trimmed.toUpperCase();
}

test.describe('Eien Starter Browser Validation', () => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    test('starter fits viewport ' + width, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Eien Starter');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      await page.evaluate(() => {
        const grid = document.createElement('div');
        grid.className = 'kos-grid';
        grid.style.setProperty('--kos-grid-min-item-size', '10rem');
        grid.innerHTML = '<div>A</div><div>B</div>';
        document.querySelector('main').append(grid);
      });
      await expect(page.locator('.kos-grid')).toHaveCSS('display', 'grid');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    });
  }

  test('default page does not load client-side JavaScript', async ({ page }) => {
    const jsRequests = [];
    page.on('request', req => {
      if (req.resourceType() === 'script' || req.url().endsWith('.js')) {
        jsRequests.push(req.url());
      }
    });
    await page.goto('/');
    expect(jsRequests).toEqual([]);
    const scriptCount = await page.locator('script').count();
    expect(scriptCount).toBe(0);
  });

  test('theme tokens resolve correctly in light and dark modes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    const lightTokens = await page.evaluate(() => {
      const s = window.getComputedStyle(document.documentElement);
      return {
        bg: s.getPropertyValue('--background').trim(),
        text: s.getPropertyValue('--text').trim(),
        muted: s.getPropertyValue('--muted').trim(),
        border: s.getPropertyValue('--border').trim(),
        borderWeak: s.getPropertyValue('--border-weak').trim()
      };
    });
    expect(normalizeColor(lightTokens.bg)).toBe('#FFFFFF');
    expect(normalizeColor(lightTokens.text)).toBe('#111111');
    expect(normalizeColor(lightTokens.muted)).toBe('#6F6F6F');
    expect(normalizeColor(lightTokens.border)).toBe('#111111');
    expect(normalizeColor(lightTokens.borderWeak)).toBe('#D9D9D9');

    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    const darkTokens = await page.evaluate(() => {
      const s = window.getComputedStyle(document.documentElement);
      return {
        bg: s.getPropertyValue('--background').trim(),
        text: s.getPropertyValue('--text').trim(),
        muted: s.getPropertyValue('--muted').trim(),
        border: s.getPropertyValue('--border').trim(),
        borderWeak: s.getPropertyValue('--border-weak').trim()
      };
    });
    expect(normalizeColor(darkTokens.bg)).toBe('#0B0B0B');
    expect(normalizeColor(darkTokens.text)).toBe('#EFEFEF');
    expect(normalizeColor(darkTokens.muted)).toBe('#A0A0A0');
    expect(normalizeColor(darkTokens.border)).toBe('#EFEFEF');
    expect(normalizeColor(darkTokens.borderWeak)).toBe('#2A2A2A');
  });

  test('keyboard focus visibility styles apply to interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const btn = document.createElement('button');
      btn.id = 'test-focus-target';
      btn.textContent = 'Focus Target';
      document.body.prepend(btn);
    });
    await page.locator('#test-focus-target').focus();
    await page.keyboard.press('Tab');
    // If Tab shifted focus away or if focused:
    await page.locator('#test-focus-target').focus();
    const matchesFocusVisible = await page.evaluate(() => {
      const el = document.getElementById('test-focus-target');
      return el.matches(':focus-visible') || el.matches(':focus');
    });
    expect(matchesFocusVisible).toBe(true);

    const focusOutline = await page.evaluate(() => {
      const s = window.getComputedStyle(document.getElementById('test-focus-target'));
      return {
        outlineWidth: s.outlineWidth,
        outlineStyle: s.outlineStyle,
        outlineOffset: s.outlineOffset
      };
    });
    expect(focusOutline.outlineWidth).toBe('2px');
    expect(focusOutline.outlineStyle).toBe('solid');
    expect(focusOutline.outlineOffset).toBe('4px');
  });

  test('reduced-motion preference sets scroll-behavior to auto and shortens transitions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const scrollBehavior = await page.evaluate(() => window.getComputedStyle(document.documentElement).scrollBehavior);
    expect(scrollBehavior).toBe('auto');

    const duration = await page.evaluate(() => {
      const el = document.createElement('div');
      el.style.transition = 'opacity 300ms ease';
      document.body.append(el);
      return parseFloat(window.getComputedStyle(el).transitionDuration);
    });
    expect(duration).toBeLessThanOrEqual(0.001);
  });

  test('koshi gutter and container mappings resolve custom token values', async ({ page }) => {
    await page.goto('/');
    const rootTokens = await page.evaluate(() => {
      const s = window.getComputedStyle(document.documentElement);
      return {
        desktopSm: s.getPropertyValue('--kos-sys-size-desktop-sm').trim(),
        desktopLg: s.getPropertyValue('--kos-sys-size-desktop-lg').trim(),
        widescreen: s.getPropertyValue('--kos-sys-size-widescreen').trim(),
        kosGutter: s.getPropertyValue('--kos-gutter').trim()
      };
    });
    expect(rootTokens.desktopSm).toBe('45rem');
    expect(rootTokens.desktopLg).toBe('65rem');
    expect(rootTokens.widescreen).toBe('100rem');
    expect(rootTokens.kosGutter).toMatch(/^clamp\(1\.5rem/);

    await page.evaluate(() => {
      const containerDefault = document.createElement('div');
      containerDefault.id = 'container-default';
      containerDefault.className = 'kos-container';

      const containerNarrow = document.createElement('div');
      containerNarrow.id = 'container-narrow';
      containerNarrow.className = 'kos-container';
      containerNarrow.setAttribute('container-type', 'narrow');

      const containerWide = document.createElement('div');
      containerWide.id = 'container-wide';
      containerWide.className = 'kos-container';
      containerWide.setAttribute('container-type', 'wide');

      document.querySelector('main').append(containerDefault, containerNarrow, containerWide);
    });

    const containerMaxWidths = await page.evaluate(() => {
      return {
        defaultMax: window.getComputedStyle(document.querySelector('#container-default')).getPropertyValue('--max-width').trim(),
        narrowMax: window.getComputedStyle(document.querySelector('#container-narrow')).getPropertyValue('--max-width').trim(),
        wideMax: window.getComputedStyle(document.querySelector('#container-wide')).getPropertyValue('--max-width').trim()
      };
    });
    expect(containerMaxWidths.defaultMax).toBe('65rem');
    expect(containerMaxWidths.narrowMax).toBe('45rem');
    expect(containerMaxWidths.wideMax).toBe('100rem');
  });
});
