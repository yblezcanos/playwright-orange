import { test as setup, expect } from "@playwright/test";
import { LoginPage } from '../../POM/pages/LoginPage';

const authFile = "playwright/.auth/user.json";
let loginPage: LoginPage;

setup("save login state", async ({ page }) => {
    loginPage = new LoginPage(page);  // Instanciamos la página
    await loginPage.saveSession({page, authFile});
});