import { test, expect } from '@playwright/test';
//import { LoginPage } from '../../../POM/pages/LoginPage';
import { BasePage } from '../../../POM/pages/BasePage';

import { LoginPage } from '../../../POM/pages/LoginPage';
const authFile = "playwright/.auth/user.json";

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Logout Tests', () => {
    let basePage: BasePage;

    test('check default login', async ({ page }) => {
        console.log('>>>>>>>>>>>> check default login');
        /*let loginPage = new LoginPage(page);
        await loginPage.saveSession({ page, authFile });*/
        basePage = new BasePage(page);
        await basePage.goToDashboard(page);
        await expect(page).toHaveURL('/web/index.php/dashboard/index');
    });

    test('should logout successfully', async ({ page }) => {
        basePage = new BasePage(page);
        let isInDashborard = await basePage.goToDashboard(page);
        await basePage.logout(); // Llama al método de logout
        await expect(page).toHaveURL('/web/index.php/auth/login');
        console.log('Logout success', isInDashborard);
    });

    test('should redirect to login if accessing profile after logout', async ({ page }) => {
        await page.goto('https://example.com/profile');
        await page.click('button#logout');
        await page.goto('https://example.com/profile');
        await expect(page).toHaveURL('https://example.com/login');
    });

    test('should not show logout button when not logged in', async ({ page }) => {
        await page.goto('https://example.com/login');
        await expect(page.locator('button#logout')).not.toBeVisible();
    });
});