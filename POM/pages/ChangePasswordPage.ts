import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocatorType, getByLocator } from "../../utils/locators";
import { changePasswordLocators } from "../locators/changePassword";
import passCfg from "../../tests/common/pass.cfg.json"; 

export class ChangePasswordPage extends BasePage {
  readonly containerChangePassword: Locator;
  readonly currentPassword: Locator;
  readonly newPassword: Locator;
  readonly confirmPassword: Locator;
  readonly changePasswordSaveButton: Locator;
  readonly changePasswordCancelButton: Locator;
  readonly spinner: Locator;
  readonly errorMessage: Locator;
  readonly newPasswordLabelPolicy: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.containerChangePassword = getByLocator(page, changePasswordLocators.containerChangePassword);
    this.currentPassword = getByLocator(page, changePasswordLocators.currentPassword);
    this.newPassword = getByLocator(page, changePasswordLocators.newPassword);
    this.confirmPassword = getByLocator(page, changePasswordLocators.confirmPassword);
    this.changePasswordSaveButton = getByLocator(page, changePasswordLocators.changePasswordSaveButton as LocatorType);
    this.changePasswordCancelButton = getByLocator(page, changePasswordLocators.changePasswordCancelButton as LocatorType);
    this.spinner = getByLocator(page, changePasswordLocators.spinner);
    this.errorMessage = getByLocator(page, changePasswordLocators.errorMessage);
    this.newPasswordLabelPolicy = getByLocator(page, changePasswordLocators.newPasswordLabelPolicy);
    this.alertMessage = getByLocator(page, changePasswordLocators.alertMessage);
  }

  /**
   * Enters a new password into the specified input field.
   *
   * @param newPassword - The new password to be entered.
   * @param cmp - (Optional) The locator or locator type for the input field. If not provided, defaults to `this.newPassword`.
   *              If a locator type is provided, it will be converted to a locator.
   * @returns A promise that resolves when the password has been entered.
   */
  async enterNewPassword(newPassword: string, cmp?: Locator | LocatorType) {
    if (!cmp) {
      cmp = this.newPassword;
    } else if (!this.isLocator(cmp)) {
      cmp = getByLocator(this.page, cmp as LocatorType);
    }
    await cmp.fill(newPassword);
  }  

  /**
   * Fills the confirm password field with the provided password.
   *
   * @param confirmPassword - The password to confirm.
   * @returns A promise that resolves when the password has been filled.
   */
  async confirmNewPassword(confirmPassword: string) {
    await this.confirmPassword.fill(confirmPassword);
  }

  /**
   * Changes the user's password by filling in the current password, new password, and confirming the new password.
   * 
   * @param oldPassword - The current password of the user.
   * @param newPassword - The new password to be set for the user.
   * @returns A promise that resolves when the password change process is complete.
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const currentPasswordInput = this.currentPassword;
    const newPasswordInput = this.newPassword;
    const confirmPasswordInput = this.confirmPassword;
    const saveButton = this.changePasswordSaveButton;
    const spinner = this.spinner;

    await currentPasswordInput.nth(0).fill(oldPassword);
    await newPasswordInput.fill(newPassword);
    await confirmPasswordInput.last().fill(newPassword);
    await saveButton.click();
    await spinner.waitFor({ state: 'hidden' });
  }

  /**
 * Verifies if the error message is displayed and contains the expected text.
 *
 * @param errorText - The expected text of the error message.
 * @returns A promise that resolves to `true` if the error message is visible and contains the expected text, otherwise `false`.
 */
  async expectErrorMessage(errorText: string): Promise<boolean> {
    const errorMessage = this.errorMessage;
    // Esperamos que el mensaje de error sea visible
    await errorMessage.waitFor({ state: 'visible', timeout: 3000 });
  
    const errorMessageTextLocator = errorMessage.locator('text=' + errorText);
    try {
      // Verificamos que el texto del error esté presente
      const errorMessageText = await errorMessage.textContent(); // Puedes usar `textContent()` en lugar de `innerText()`
      await expect(errorMessageText).toContain(errorText); // Esto será más tolerante con el texto.
      await expect(errorMessageTextLocator).toBeVisible({ timeout: 3000 });
      return true; // Si todo está bien, retorna true
    } catch (error) {
      return false; // Si falla, retorna false
    }
  }
  
  /**
   * Checks if the container for the change password title is visible on the page.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the container is visible, otherwise `false`.
   */
  async isContainerChangePasswordTitleVisible(): Promise<boolean> {
    try {
      await expect(this.containerChangePassword).toBeVisible();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the title of the change password page is "Update Password".
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the title is "Update Password", otherwise `false`.
   */
  async isTitleChangePasswordOK(): Promise<boolean> {
    try {
      const title = await this.containerChangePassword.textContent();
      await expect(title).toBe('Update Password');
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validates the password configuration by testing various invalid password scenarios.
   * 
   * @param {Locator | LocatorType} [input] - The locator for the password input field. If not provided, it will be resolved using the `getByLocator` method.
   * @param {Locator | LocatorType} [alertMessage] - The locator for the alert message element. If not provided, it defaults to `this.alertMessage`.
   * 
   * @returns {Promise<void>} A promise that resolves when all invalid password scenarios have been tested.
   */
  async validatePasswordCfg(input?: Locator | LocatorType, alertMessage?: Locator | LocatorType) {
    if (!this.isLocator(input)) {
      input = getByLocator(this.page, input as LocatorType);
    }

    if (!alertMessage) {
      alertMessage = this.alertMessage;
    } if (!this.isLocator(alertMessage)) {
      alertMessage = getByLocator(this.page, alertMessage as LocatorType);
    }

    const invalidPasswords = [
      { pass: '123', message: 'Should have at least 7 characters' }, // Less than 7 characters
      { pass: 'abc', message: 'Should have at least 7 characters' }, // Less than 7 characters

      { pass: 'A'.repeat(65), message: 'Should not exceed 64 characters' }, // More than 64 characters
      { pass: 'abcdefg', message: 'Your password must contain minimum 1 number' }, // No numbers
      { pass: '1234567', message: 'Your password must contain minimum 1 lower-case letter' } // No lowercase letters
    ];

    for (const { pass, message } of invalidPasswords) {
      await this.enterNewPassword(pass, input);
      await expect(alertMessage).toHaveText(message); // this.alertMessage
    }
  }

  /**
   * Validates the password based on multiple criteria such as minimum length, maximum length,
   * presence of numbers, and presence of lowercase letters.
   *
   * @param {Locator | LocatorType} [input] - The locator or locator type for the password input field.
   * @param {Locator | LocatorType} [alertMessage] - The locator or locator type for the alert message element.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the password meets all validation criteria.
   */
  async validatePassword(input?: Locator | LocatorType, alertMessage?: Locator | LocatorType): Promise<boolean> {
    if (!this.isLocator(input)) {
      input = getByLocator(this.page, input as LocatorType);
    }

    if (!alertMessage) {
      alertMessage = this.alertMessage;
    } if (!this.isLocator(alertMessage)) {
      alertMessage = getByLocator(this.page, alertMessage as LocatorType);
    }

    let results = await Promise.all([
      this.validateMinLen(input, alertMessage),
      this.validateMaxLen(input, alertMessage),
      this.validateNumber(input, alertMessage),
      this.validateLowerCase(input, alertMessage)
    ]);

    return results.every(result => result);   
  }

  /**
   * Validates that the minimum length requirement for passwords is enforced.
   *
   * @param cmp - The locator for the password input component.
   * @param alertMessage - The locator for the alert message component.
   * @returns A promise that resolves to a boolean indicating whether the validation passed.
   */
  async validateMinLen(cmp: Locator, alertMessage: Locator): Promise<boolean> {
    let message = passCfg.minLen.msg;
    let passwords = passCfg.minLen.chart;

    for (let pass of passwords) {
      await this.enterNewPassword(pass, cmp);
      const text = await cmp.textContent()
      const altMessage = await alertMessage.textContent();
      if (altMessage !== message || text !== pass) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validates that the maximum length constraint for a password is enforced.
   *
   * @param cmp - The locator for the password input field.
   * @param alertMessage - The locator for the alert message element.
   * @returns A promise that resolves to a boolean indicating whether the validation passed.
   */
  async validateMaxLen(cmp: Locator, alertMessage: Locator): Promise<boolean> {
    let pass = passCfg.maxLen.chart.repeat(65);
    await this.enterNewPassword(pass, cmp);
    const text = await cmp.textContent() ?? "";
    const message = await alertMessage.textContent() ?? "";
    return text !== null &&
      text.length <= passCfg.maxLen.max &&
      message === passCfg.maxLen.msg;
  }

  /**
   * Validates that the provided component contains a number in its text content.
   * Iterates through a list of passwords, enters each password into the component,
   * and checks if the component's text content or alert message matches the expected
   * message and contains a number.
   *
   * @param cmp - The Locator of the component to validate.
   * @param alertMessage - The Locator of the alert message to check.
   * @returns A promise that resolves to a boolean indicating whether the validation passed.
   */
  async validateNumber(cmp: Locator, alertMessage: Locator): Promise<boolean> {
    let message = passCfg.number.msg;
    let passwords = passCfg.number.chart;
    for (let pass of passwords) {
      await this.enterNewPassword(pass, cmp);
      const text = await cmp.textContent() ?? "";
      const altMessage = await alertMessage.textContent() ?? "";
      if (text == null && altMessage !== message &&  !/\d/.test(text)) {
        return false;
      }
    }

    return true;
  }    

  /**
   * Validates that the provided component displays an alert message when a password without lowercase letters is entered.
   *
   * @param cmp - The locator for the component where the password is entered.
   * @param alertMessage - The locator for the alert message that should be displayed.
   * @returns A promise that resolves to a boolean indicating whether the validation passed.
   */
  async validateLowerCase(cmp: Locator, alertMessage: Locator): Promise<boolean> {
    let message = passCfg.lowerCase.msg;
    let passwords = passCfg.lowerCase.chart;
    for (let pass of passwords) {
      await this.enterNewPassword(pass, cmp);
      const text = await cmp.textContent() ?? "";
      const altMessage = await alertMessage.textContent() ?? "";
      if (text == null && altMessage !== message &&  !/[a-z]/.test(text)) {
        return false;
      }
    }

    return true;
  }    
   
  /**
   * Checks if the given object is a Locator.
   *
   * @param obj - The object to check.
   * @returns True if the object is a Locator, false otherwise.
   */
  isLocator(obj: any): obj is Locator {
    return obj && typeof obj === 'object' && typeof obj.click === 'function' && typeof obj.isVisible === 'function';
  }
}
