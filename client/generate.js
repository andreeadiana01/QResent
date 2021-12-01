const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    });
    await page.setViewport({ width: 1680, height: 1050 });
    await page.pdf({
        path: 'listaPrezenta.pdf',
        format: 'A4'
    });

    await browser.close();
})();