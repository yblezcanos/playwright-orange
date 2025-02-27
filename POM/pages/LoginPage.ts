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

    async navigateToLogin() {
        this.page.goto(loginPageLocators.url);
    }

    async enterUsername(username: string) {
        let component = getByLocator(this.page, loginPageLocators.username);
        await component.fill(username);
    }

    async enterPassword(password: string) {
        let component = getByLocator(this.page, loginPageLocators.password);
        await component.fill(password);
    }

    async clickLoginButton() {
        let component = getByLocator(this.page, loginPageLocators.loginButton as LocatorType);
        await component.click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async hasTitle(): Promise<boolean> {
        try {
            const title = getByLocator(this.page, loginPageLocators.title as LocatorType);
            await title.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            return false;
        }
    }

    async errorAlertIsShowed(): Promise<boolean> {
        try {
            let alert = getByLocator(this.page, loginPageLocators.errorAlert);
            await expect(alert).toBeVisible({ timeout: 5000 }); // Espera hasta 5 segundos
            return true;
        } catch (error) {
            return false;
        }
    }

    async errorAlert(): Promise<string> {
        if (await this.errorAlertIsShowed()) {
            let alert = getByLocator(this.page, loginPageLocators.errorAlert);
            return (await alert.textContent()) ?? '';
        }
        return ''; // Si el mensaje no aparece, devuelve ""
    }

    async usernameValidationMessage(): Promise<string | null> {
        let validationMessage = getByLocator(this.page, loginPageLocators.usernameValidationMessage);
        return await validationMessage.textContent();
    }

    async passwordValidationMessage(): Promise<string | null> {
        let validationMessage = getByLocator(this.page, loginPageLocators.passwordValidationMessage);
        return await validationMessage.textContent();
    }

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
        //almacenar el estado de la sesion(es como una cookie)
        await page.context().storageState({ path: authFile });
    }
}