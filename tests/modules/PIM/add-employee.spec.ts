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
});