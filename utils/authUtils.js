exports.loginToGoogle = async (page, username, password) => {
  try {
    // Fill in the email input field
    await page.fill('input[type="email"]', username);
    
    // Click the 'Next' button after entering email
    await page.click('#identifierNext');
    
    // Wait for the password input field to become visible
    await page.waitForSelector('input[type="password"]', { state: 'visible' });
    
    // Fill in the password input field
    await page.fill('input[type="password"]', password);
    
    // Click the 'Next' button after entering password
    await page.click('#passwordNext');
    
    // Wait for the permissions page to load
    await page.waitForSelector('text=Continue', { state: 'visible' });
    
    // Click the first "Continue" button to proceed with permissions
    await page.locator('button', { hasText: 'Continue' }).click();
  } catch (error) {
    // Throw an error if the login process fails
    throw new Error('Google login process failed: ' + error.message);
  }
  
  try {
    // Wait for the "Select all" checkbox to appear
    await page.waitForSelector('input[type="checkbox"][aria-label="Select all"]', { state: 'visible', timeout: 5000 });
    
    // Check the "Select all" checkbox to grant all permissions
    await page.check('input[type="checkbox"][aria-label="Select all"]');
    
    // Validate that all checkboxes are selected
    const checkboxes = await page.$$('input[type="checkbox"]');
    for (const checkbox of checkboxes) {
      const isChecked = await checkbox.isChecked();
      if (!isChecked) {
        throw new Error('Not all checkboxes were selected after clicking "Select all".');
      }
    }
  } catch (error) {
    // If the checkbox is not found, check if the user already has access
    const alreadyHasAccess = await page.isVisible('text=Spikerz already has some access');
    
    if (!alreadyHasAccess) {
      // Throw an error if neither the checkbox nor the access message is found
      throw new Error('Neither the "Select all" checkbox nor the "You already have access" message was found.');
    }
    
    // Log a message if the user already has access
    console.log('User already has access. Skipping checkbox selection.');
  }
  
  // Click the second "Continue" button to finalize the login process
  await page.locator('button', { hasText: 'Continue' }).click();
  
  // Wait for the login popup window to close
  await page.waitForEvent('close', { timeout: 10000 });
};
