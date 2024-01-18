User
const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // Set to true in production
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Navigate to the Webflow dashboard
    await page.goto('https://webflow.com/dashboard', { waitUntil: 'networkidle0' });

    // Wait for the dashboard to load and the 'Create New Site' button to be visible
    const createNewSiteSelector = '#app > div > div > div.--styled-jJqNhw.wf-1aw23cy > div.loaded > div > main > div.--styled-sXEwp.wf-143igvw > div.--styled-enqGcU.wf-jjgsed > div.--styled-liSoVV.wf-5txlsg > button.--pick-bisZcG.--styled-eGEquR.wf-1tg75by';
    await page.waitForSelector(createNewSiteSelector);

    // Click on the 'Create New Site' button
    await page.click(createNewSiteSelector);

    // Wait for the new site creation modal to appear
    // Replace 'newSiteModalSelector' with the actual selector of the modal if different
    const newSiteModalSelector = 'selector-for-new-site-modal';
    await page.waitForSelector(newSiteModalSelector);

    // Enter the name 'Puppet's Master' for the new site
    // Replace 'siteNameInputSelector' with the actual selector of the site name input field
    const siteNameInputSelector = 'selector-for-site-name-input';
    await page.type(siteNameInputSelector, 'Puppet\'s Master', { delay: 100 });

    // Click the 'Create Site' button
    // Replace 'createSiteButtonSelector' with the actual selector of the 'Create Site' button
    const createSiteButtonSelector = 'selector-for-create-site-button';
    await page.click(createSiteButtonSelector);

    console.log('New site creation process initiated.');

    // Add any additional steps or navigation if necessary

    // Close the browser
    await browser.close();
})();
