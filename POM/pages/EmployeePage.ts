import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { employeeLocators } from "../locators/employeePage";
import { LocatorType, getByLocator } from "../../utils/locators";
import employees from "../../tests/common/employee.cfg.json";
import * as faker from '../../utils/faker';

export class EmployeePage extends BasePage {
  readonly sidebarPIM: Locator;
  readonly topBarMenuAddEmployee: Locator;
  readonly addEmployeeTitle: Locator;
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly employeeId: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly employeeList: Locator;
  readonly employeeInfoTitle: Locator;
  readonly topBarMenuEmployeeList: Locator;


  constructor(page: Page) {
    super(page);
    this.sidebarPIM = getByLocator(page, employeeLocators.sidebarPIM as LocatorType);
    this.topBarMenuAddEmployee = getByLocator(page, employeeLocators.topBarMenuAddEmployee as LocatorType);
    this.addEmployeeTitle = getByLocator(page, employeeLocators.addEmployeeTitle as LocatorType);
    this.firstName = getByLocator(page, employeeLocators.firstName as LocatorType);
    this.middleName = getByLocator(page, employeeLocators.middleName as LocatorType);
    this.lastName = getByLocator(page, employeeLocators.lastName as LocatorType);
    this.employeeId = getByLocator(page, employeeLocators.employeeId as LocatorType);
    this.saveButton = getByLocator(page, employeeLocators.saveButton as LocatorType);
    this.successMessage = getByLocator(page, employeeLocators.succefulMessage as LocatorType);
    this.employeeList = getByLocator(page, employeeLocators.employeeList as LocatorType);
    this.employeeInfoTitle = getByLocator(page, employeeLocators.employeeInfoTitle as LocatorType);
    this.topBarMenuEmployeeList = getByLocator(page, employeeLocators.topBarMenuEmployeeList as LocatorType);
  }

  /**
   * Adds a new employee by filling out the required fields and clicking the save button.
   *
   * @param {string} firstName - The first name of the employee.
   * @param {string} lastName - The last name of the employee.
   * @param {string} [middleName] - The middle name of the employee (optional).
   * @param {string} [employeeId] - The employee ID (optional).
   * @returns {Promise<void>} A promise that resolves when the employee has been added.
   */
  async addEmployeeJson(firstNameCmp: Locator, lastNameCmp: Locator, middleNameCmp?: Locator, employeeIdCmp?: Locator): Promise<void> {
    const sidebarPIM = this.sidebarPIM;
    const topBarMenu = this.topBarMenuAddEmployee;
    const addEmployeeTitle = this.addEmployeeTitle;
    const firstNameInput = firstNameCmp;
    const middleNameInput = middleNameCmp;
    const lastNameInput = lastNameCmp;
    const employeeIdInput = employeeIdCmp;
    const saveButton = this.saveButton;
    const employee = employees;
    await sidebarPIM.click();

    for (const emp of employee.employees) { // Recorremos el array de empleados
      await topBarMenu.click();
      await addEmployeeTitle.waitFor({ state: 'visible', timeout: 6000 });
      await expect(addEmployeeTitle).toHaveText('Add Employee');
      await firstNameInput.fill(emp.firstName);
      await lastNameInput.fill(emp.lastName);

      if (emp.middleName) {
        if (middleNameInput) {
          await middleNameInput.fill(emp.middleName);
        }
      }

      if (emp.employeeId) {
        if (employeeIdInput) {
          await employeeIdInput.fill(emp.employeeId);
        }
      }
      await saveButton.click();
      const successMessage = await this.expectMessage(this.successMessage, 'Successfully Saved');
      await expect(successMessage).toBeTruthy();
      const isTitleEmployeeListVisible = await this.isTitleEmployeeInfoOK();
      await expect(isTitleEmployeeListVisible).toBeTruthy();
    }

  }

  /**
  * Adds a new employee by filling out the required fields and clicking the save button.
  *
  * @param {string} firstName - The first name of the employee.
  * @param {string} lastName - The last name of the employee.
  * @param {string} [middleName] - The middle name of the employee (optional).
  * @param {string} [employeeId] - The employee ID (optional).
  * @returns {Promise<void>} A promise that resolves when the employee has been added.
  */
  async addEmployeeFaker(firstNameCmp: Locator, lastNameCmp: Locator, middleNameCmp?: Locator, employeeIdCmp?: Locator): Promise<void> {
    const sidebarPIM = this.sidebarPIM;
    const topBarMenu = this.topBarMenuAddEmployee;
    const addEmployeeTitle = this.addEmployeeTitle;
    const firstNameInput = firstNameCmp;
    const middleNameInput = middleNameCmp;
    const lastNameInput = lastNameCmp;
    const employeeIdInput = employeeIdCmp;
    const saveButton = this.saveButton;
    
    await sidebarPIM.click();
    await topBarMenu.click();
    await addEmployeeTitle.waitFor({ state: 'visible', timeout: 6000 });
    await expect(addEmployeeTitle).toHaveText('Add Employee');
    const randomFirstName = faker.generateName();
    const randomLastName = faker.generateLastName();
    const randomMiddleName = faker.generateMiddleName();
    const randomEmployeeId = faker.generateEmployeeId();
    await firstNameInput.fill(randomFirstName);
    await lastNameInput.fill(randomLastName);
    if (middleNameInput) {
      await middleNameInput.fill(randomMiddleName);
    }
    if (employeeIdInput) {
      await employeeIdInput.fill(randomEmployeeId);
    }    
    await saveButton.click();
    const successMessage = await this.expectMessage(this.successMessage, 'Successfully Saved');
    await expect(successMessage).toBeTruthy();
    const isTitleEmployeeListVisible = await this.isTitleEmployeeInfoOK();
    await expect(isTitleEmployeeListVisible).toBeTruthy();
  }

  /**
   * Asserts that a message is visible and contains the expected text.
   *
   * @param {Locator} messageLocator - The Playwright locator for the message element.
   * @param {string} expectedText - The text expected to be contained within the message.
   * @returns {Promise<boolean>} - A promise that resolves to true if the message is visible and contains the expected text, otherwise false.
   */
  async expectMessage(messageLocator: Locator, expectedText: string): Promise<boolean> {
    try {
      await messageLocator.waitFor({ state: 'visible', timeout: 5000 });

      const messageText = await messageLocator.textContent() ?? "";

      await expect(messageText).toContain(expectedText);
      await expect(messageLocator.locator(`text=${expectedText}`)).toBeVisible({ timeout: 5000 });

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the title of the employee information section is correct.
   *
   * This function verifies that the "Employee List" option is visible and that the title of the employee information section
   * contains the text "Personal Details".
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the title is correct, otherwise `false`.
   */
  async isTitleEmployeeInfoOK(): Promise<boolean> {
    try {
      await expect(this.topBarMenuEmployeeList).toBeVisible({ timeout: 6000 });
      await expect(this.employeeInfoTitle).toHaveText('Personal Details', { timeout: 7000 });
      return true;
    } catch (error) {
      console.error('Error in isTitleEmployeeInfoOK:', error);
      return false;
    }
  }
}
