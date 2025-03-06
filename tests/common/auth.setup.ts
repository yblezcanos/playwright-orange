/**
 * @file auth.setup.ts
 * @description This file contains the setup script for saving the login state using Playwright.
 * It imports necessary modules and defines a setup function to save the login session state.
 */

import { test as setup, expect } from "@playwright/test";
import { LoginPage } from '../../POM/pages/LoginPage';

const authFile = "tmp/.auth/user.json";
let loginPage: LoginPage;

/**
 * Setup function to save the login state.
 * 
 * @param {Object} param0 - The object containing the page instance.
 * @param {import('@playwright/test').Page} param0.page - The Playwright page instance.
 */
setup("save login state", async ({ page }) => {
    loginPage = new LoginPage(page);  // Instantiate the LoginPage
    await loginPage.saveSession({page, authFile});
});
