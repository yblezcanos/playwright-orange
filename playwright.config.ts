import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',
  outputDir: 'reports',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "test",
      testMatch: /.*\.spec\.ts/,
     
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json", // Mueve el storageState aquí
      },
      dependencies:["setup", "test"]
    },
    {
      name: 'firefox',
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json", // Mueve el storageState aquí
      },
      dependencies:["setup", "test"]
    }
  ],
});
