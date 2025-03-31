import { Page } from '@playwright/test';

class GoogleLoginPage {
  private page: Page;
  private emailInput: string;
  private passwordInput: string;
  private identifierNextButton: string;
  private passwordNextButton: string;
  private continueButton: string;
  private selectAllCheckbox: string;
  private alreadyHasAccessText: string;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.identifierNextButton = '#identifierNext';
    this.passwordNextButton = '#passwordNext';
    this.continueButton = 'button:has-text("Continue")';
    this.selectAllCheckbox = 'input[type="checkbox"][aria-label="Select all"]';
    this.alreadyHasAccessText = 'text=Spikerz already has some access';
  }

  async enterEmail(username: string): Promise<void> {
    await this.page.fill(this.emailInput, username);
    await this.page.click(this.identifierNextButton);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.waitForSelector(this.passwordInput, { state: 'visible' });
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.passwordNextButton);
  }

  async handlePermissions(): Promise<void> {
    await this.page.waitForSelector(this.continueButton, { state: 'visible' });
    await this.page.locator(this.continueButton).click();
  }

  async selectAllCheckboxes(): Promise<void> {
    try {
      await this.page.waitForSelector(this.selectAllCheckbox, { state: 'visible', timeout: 50000 });
      await this.page.check(this.selectAllCheckbox);
    } catch (error) {
      const alreadyHasAccess = await this.page.isVisible(this.alreadyHasAccessText);
      if (!alreadyHasAccess) {
        throw new Error('Neither the "Select all" checkbox nor the "You already have access" message was found.');
      }
      console.log('User already has access. Skipping checkbox selection.');
    }
  }

  async finalizeLogin(): Promise<void> {
    await this.page.locator(this.continueButton).click();
    await this.page.waitForEvent('close', { timeout: 30000 });
  }
}

export { GoogleLoginPage };
