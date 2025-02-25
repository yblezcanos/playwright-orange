import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Logout Tests', () => {
    let basePage: BasePage;  
    let loginPage: LoginPage; 

    test('should logout successfully', async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.goToDashboard(page);
        await basePage.logout();
        await expect(page).toHaveURL('/web/index.php/auth/login');        
    });

    test('should redirect to login if accessing profile after logout', async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        const username = process.env.ADMIN_USERNAME || 'fallbackUser';
        const password = process.env.ADMIN_PASSWORD || 'fallbackPass';
        await basePage.goto('/web/index.php/auth/login'); // Asegura que inicia desde la página de login
        await loginPage.login(username, password); // Realiza login explícitamente
        await basePage.logout(); // Asegura que la sesión se cierra
        await basePage.goto('/web/index.php/dashboard/index');
        await expect(page).toHaveURL('/web/index.php/auth/login');
    });

    test('should not show logout button when not logged in', async ({ page }) => {
        await page.goto('https://example.com/login');
        await expect(page.locator('button#logout')).not.toBeVisible();
    });
});