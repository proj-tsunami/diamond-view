// Full-page screenshot renderer for Diamond View website
// Usage: node scripts/screenshot-pages.js [base-url]
// Default base URL: https://diamond-view-site.vercel.app

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.argv[2] || 'https://diamond-view-site.vercel.app';

const PAGES = [
  { path: '/',        name: '01-home' },
  { path: '/work',    name: '02-work' },
  { path: '/clients', name: '03-clients' },
  { path: '/team',    name: '04-team' },
];

const OUT_DIR = path.join(__dirname, '..', 'screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,       // retina — 2880px effective width
    colorScheme: 'dark',
  });

  const page = await context.newPage();

  for (const { path: route, name } of PAGES) {
    const url = `${BASE_URL}${route}`;
    const outPath = path.join(OUT_DIR, `${name}.png`);

    console.log(`→ ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Let animations settle and lazy images load
    await page.waitForTimeout(2000);

    // Scroll to trigger lazy loading across the full page
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let total = 0;
        const step = 800;
        const timer = setInterval(() => {
          window.scrollBy(0, step);
          total += step;
          if (total >= document.body.scrollHeight) {
            window.scrollTo(0, 0);
            clearInterval(timer);
            resolve();
          }
        }, 120);
      });
    });

    await page.waitForTimeout(1000);

    await page.screenshot({
      path: outPath,
      fullPage: true,
      type: 'png',
    });

    const stat = fs.statSync(outPath);
    console.log(`  ✓ saved ${name}.png (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
  }

  await browser.close();
  console.log(`\nAll screenshots saved to: ${OUT_DIR}`);
})();
