import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';
import exp from 'constants';

test.describe('Change Password', () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);       
    });

    test('should change password successfully', async ({ page }) => {
        await basePage.goToDashboard(page);
        await basePage.accessChangePassword();
        await expect(page).toHaveURL('/web/index.php/pim/updatePassword');
        let isTextVisible = await loginPage.isNavbarTextVisible('PIM');
        expect(isTextVisible).toBeTruthy();
        let isContainerChangePasswordTitleVisible = await basePage.isContainerChangePasswordTitleVisible();
        expect(isContainerChangePasswordTitleVisible).toBeTruthy();
        let isTitleChangePasswordOK = await basePage.isTitleChangePasswordOK();
        expect(await isTitleChangePasswordOK).toBeTruthy();

        //await profilePage.changePassword('oldPassword', 'newPassword');
        //await profilePage.logout();

        //await loginPage.login('user@example.com', 'newPassword');
        //expect(await basePage.isLoggedIn()).toBeTruthy();
    });

    test('should fail to change password with incorrect current password', async ({ page }) => {
        
    });

    test('should fail to login with old password after password change', async ({ page }) => {
        
    });
});
