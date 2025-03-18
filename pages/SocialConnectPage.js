exports.SocialConnectPage = class SocialConnectPage {
  constructor(page) {
    this.page = page;
    // Locator for the YouTube card on the Social Connect page
    this.youtubeCard = page.locator(':nth-child(4) > .ant-card-body');
    
    // Locator for the YouTube subscribe button
    this.youtubeSubscribeButton = page.locator('.google-and-youtube-login-container > div > app-button > .ant-btn');
  }

  // Navigates to the Social Connect page and clicks on the YouTube card
  async navigateToYoutube() {
    await this.page.goto('/social-connect/');
    await this.youtubeCard.click();
  }

  // Clicks on the YouTube subscribe button to initiate login/authentication
  async clickYoutubeSubscribeButton() {
    await this.youtubeSubscribeButton.click();
  }

  // Handles the popup window that appears after clicking the YouTube subscribe button
  async handlePopup() {
    try {
      const [popup] = await Promise.all([
        // Wait for a popup event to be triggered
        this.page.waitForEvent('popup', { timeout: 5000 }),
        
        // Click the subscribe button to open the popup
        this.clickYoutubeSubscribeButton(),
      ]);
      return popup;
    } catch (error) {
      // Throws an error if the popup does not appear within the timeout period
      throw new Error('Popup did not open within timeout: ' + error.message);
    }
  }
};
