import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { LocatorType, getByLocator } from "../../utils/locators";
import { loginPageLocators } from "../locators/loginPage";
import { test, expect } from '@playwright/test';

export class LoginPage extends BasePage {

    baseUrl: string;

    constructor(page) {
        super(page);
        this.baseUrl = "/web/index.php/auth/login";
    }

    /**
     * Navigates to the login page using the URL specified in the loginPageLocators.
     * 
     * @returns {Promise<void>} A promise that resolves when the navigation is complete.
     */
    async navigateToLogin() {
        this.page.goto(loginPageLocators.url);
    }

    /**
     * Enters the provided username into the username field on the login page.
     *
     * @param username - The username to be entered.
     * @returns A promise that resolves when the username has been entered.
     */
    async enterUsername(username: string) {
        let component = getByLocator(this.page, loginPageLocators.username);
        await component.fill(username);
    }

    /**
     * Enters the provided password into the password field on the login page.
     *
     * @param password - The password to be entered into the password field.
     * @returns A promise that resolves when the password has been entered.
     */
    async enterPassword(password: string) {
        let component = getByLocator(this.page, loginPageLocators.password);
        await component.fill(password);
    }

    /**
     * Clicks the login button on the login page.
     * 
     * This method locates the login button using the specified locator
     * and performs a click action on it.
     * 
     * @returns {Promise<void>} A promise that resolves when the click action is completed.
     */
    async clickLoginButton() {
        let component = getByLocator(this.page, loginPageLocators.loginButton as LocatorType);
        await component.click();
    }

    /**
     * Logs in a user by entering the provided username and password, and then clicking the login button.
     *
     * @param {string} username - The username to be entered.
     * @param {string} password - The password to be entered.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Checks if the title element is visible on the login page.
     *
     * @returns {Promise<boolean>} A promise that resolves to `true` if the title is visible, otherwise `false`.
     */
    async hasTitle(): Promise<boolean> {
        try {
            const title = getByLocator(this.page, loginPageLocators.title as LocatorType);
            await title.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks if the error alert is visible on the login page.
     * 
     * @returns {Promise<boolean>} A promise that resolves to `true` if the error alert is visible, otherwise `false`.
     * @throws Will return `false` if the error alert is not visible within the specified timeout.
     */
    async errorAlertIsShowed(): Promise<boolean> {
        try {
            let alert = getByLocator(this.page, loginPageLocators.errorAlert);
            await expect(alert).toBeVisible({ timeout: 5000 }); // Espera hasta 5 segundos
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks if the error alert is displayed on the login page and returns its text content.
     * 
     * @returns {Promise<string>} A promise that resolves to the text content of the error alert if it is displayed, 
     *                            or an empty string if the alert is not displayed.
     */
    async errorAlert(): Promise<string> {
        if (await this.errorAlertIsShowed()) {
            let alert = getByLocator(this.page, loginPageLocators.errorAlert);
            return (await alert.textContent()) ?? '';
        }
        return ''; // Si el mensaje no aparece, devuelve ""
    }

    /**
     * Retrieves the validation message displayed for the username field.
     *
     * @returns {Promise<string | null>} A promise that resolves to the validation message text, or null if no message is present.
     */
    async usernameValidationMessage(): Promise<string | null> {
        let validationMessage = getByLocator(this.page, loginPageLocators.usernameValidationMessage);
        return await validationMessage.textContent();
    }

    /**
     * Retrieves the validation message for the password field on the login page.
     *
     * @returns {Promise<string | null>} A promise that resolves to the validation message text, or null if no message is present.
     */
    async passwordValidationMessage(): Promise<string | null> {
        let validationMessage = getByLocator(this.page, loginPageLocators.passwordValidationMessage);
        return await validationMessage.textContent();
    }

    /**
     * Saves the current session state to a specified authentication file.
     * 
     * @param {Object} params - The parameters for the saveSession function.
     * @param {Page} params.page - The Playwright page object.
     * @param {string} [params.username=process.env.ADMIN_USERNAME || 'fallbackUser'] - The username for login. Defaults to the value of the ADMIN_USERNAME environment variable or 'fallbackUser'.
     * @param {string} [params.password=process.env.ADMIN_PASSWORD || 'fallbackPass'] - The password for login. Defaults to the value of the ADMIN_PASSWORD environment variable or 'fallbackPass'.
     * @param {string} params.authFile - The path to the file where the session state will be saved.
     * 
     * @returns {Promise<void>} A promise that resolves when the session state has been saved.
     */
    async saveSession({
        page,
        username = process.env.ADMIN_USERNAME || 'fallbackUser',
        password = process.env.ADMIN_PASSWORD || 'fallbackPass',
        authFile
    }: { page: Page, username?: string, password?: string, authFile: string }) {
        await page.goto(this.baseUrl);
        await this.login(username, password);
        await expect(page).toHaveURL('/web/index.php/dashboard/index');
        let isTextVisible = await this.isNavbarTextVisible('Dashboard');//Dashboard
        expect(isTextVisible).toBeTruthy();
        await page.context().storageState({ path: authFile });
    }
}