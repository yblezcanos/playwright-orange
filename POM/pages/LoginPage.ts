import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { LocatorType, getByLocator } from "../../utils/locators";
import { loginPageLocators } from "../locators/loginPage";
import { test, expect } from '@playwright/test';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
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

    async errorAlertIsShowed(): Promise<boolean> {
        let alert = getByLocator(this.page, loginPageLocators.errorAlert);
        try {
            await expect(alert).toBeVisible({ timeout: 5000 }); // Espera hasta 5 segundos
            return true;
        } catch (error) {
            return false;
        }
    }

    async errorAlert(): Promise<string | null> {
        let alert = getByLocator(this.page, loginPageLocators.errorAlert);
        return await alert.textContent();
    }
}