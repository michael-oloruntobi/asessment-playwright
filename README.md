# Social Connect Test Automation

## Overview
This project contains automated tests for the Social Connect feature using Playwright. The tests validate social media integrations, such as YouTube authentication and profile verification.

## Prerequisites
Ensure you have the following installed before running the tests:

- Node.js (>= 16.x)
- npm or yarn
- Playwright (latest version)
- Google Chrome or Chromium-based browser

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/social-connect-tests.git
   cd social-connect-tests
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```
4. Create a `.env` file in the root directory and add the required environment variables (see below).

## Environment Variables

Create a `.env` file with the following variables:

```env
BASE_URL=https://demo.spikerz.com
GOOGLE_USERNAME=your-google-email
GOOGLE_PASSWORD=your-google-password
PROFILE_PICTURE_URL=https://static-assets.spikerz.com/demo/profile-nina.png
TARGET_YOUTUBE_CHANNEL_ID=@dina_bakery_shop
USERNAME=me
PASSWORD=SmipMe123456
```
> **Note:** Use secure methods to store sensitive credentials (e.g., environment secrets in CI/CD pipelines).

## Running Tests

Run all tests:
```sh
npx playwright test
```

Run a specific test file:
```sh
npx playwright test tests/socialConnect.spec.js
```

Run tests in headed mode:
```sh
npx playwright test --headed
```

Run tests with HTML report:
```sh
npx playwright test --reporter=html
```

## Test Structure

- `tests/` – Contains all test files
- `pages/` – Page Object Model (POM) classes for better test maintainability
- `utils/` – Utility functions, such as authentication helpers
- `playwright.config.js` – Playwright configuration file

## Error Handling & Debugging

- Run tests with `DEBUG=pw:api npx playwright test` to see API calls
- Check Playwright’s trace viewer with `--trace on-first-retry`

## Security Considerations

- Avoid logging sensitive data
- Use `.env` instead of hardcoding credentials
- Implement secure authentication handling in CI/CD pipelines

## Contribution Guidelines

- Follow Playwright best practices
- Use descriptive commit messages
- Run `npx playwright test` before submitting PRs
- Document changes in the README or relevant test files

For any issues, please create a GitHub issue or reach out to the project maintainers.
