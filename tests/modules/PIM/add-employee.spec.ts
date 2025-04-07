import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';
import { LoginPage } from '../../../POM/pages/LoginPage';
import { ChangePasswordPage } from '../../../POM/pages/ChangePasswordPage';
import { EmployeePage } from '../../../POM/pages/EmployeePage';

test.use({ storageState: 'tmp/.auth/user.json' });

test.describe('Add Employee', () => {
    let employeePage: EmployeePage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        employeePage = new EmployeePage(page);  
        basePage = new BasePage(page);    
        await basePage.goToDashboard(page, basePage.changePasswordButton);  
    });

    test('should successfully add a new employee with valid data', async ({ page }) => {      
        const isEmployeeAdd = await employeePage.addEmployeeFaker(employeePage.firstName, employeePage.lastName, employeePage.middleName, employeePage.employeeId);      
        expect(isEmployeeAdd).toBeTruthy(); 
        await expect(page).toHaveURL(/\/web\/index.php\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
    });

    test('should show validation errors when required fields are empty', async ({ page }) => {
        const isEmptyEmployee = await employeePage.addEmployeeEmptyValues(employeePage.firstName, employeePage.lastName, employeePage.middleName, employeePage.employeeId);
        expect(isEmptyEmployee).toBeTruthy();
    });

    /*test('should not allow duplicate employee IDs', async ({ page }) => {
        const duplicateEmployee = { firstName: 'Jane', lastName: 'Doe', employeeId: '12345' };
    
        await employeePage.addEmployeeFaker(duplicateEmployee.firstName, duplicateEmployee.lastName, '', duplicateEmployee.employeeId);
        await employeePage.goToAddEmployeePage();
        await employeePage.addEmployeeFaker(duplicateEmployee.firstName, duplicateEmployee.lastName, '', duplicateEmployee.employeeId);
    
        // Verificar que aparece un mensaje de error
        await expect(employeePage.employeeIdError).toBeVisible();
    });

    test('should allow adding an employee with long names', async ({ page }) => {
        const longName = 'A'.repeat(50);  // Genera un nombre de 50 caracteres
        await employeePage.addEmployeeFaker(longName, longName, '', '67890');
    
        // Verificar que se agregó correctamente
        await expect(page).toHaveURL(/\/web\/index.php\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
    });*/
});