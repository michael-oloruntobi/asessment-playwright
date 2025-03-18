import { test, expect } from '@playwright/test';
   
   test.describe('Login Tests', () => {

   
     test.beforeEach(async ({ page }) => {
       await page.context().clearCookies();
     });
   
     test('should deny access with incorrect HTTP credentials', async ({ browser }) => {
       // Use incorrect HTTP credentials
       const incorrectUsername = 'wrong-username';
       const incorrectPassword = 'wrong-password';
   
       // Create a new browser context with incorrect HTTP credentials
       const context = await browser.newContext({
         httpCredentials: {
           username: incorrectUsername,
           password: incorrectPassword,
         },
       });
   
       // Create a new page in the context
       const page = await context.newPage();
   
       // Attempt to navigate to the page and catch the error
       let response;
       try {
         response = await page.goto('/');
       } catch (error) {
         console.error('Navigation failed:', error);
       }
   
       // Verify that access is denied by checking for an error message on the page
       const accessDeniedMessage = page.locator('body'); 
       await expect(accessDeniedMessage).toContainText('HTTP ERROR 401'); 
   
       // Close the context after the test
       await context.close();
     });
   });