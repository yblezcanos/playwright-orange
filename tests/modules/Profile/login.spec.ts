import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../POM/pages/LoginPage';


test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  // Instanciamos la página
        await loginPage.navigateToLogin();  // Navegamos a la página de login
    });

    test('should display login page', async ({ page }) => {
        let title = page.getByRole('heading', { name: 'Login' });              
        await expect(title).toHaveText('Login');
        //await expect(page.getByRole('heading', { name: 'Login' })).toHaveText('Login');
    });

    test('should login with valid credentials', async ({ page }) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        let isTextVisible = await loginPage.isNavbarTextVisible('Dashboard');
        expect(isTextVisible).toBeTruthy();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await loginPage.login('wrongUsername', 'wrongPassword');
        let isAlertVisible = await loginPage.errorAlertIsShowed();
        expect(isAlertVisible).toBeTruthy();
    });

    test('should require username and password', async ({ page }) => {
        await page.goto('https://example.com/login');
        await page.click('button[type="submit"]');
        await expect(page.locator('.error-message')).toHaveText('Username and password are required');
    });
});