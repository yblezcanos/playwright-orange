import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LocatorType, getByLocator } from "../../utils/locators";
import { changePasswordLocators } from "../locators/changePassword";


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

  async enterNewPassword(newPassword: string) {
    await this.newPassword.fill(newPassword);
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
    await newPasswordInput.nth(1).fill(newPassword);
    await confirmPasswordInput.last().fill(newPassword);
    await saveButton.click();
    await spinner.waitFor({ state: 'hidden' });
  }

  async expectErrorMessage(errorText: string) {
    const errorMessage = this.errorMessage;
    const errorLocator = errorMessage.locator('text=' + errorText);
    await expect(errorLocator).toBeVisible({ timeout: 5000 });
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

  async validatePassword(cmp: Locator | LocatorType, newPass: string): Promise<boolean> {
    if (!this.isLocator(cmp)) {
      cmp = getByLocator(this.page, cmp as LocatorType);
    }

    let results = await Promise.all([
      this.validateMinLen(cmp, newPass),
      this.validateMaxLen(cmp, newPass),
      this.validateNumber(cmp, newPass),
      this.validateLowerCase(cmp, newPass)
    ]);

    return results.every(result => result);

    /*
    return await this.validateMinLen(cmp, newPass) &&
      await this.validateMaxLen(cmp, newPass) &&
      await this.validateNumber(cmp, newPass) &&
      await this.validateLowerCase(cmp, newPass);
      */
  }

  async validateMinLen(cmp: Locator, newPass: string): Promise<boolean> {
    await this.enterNewPassword(newPass);
    const text = await cmp.textContent() ?? "";
    const alertMessage = await this.alertMessage.textContent();
    return text !== null &&
    text.length >= 7 &&
    alertMessage === 'Should have at least 7 characters';     
  }

  async validateMaxLen(cmp: Locator, newPass: string): Promise<boolean> {
    await this.enterNewPassword(newPass);
    const text = await cmp.textContent() ?? "";
    const alertMessage = await this.alertMessage.textContent();
    return text !== null && 
    text.length <= 64 && 
    alertMessage === 'Should not exceed 64 characters';   
  }

  async validateNumber(cmp: Locator, newPass: string): Promise<boolean> {
    await this.enterNewPassword(newPass);
    const text = await cmp.textContent() ?? "";
    const alertMessage = await this.alertMessage.textContent() ?? "";
    return text !== null &&
    /\d/.test(text) && 
    alertMessage === 'Your password must contain minimum 1 number';     
  }

  async validateLowerCase(cmp: Locator, newPass: string): Promise<boolean> {
    await this.enterNewPassword(newPass);
    const text = await cmp.textContent() ?? "";
    const alertMessage = await this.alertMessage.textContent() ?? "";
    return text !== null &&
    /[a-z]/.test(text) && 
    alertMessage === 'Your password must contain minimum 1 lower-case letter';         
  }

  isLocator(obj: any): obj is Locator {
    return obj && typeof obj === 'object' && typeof obj.click === 'function' && typeof obj.isVisible === 'function';
  }
}
