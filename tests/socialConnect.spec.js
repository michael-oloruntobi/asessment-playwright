const { test, expect } = require('@playwright/test');
const { SocialConnectPage } = require('../pages/SocialConnectPage');
const { loginToGoogle } = require('../utils/authUtils');

// Test suite for Social Connect functionality
// Grouping all social connection-related tests together for better organization

test.describe('Social Connect Tests', () => {
  let socialConnectPage;

  test.beforeEach(async ({ page }) => {
    try {
      // Initialize the SocialConnectPage instance
      socialConnectPage = new SocialConnectPage(page);
      
      // Clear cookies to ensure a fresh session
      await page.context().clearCookies();
      
      // Navigate to the base URL before each test
      await page.goto('/');
    } catch (error) {
      // Log and rethrow error if setup fails
      console.error('Error during beforeEach setup:', error);
      throw error;
    }
  });

  test('should navigate to YouTube and verify image appears', async ({ page }) => {
    test.slow(); // Marks this test as slow to allow extra time if needed
    
    // Step 1: Navigate to YouTube connection flow
    await socialConnectPage.navigateToYoutube();
    
    // Step 2: Handle the authentication popup
    const popup = await socialConnectPage.handlePopup();
    
    // Step 3: Log in using Google credentials from environment variables
    await loginToGoogle(popup, process.env.GOOGLE_USERNAME, process.env.GOOGLE_PASSWORD);
    
    // Step 4: Bring the main page back into focus
    await page.bringToFront();
    
    // Step 5: Verify that the confirmation message appears
    await expect(page.locator('h5', { hasText: 'Confirm details' })).toBeVisible();
    
    // Step 6: Verify that the profile picture is displayed correctly
    const profilePicture = page.locator('nz-card img');
    await expect(profilePicture).toHaveAttribute('src', process.env.PROFILE_PICTURE_URL);
    
    // Step 7: Verify that the correct YouTube channel ID is displayed
    const channelIdElement = page.getByText(process.env.TARGET_YOUTUBE_CHANNEL_ID);
    await expect(channelIdElement).toBeVisible();
  });
});