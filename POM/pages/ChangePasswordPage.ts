import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocatorType, getByLocator } from "../../utils/locators";
import { changePasswordLocators } from "../locators/changePassword";
import passCfg from "../../tests/common/pass.cfg.json";
import passCfg2 from "../../tests/common/pass.cfg2.json";

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
  readonly alertMessageNewPassword: Locator;  
  readonly alertMessageConfirmPassword: Locator;
  readonly successfullySaved: Locator;

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
    this.alertMessageNewPassword = getByLocator(page, changePasswordLocators.alertMessageNewPassword);    
    this.alertMessageConfirmPassword = getByLocator(page, changePasswordLocators.alertMessageConfirmPassword);
    this.successfullySaved = getByLocator(page, changePasswordLocators.successfullySaved);
  }

  /**
   * Enters a new password into the specified input field.
   *
   * @param newPassword - The new password to be entered.
   * @param cmp - (Optional) The locator or locator type for the input field. If not provided, defaults to `this.newPassword`.
   *              If a locator type is provided, it will be converted to a locator.
   * @returns A promise that resolves when the password has been entered.
   */
  async typePassword(newPassword: string, cmp?: Locator | LocatorType) {
    if (!cmp) {
      cmp = this.newPassword;
    } else if (!this.isLocator(cmp)) {
      cmp = getByLocator(this.page, cmp as LocatorType);
    }
    await cmp.fill(newPassword);
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
   * Asserts that a message is visible and contains the expected text.
   *
   * @param {Locator} messageLocator - The locator for the message element.
   * @param {string} expectedText - The expected text to be contained in the message.
   * @returns {Promise<boolean>} - A promise that resolves to true if the message is visible and contains the expected text, otherwise false.
   * @throws {Error} - Throws an error if the message is not visible or does not contain the expected text within the specified timeout.
   */
  async expectMessage(messageLocator: Locator, expectedText: string): Promise<boolean> {
    try {
      // Esperar a que el mensaje esté presente y visible
      await messageLocator.waitFor({ state: 'visible', timeout: 3000 });
  
      // Obtener el texto del mensaje
      const messageText = await messageLocator.textContent() ?? "";
  
      // Verificar que el texto contenga el mensaje esperado
      await expect(messageText).toContain(expectedText);
      await expect(messageLocator.locator(`text=${expectedText}`)).toBeVisible({ timeout: 3000 });
  
      return true;
    } catch (error) {
      return false;
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
      alertMessage = this.alertMessageNewPassword;
    } if (!this.isLocator(alertMessage)) {
      alertMessage = getByLocator(this.page, alertMessage as LocatorType);
    }

    const invalidPasswords = passCfg2.invalidPasswords;

    for (const { pass, message } of invalidPasswords) {
      await this.typePassword(pass, input);
      await expect(alertMessage).toHaveText(message);
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
      alertMessage = this.alertMessageNewPassword;
    } if (!this.isLocator(alertMessage)) {
      alertMessage = getByLocator(this.page, alertMessage as LocatorType);
    }

    const minLenValid = await this.validateMinLen(input, alertMessage);
    if (!minLenValid) return false;

    const maxLenValid = await this.validateMaxLen(input, alertMessage);
    if (!maxLenValid) return false;

    const numberValid = await this.validateNumber(input, alertMessage);
    if (!numberValid) return false;

    const lowerCaseValid = await this.validateLowerCase(input, alertMessage);
    if (!lowerCaseValid) return false;

    const emptyValid = await this.validateEmpty(input, alertMessage);
    if (!emptyValid) return false;

    return true;
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
      await this.typePassword(pass, cmp);
      const altMessage = await alertMessage.textContent();
      await expect(alertMessage).toHaveText(message, { timeout: 3000 });
      if (altMessage !== message) {
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
    await this.typePassword(pass, cmp);
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
      await this.typePassword(pass, cmp);
      const text = await cmp.textContent() ?? "";
      const altMessage = await alertMessage.textContent() ?? "";
      if (text == null && altMessage !== message && !/\d/.test(text)) {
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
      await this.typePassword(pass, cmp);
      const text = await cmp.textContent() ?? "";
      const altMessage = await alertMessage.textContent() ?? "";
      if (text == null && altMessage !== message && !/[a-z]/.test(text)) {
        return false;
      }
    }
    return true;
  }

  async validateEmpty(cmp: Locator, alertMessage: Locator): Promise<boolean> {
    let pass = passCfg.empty.chart;
    await this.typePassword(pass, cmp);
    const text = await cmp.textContent() ?? "";
    const message = await alertMessage.textContent() ?? "";
    return text !== null &&
      message === passCfg.empty.msg;
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

  /**
   * Verifies that the alert message is displayed when the confirm password does not match the new password.
   *
   * @param newPassword - The new password to be entered.
   * @param confirmPassword - The confirm password to be entered.
   * @param alertMessage - The expected alert message when passwords do not match.
   * @returns A promise that resolves to `true` if the alert message is displayed and contains the expected text, otherwise `false`.
   */
  async verifyConfirmPasswordMismatch(newPass: Locator, confirmPass: Locator, alertMessageConfirmPassword: Locator): Promise<boolean> {
    await this.typePassword(passCfg.confirmPass.newPass, newPass);
    let PasswordsMismatch = passCfg.confirmPass.confirmationPass;
    try {
      for (let pass of PasswordsMismatch) {
        await this.typePassword(pass, confirmPass);
        const alertText = await alertMessageConfirmPassword.textContent() ?? "";
        await expect(alertText).toContain(passCfg.confirmPass.msg);
        await expect(alertMessageConfirmPassword).toBeVisible({ timeout: 3000 });
      }
      return true;
    }
    catch (error) {
      return false;
    }

  }
}






