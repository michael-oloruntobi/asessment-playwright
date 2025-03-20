const { GoogleLoginPage } = require('../pages/GoogleLoginPage');

exports.loginToGoogle = async (page, username, password) => {
  const googleLoginPage = new GoogleLoginPage(page);

  try {
    await googleLoginPage.enterEmail(username);
    await googleLoginPage.enterPassword(password);
    await googleLoginPage.handlePermissions();
    await googleLoginPage.selectAllCheckboxes();
    await googleLoginPage.finalizeLogin();
  } catch (error) {
    throw new Error('Google login process failed: ' + error.message);
  }
};