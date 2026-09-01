const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', (err) => {
    console.log('PAGE ERROR:', err.toString());
  });
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });

  try {
    console.log('Navigating to http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('a[href="/services"]', { timeout: 5000 }).catch(() => {});
    
    console.log('Clicking services link (client-side navigation)');
    await page.evaluate(() => {
      const a = document.querySelector('a[href="/services"]');
      if (a) a.click();
      else window.location.href = '/services';
    });
    
    await new Promise(r => setTimeout(r, 3000));
    
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  } finally {
    await browser.close();
  }
})();
