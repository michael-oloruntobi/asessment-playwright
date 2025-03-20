const { test, expect } = require('@playwright/test');
const { SocialConnectPage } = require('../pages/SocialConnectPage');
const { loginToGoogle } = require('../utils/authUtils');

test.describe('Social Connect Tests', () => {
  let socialConnectPage;

  test.beforeEach(async ({ page }) => {
    try {
      socialConnectPage = new SocialConnectPage(page);
      await page.context().clearCookies();
      await page.goto('/');
    } catch (error) {
      console.error('Error during beforeEach setup:', error);
      throw error;
    }
  });

  test('should navigate to YouTube and verify image appears', async ({ page }) => {
    test.slow();

    await socialConnectPage.navigateToYoutube();
    const popup = await socialConnectPage.handlePopup();
    await loginToGoogle(popup, process.env.GOOGLE_USERNAME, process.env.GOOGLE_PASSWORD);
    await page.bringToFront();

    // Assertions to confirm image displayed and channel id is correct
    const confirmDetailsHeader = await socialConnectPage.getConfirmDetailsHeader();
    await expect(confirmDetailsHeader).toBeVisible();

    const profilePicture = await socialConnectPage.getProfilePicture();
    await expect(profilePicture).toHaveAttribute('src', process.env.PROFILE_PICTURE_URL);

    const channelIdText = await socialConnectPage.getChannelIdText();
    await expect(channelIdText).toBeVisible();
  });
});