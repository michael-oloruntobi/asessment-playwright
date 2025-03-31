# Use the official Playwright image with Node.js and required browsers
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the application files
COPY . .

# Build TypeScript project
RUN npx tsc

# Expose API port
EXPOSE 3000

# Start the API server
CMD ["npm",  "run", "start"]