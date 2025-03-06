import { test as setup, expect } from "@playwright/test";
import { LoginPage } from '../../POM/pages/LoginPage';

const authFile = "tmp/.auth/user.json";
//const logoutFile = "playwright/.auth/user_logout.json";
let loginPage: LoginPage;

setup("save login state", async ({ page }) => {
    loginPage = new LoginPage(page);  // Instanciamos la página
    await loginPage.saveSession({page, authFile});
});

/**
    const authFile = "playwright/.auth/tmp.logout.json";
    await loginPage.saveSession({page, authFile});
    test.use({ storageState: authFile });
 */