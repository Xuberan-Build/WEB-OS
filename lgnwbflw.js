const puppeteer = require('puppeteer');
require('dotenv').config();
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://webflow.com/dashboard/login', { waitUntil: 'networkidle0' });

    await page.waitForSelector('#email-input', { visible: true });
    await page.type('#email-input', process.env.WEBFLOW_EMAIL, { delay: 100 });
    await page.type('#password-input', process.env.WEBFLOW_PASSWORD, { delay: 100 });

    // Submit the login form
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-automation-id="login-button"]') // Click the login button
    ]);

    /*
    // The following CAPTCHA handling code is commented out
    // Replace '#captcha-button' with the actual selector for the CAPTCHA button
    const captchaSelector = '#NGeJXgeptdtuAzV';
    await page.waitForSelector(captchaSelector);

    // Get the position of the CAPTCHA button
    const buttonPosition = await page.evaluate(selector => {
        const element = document.querySelector(selector);
        const { x, y } = element.getBoundingClientRect();
        return { x, y };
    }, captchaSelector);

    // Move the mouse to the CAPTCHA button, press down and hold for 12 seconds
    await page.mouse.move(buttonPosition.x, buttonPosition.y);
    await page.mouse.down();
    await page.waitFor(12000); // Hold for 12 seconds
    await page.mouse.up();
    console.log('CAPTCHA completed, proceeding...');
    */

    // After login steps
    console.log('Login successful.');

    // Save the WebSocket endpoint
    const browserWSEndpoint = browser.wsEndpoint();
    fs.writeFileSync('browserWSEndpoint.txt', browserWSEndpoint);

    // Do not close the browser
    // await browser.close();
})();
