exports.SocialConnectPage = class SocialConnectPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.youtubeCard = page.locator(':nth-child(4) > .ant-card-body');
    this.youtubeSubscribeButton = page.locator('.google-and-youtube-login-container > div > app-button > .ant-btn');
    this.confirmDetailsHeader = page.locator('h5:has-text("Confirm details")');
    this.profilePicture = page.locator('nz-card img');
    this.channelIdText = page.locator(`text=${process.env.TARGET_YOUTUBE_CHANNEL_ID}`);
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
        this.page.waitForEvent('popup', { timeout: 50000 }),
        this.clickYoutubeSubscribeButton(),
      ]);
      return popup;
    } catch (error) {
      throw new Error('Popup did not open within timeout: ' + error.message);
    }
  }

  // Returns the locator for the confirmation details header
  getConfirmDetailsHeader() {
    return this.confirmDetailsHeader;
  }

  // Returns the locator for the profile picture
  getProfilePicture() {
    return this.profilePicture;
  }

  // Returns the locator for the channel ID text
  getChannelIdText() {
    return this.channelIdText;
  }
};