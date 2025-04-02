import { test, expect, Page } from '@playwright/test';
import { SocialConnectPage } from '../pages/SocialConnectPage';
import { loginToGoogle } from '../utils/authUtils';

// Define expected environment variables with proper types.
const usernames: string | undefined = process.env.USERNAME;
const password: string | undefined = process.env.PASSWORD;
const baseURL: string | undefined = process.env.BASE_URL;

if (!usernames || !password) {
  throw new Error('USERNAME and PASSWORD must be defined in the .env file.');
}

if (!baseURL) {
  throw new Error('BASE_URL must be defined in the .env file.');
}

test.describe('Social Connect Tests', () => {
  let socialConnectPage: SocialConnectPage;

  // Set up the test environment.
  test.beforeEach(async ({ page }: { page: Page }) => {
    try {
      socialConnectPage = new SocialConnectPage(page);

      // Construct the authenticated URL with credentials
      const authenticatedURL = `https://me:${password}@${baseURL}/`;

      // Navigate to the authenticated URL
      await page.goto(authenticatedURL);
    } catch (error: unknown) {
      console.error('Error during beforeEach setup:', error);
      if (error instanceof Error) {
        throw new Error(`BeforeEach failed: ${error.message}`);
      }
      throw new Error('BeforeEach failed with unknown error');
    }
  });

  test.only('should navigate to YouTube and verify image appears', async ({ page }: { page: Page }) => {
    test.slow();

    // Validate environment variables
    const googleUsername = process.env.GOOGLE_USERNAME;
    const googlePassword = process.env.GOOGLE_PASSWORD;
    const profilePictureUrl = process.env.PROFILE_PICTURE_URL;

    if (!googleUsername || !googlePassword) {
      throw new Error('Google credentials not set in environment variables');
    }
    if (!profilePictureUrl) {
      throw new Error('PROFILE_PICTURE_URL not set in environment variables');
    }

    await socialConnectPage.navigateToYoutube();
    const popup = await socialConnectPage.handlePopup();
    await loginToGoogle(popup, googleUsername, googlePassword);
    await page.bringToFront();

    // Assertions to confirm image displayed and channel id is correct
    const confirmDetailsHeader = socialConnectPage.getConfirmDetailsHeader();
    await expect(confirmDetailsHeader).toBeVisible();

    const profilePicture = socialConnectPage.getProfilePicture();
    await expect(profilePicture).toHaveAttribute('src', profilePictureUrl);

    const channelIdText = socialConnectPage.getChannelIdText();
    await expect(channelIdText).toBeVisible();
  });
});