import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';
import { ChangePasswordPage } from '../../../POM/pages/ChangePasswordPage';


test.use({ storageState: 'tmp/.auth/user.json' });
test.describe('Change Password', () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    let changePasswordPage: ChangePasswordPage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        changePasswordPage = new ChangePasswordPage(page);
    });

    test('should change password successfully', async ({ page }) => {
        await basePage.goToDashboard(page, basePage.changePasswordButton);
        await basePage.accessChangePassword();
        await expect(page).toHaveURL('/web/index.php/pim/updatePassword');
        let isTextVisible = await basePage.isNavbarTextVisible('PIM');
        expect(isTextVisible).toBeTruthy();
        let isContainerChangePasswordTitleVisible = await changePasswordPage.isContainerChangePasswordTitleVisible();
        expect(isContainerChangePasswordTitleVisible).toBeTruthy();
        let isTitleChangePasswordOK = await changePasswordPage.isTitleChangePasswordOK();
        expect(await isTitleChangePasswordOK).toBeTruthy();
        const password = process.env.ADMIN_PASSWORD || 'fallbackPass';
        await changePasswordPage.changePassword(password, 'KevinNatalie-1');
        await expect(changePasswordPage.currentPassword.nth(0)).toBeEmpty();
        await expect(changePasswordPage.newPassword).toBeEmpty();
        await expect(changePasswordPage.confirmPassword.last()).toBeEmpty();
    });

    test('should fail to change password with incorrect current password', async ({ page }) => {
        await basePage.goToDashboard(page, basePage.changePasswordButton);
        await basePage.accessChangePassword();
        await expect(page).toHaveURL('/web/index.php/pim/updatePassword');
        let isTextVisible = await basePage.isNavbarTextVisible('PIM');
        expect(isTextVisible).toBeTruthy();
        let isContainerChangePasswordTitleVisible = await changePasswordPage.isContainerChangePasswordTitleVisible();
        expect(isContainerChangePasswordTitleVisible).toBeTruthy();
        let isTitleChangePasswordOK = await changePasswordPage.isTitleChangePasswordOK();
        expect(await isTitleChangePasswordOK).toBeTruthy();
        await changePasswordPage.changePassword('Admin', 'KevinNatalie-1');
        const errorMessage = await changePasswordPage.expectErrorMessage('Current Password is Incorrect');
        await expect(errorMessage).toBeTruthy();

    });

    test('should show error when password does not meet policies', async ({ page }) => {
        await basePage.goToDashboard(page, basePage.changePasswordButton);
        await basePage.accessChangePassword();
        await expect(page).toHaveURL('/web/index.php/pim/updatePassword');
        let isTextVisible = await basePage.isNavbarTextVisible('PIM');
        expect(isTextVisible).toBeTruthy();
        let isContainerChangePasswordTitleVisible = await changePasswordPage.isContainerChangePasswordTitleVisible();
        expect(isContainerChangePasswordTitleVisible).toBeTruthy();
        let isTitleChangePasswordOK = await changePasswordPage.isTitleChangePasswordOK();
        expect(await isTitleChangePasswordOK).toBeTruthy();


        const invalidPasswords = [
            { pass: '123', message: 'Should have at least 7 characters' }, // Less than 7 characters
            { pass: 'A'.repeat(65), message: 'Should not exceed 64 characters' }, // More than 64 characters
            { pass: 'abcdefg', message: 'Your password must contain minimum 1 number' }, // No numbers
            { pass: '1234567', message: 'Your password must contain minimum 1 lower-case letter' } // No lowercase letters
        ];

        for (const { pass, message } of invalidPasswords) {
            await changePasswordPage.enterNewPassword(pass);
            await expect(changePasswordPage.alertMessage).toHaveText(message);
        }
    });

    test('should show error when password does not meet policies 2', async ({ page }) => {
        await basePage.goToDashboard(page, basePage.changePasswordButton);
        await basePage.accessChangePassword();
        await expect(page).toHaveURL('/web/index.php/pim/updatePassword');
        let isTextVisible = await basePage.isNavbarTextVisible('PIM');
        expect(isTextVisible).toBeTruthy();
        let isContainerChangePasswordTitleVisible = await changePasswordPage.isContainerChangePasswordTitleVisible();
        expect(isContainerChangePasswordTitleVisible).toBeTruthy();
        let isTitleChangePasswordOK = await changePasswordPage.isTitleChangePasswordOK();
        expect(await isTitleChangePasswordOK).toBeTruthy();        
        let validatePass = await changePasswordPage.validatePassword(changePasswordPage.newPassword, changePasswordPage.alertMessage);
        expect(validatePass).toBeTruthy();
    });

});
