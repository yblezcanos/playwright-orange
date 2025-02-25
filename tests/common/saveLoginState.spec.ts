import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/pages/LoginPage';



test('save login state', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);  // Instanciamos la página
    await loginPage.navigateToLogin();
    
    const username = process.env.ADMIN_USERNAME || 'fallbackUser';
    const password = process.env.ADMIN_PASSWORD || 'fallbackPass';
    await test.step('Enter username and password', async () => {
        await loginPage.login(username, password);
    })
    await test.step('Verify login success', async () => {
        await expect(page).toHaveURL('/web/index.php/dashboard/index');
        let isTextVisible = await loginPage.isNavbarTextVisible('Dashboard');//Dashboard
        expect(isTextVisible).toBeTruthy();        
    })

    // Guarda el estado de la sesión en un archivo
    //await page.context().storageState({ path: './tests/common/auth.json' });
    await page.context().storageState({ path: '/tests/common/auth.json' });
})
