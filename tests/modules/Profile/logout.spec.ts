import { test, expect, chromium } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';
const authFile = 'playwright/.auth/tmp.logout.json';

test.describe('Logout Tests', () => {
    let basePage: BasePage;
    let loginPage: LoginPage;

    test.beforeAll(async () => {
        // Crear un nuevo navegador y contexto para la sesión de logout
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Guardar la sesión de login
        loginPage = new LoginPage(page);
        await loginPage.saveSession({ page, authFile });

        // Cerrar el navegador después de guardar el contexto
        await browser.close(); 
    });


    test('should logout successfully', async ({ browser  }) => {
        // Crear un nuevo navegador y contexto para la sesión de logout
        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();

        // Instanciar la página de Base
        basePage = new BasePage(page);
        await basePage.goToDashboard(page, basePage.logoutButton);
        await basePage.logout();
        await expect(page).toHaveURL('/web/index.php/auth/login');   
        let isLogoutButtonVisible = await basePage.isLogoutButtonVisible(page);
        await expect(isLogoutButtonVisible).toBeFalsy();
        await basePage.goto('/web/index.php/dashboard/index');
        await expect(page).toHaveURL('/web/index.php/auth/login');     
    });
}); 