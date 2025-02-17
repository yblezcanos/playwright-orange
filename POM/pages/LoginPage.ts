import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { LocatorType, getByLocator } from "../../utils/locators";
import { loginPageLocators } from "../locators/loginPage";
import { get } from 'http';
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

    async errorAlertIsShowed() : Promise<boolean> {
        return await getByLocator(this.page, loginPageLocators.errorAlert).isVisible();
    }

    async errorAlert(): Promise<string | null> {
        return await getByLocator(this.page, loginPageLocators.errorAlert).textContent();
    }
}