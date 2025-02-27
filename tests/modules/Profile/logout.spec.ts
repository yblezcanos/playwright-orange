import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';

test.use({ storageState: 'playwright/.auth/user_logout.json' });

/*test.describe('Logout Tests', () => {
    let basePage: BasePage;  
    let loginPage: LoginPage; 

    test('should logout successfully', async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.goToDashboard(page, basePage.logoutButton);
        await basePage.logout();
        await expect(page).toHaveURL('/web/index.php/auth/login');   
        let isLogoutButtonVisible = await basePage.isLogoutButtonVisible(page);
        await expect(isLogoutButtonVisible).toBeFalsy();
        await basePage.goto('/web/index.php/dashboard/index');
        await expect(page).toHaveURL('/web/index.php/auth/login');     
    });   
}); */