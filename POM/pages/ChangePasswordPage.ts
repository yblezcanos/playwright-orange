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

  async enterNewPassword(newPassword: string, cmp?: Locator | LocatorType) {
    if (!cmp) {
      cmp = this.newPassword;
    } else if (!this.isLocator(cmp)) {
      cmp = getByLocator(this.page, cmp as LocatorType);
    }
    await cmp.fill(newPassword);
  }

  async confirmNewPassword(confirmPassword: string) {
    await this.confirmPassword.fill(confirmPassword);
  }

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

  async expectErrorMessage(errorText: string) {
    const errorMessage = this.errorMessage;
    const errorLocator = errorMessage.locator('text=' + errorText);
    await expect(errorLocator).toBeVisible();
  }

  async isContainerChangePasswordTitleVisible(): Promise<boolean> {
    try {
      await expect(this.containerChangePassword).toBeVisible();
      return true;
    } catch (error) {
      return false;
    }
  }

  async isTitleChangePasswordOK(): Promise<boolean> {
    try {
      const title = await this.containerChangePassword.textContent();
      await expect(title).toBe('Update Password');
      return true;
    } catch (error) {
      return false;
    }
  }


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



  async validateMaxLen(cmp: Locator, alertMessage: Locator): Promise<boolean> {
    let pass = passCfg.maxLen.chart.repeat(65);
    await this.enterNewPassword(pass, cmp);
    const text = await cmp.textContent() ?? "";
    const message = await alertMessage.textContent() ?? "";
    return text !== null &&
      text.length <= passCfg.maxLen.max &&
      message === passCfg.maxLen.msg;
  }

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
   
  isLocator(obj: any): obj is Locator {
    return obj && typeof obj === 'object' && typeof obj.click === 'function' && typeof obj.isVisible === 'function';
  }
}
