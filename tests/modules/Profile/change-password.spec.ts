import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';
import { ChangePasswordPage } from '../../../POM/pages/ChangePasswordPage';
import passCfg2 from '../../common/pass.cfg2.json';


test.use({ storageState: 'tmp/.auth/user.json' });
test.describe('Change Password', () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    let changePasswordPage: ChangePasswordPage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        changePasswordPage = new ChangePasswordPage(page);
        await basePage.goToDashboard(page, basePage.changePasswordButton);
        await basePage.accessChangePassword();
        await expect(page).toHaveURL('/web/index.php/pim/updatePassword');
        let isTextVisible = await basePage.isNavbarTextVisible('PIM');
        expect(isTextVisible).toBeTruthy();
        let isContainerChangePasswordTitleVisible = await changePasswordPage.isContainerChangePasswordTitleVisible();
        expect(isContainerChangePasswordTitleVisible).toBeTruthy();
        let isTitleChangePasswordOK = await changePasswordPage.isTitleChangePasswordOK();
        expect(await isTitleChangePasswordOK).toBeTruthy();
    });

    test('should change password successfully', async ({ page }) => {        
        const password = process.env.ADMIN_PASSWORD || 'fallbackPass';
        await changePasswordPage.changePassword(password, 'KevinNatalie-1');
        await expect(changePasswordPage.currentPassword.nth(0)).toBeEmpty();
        await expect(changePasswordPage.newPassword).toBeEmpty();
        await expect(changePasswordPage.confirmPassword.last()).toBeEmpty();
        let succefullyMsg = await changePasswordPage.expectMessage(changePasswordPage.successfullySaved, "Successfully Saved");
        await expect(succefullyMsg).toBeTruthy();
    });

    test('should fail to change password with incorrect current password', async ({ page }) => {
        await changePasswordPage.changePassword('Admin', 'KevinNatalie-1');
        const errorMessage = await changePasswordPage.expectMessage(changePasswordPage.errorMessage, 'Current Password is Incorrect');
        await expect(errorMessage).toBeTruthy();
    });

    test('should show error when password does not meet policies', async ({ page }) => {
        const invalidPasswords = passCfg2.invalidPasswords;
        for (const { pass, message } of invalidPasswords) {
            await changePasswordPage.typePassword(pass);
            await expect(changePasswordPage.alertMessageNewPassword).toHaveText(message);
        }
    });

    test('should show error when password does not meet policies 2', async ({ page }) => {
        let validatePass = await changePasswordPage.validatePassword(changePasswordPage.newPassword, changePasswordPage.alertMessageNewPassword);
        expect(validatePass).toBeTruthy();
    });

    test('Should show an alert message when the Confirm Password does not match the New Password', async ({ page }) => {        
        let confirmationPassMismatch = await changePasswordPage.verifyConfirmPasswordMismatch(changePasswordPage.newPassword, changePasswordPage.confirmPassword, changePasswordPage.alertMessageConfirmPassword);
        expect(confirmationPassMismatch).toBeTruthy();
    })

    test('Verify the behavior of the profile menu on mobile and tablet', async ({ page }) => {    
        // Probar en tamaño de móvil (375px)
        await page.setViewportSize({ width: 375, height: 667 });
        await page.reload();  // Recargar la página para aplicar el tamaño
        await basePage.verifyMenuVisibility(page);  // Verificar que el menú de perfil se ve bien en móvil

        // Probar en tamaño de tablet (768px)
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.reload();  // Recargar la página para aplicar el tamaño
        await basePage.verifyMenuVisibility(page);  // Verificar que el menú de perfil se ve bien en tablet
    });
});
