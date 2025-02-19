import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../POM/pages/LoginPage';
import * as faker from '../../../utils/faker';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  // Instanciamos la página
        await loginPage.navigateToLogin();  // Navegamos a la página de login
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
            await page.screenshot({ path: `reports/Profile/screenshots/${testInfo.title}.png`, fullPage: true });
        }
    });

    test('should display login page', async ({ page }) => {
        let visibleTitle = await loginPage.hasTitle();             
        expect(visibleTitle).toBeTruthy();
    });

    test('should login with valid credentials', async ({ page }) => {
        const username = process.env.ADMIN_USERNAME || 'fallbackUser';
        const password = process.env.ADMIN_PASSWORD || 'fallbackPass';
        await test.step('Enter username and password', async ()=>{
            await loginPage.login(username, password);
        })
        await test.step('Verify login success', async ()=>{
            await expect(page).toHaveURL('/web/index.php/dashboard/index');
            let isTextVisible = await loginPage.isNavbarTextVisible('Dashboard');//Dashboard
            expect(isTextVisible).toBeTruthy();
        })
    });

    test('should show error with invalid credentials', async ({ page }) => {
        const randomUser = faker.generateRandomUsername(); 
        const randomPass = faker.generateRandomPassword();
        await test.step('Enter wrong username and password', async ()=>{
            await loginPage.login(randomUser, randomPass);
        });
        await test.step('Verify error message', async ()=>{
            let isAlertVisible = await loginPage.errorAlertIsShowed();
            let alertText = await loginPage.errorAlert();        
            expect(isAlertVisible).toBeTruthy();
            expect(alertText).toBe('Invalid credentials');
        });
    });

    test('should require username and password', async ({ page }) => {
        await test.step('Login without username and password', async ()=>{
            await loginPage.login('', '');
        });
        await test.step('Verify validation messages', async ()=>{
            await expect(page).toHaveURL('/web/index.php/auth/login');
            let usernameValidationMessage = await loginPage.usernameValidationMessage();
            expect(usernameValidationMessage).toBe('Required');
            let passwordValidationMessage = await loginPage.passwordValidationMessage();
            expect(passwordValidationMessage).toBe('Required'); 
        });          
    });

    test('should not login with a weak password and username less than 5 characters', async ({ page }) => {
    // Genera un nombre de usuario de menos de 5 caracteres
        const shortUsername = faker.generateUsernameWithXCharacters(4); // Crea un nombre de usuario de 4 caracteres el sistema especifica que deben ser 5
        const weakPass = faker.generatePasswordWithRequirements(3); // Genera una contraseña demasiado corta
        await test.step('Enter weak password and short username', async ()=>{
            await loginPage.login(shortUsername, weakPass);
        })
        await test.step('Verify validation messages', async ()=>{
            let isAlertVisible = await loginPage.errorAlertIsShowed();
            let alertText = await loginPage.errorAlert();        
            expect(isAlertVisible).toBeTruthy();
            expect(alertText).toBe('Invalid credentials');
        }); 
    });
});