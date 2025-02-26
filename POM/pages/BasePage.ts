import { Page, Locator, expect } from "@playwright/test";
import { LocatorType, getByLocator } from "../../utils/locators";
import { basePageLocators } from "../locators/basePage";
import { th } from "@faker-js/faker";
import exp from "constants";

export interface PageChangeOption {
  path?: string | RegExp;
  operator?: "not" | "yes";
}

export class BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly sidebar: Locator;
  readonly logoutButton: Locator;
  readonly profileDropdown: Locator;
  readonly aboutButton: Locator;
  readonly popup: Locator;
  readonly popupTitle: Locator;
  readonly popupCompanyName: Locator;
  readonly popupVersion: Locator;
  readonly popupActiveEmployees: Locator;
  readonly popupEmployeesTerminated: Locator;
  readonly closePopupButton: Locator;
  readonly changePasswordButton: Locator;
  readonly changePasswordUrl: string;
  //readonly PIMPath: Locator;
  readonly containerChangePassword: Locator;
  readonly currentPassword: Locator;
  readonly newPassword: Locator;
  readonly confirmPassword: Locator;
  readonly changePasswordSaveButton: Locator;
  readonly changePasswordCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = getByLocator(page, basePageLocators.navbar);
    this.sidebar = getByLocator(page, basePageLocators.sidebar as LocatorType);
    this.logoutButton = getByLocator(page, basePageLocators.logoutButton as LocatorType);
    this.profileDropdown = getByLocator(page, basePageLocators.profileDropdown as LocatorType);
    this.aboutButton = getByLocator(page, basePageLocators.aboutButton as LocatorType);
    this.popup = getByLocator(page, basePageLocators.popup);
    this.popupTitle = getByLocator(page, basePageLocators.popupTitle as LocatorType);
    this.popupCompanyName = getByLocator(page, basePageLocators.popupCompanyName);
    this.popupVersion = getByLocator(page, basePageLocators.popupVersion);
    this.popupActiveEmployees = getByLocator(page, basePageLocators.popupActiveEmployees);
    this.popupEmployeesTerminated = getByLocator(page, basePageLocators.popupEmployeesTerminated)
    this.closePopupButton = getByLocator(page, basePageLocators.closePopupButton);
    this.changePasswordButton = getByLocator(page, basePageLocators.changePasswordButton as LocatorType);
    //this.PIMPath = getByLocator(page, basePageLocators.PIMPath as LocatorType);
    this.containerChangePassword = getByLocator(page, basePageLocators.containerChangePassword);
    this.currentPassword = getByLocator(page, basePageLocators.currentPassword);
    this.newPassword = getByLocator(page, basePageLocators.newPassword);
    this.confirmPassword = getByLocator(page, basePageLocators.confirmPassword);
    this.changePasswordSaveButton = getByLocator(page, basePageLocators.changePasswordSaveButton as LocatorType);
    this.changePasswordCancelButton = getByLocator(page, basePageLocators.changePasswordCancelButton as LocatorType);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async isSidebarVisible(): Promise<boolean> {
    return await this.sidebar.isVisible();
  }

  /**
   * to verify if is Navbar Text Visible
   * @param {string} text 
   * @returns {Promise<boolean>}
   */
  async isNavbarTextVisible(text: string): Promise<boolean> {
    try {
      const navbarPath = this.navbar.locator(`text="${text}"`);
      await expect(navbarPath).toBeVisible({ timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async openProfileMenu(): Promise<void> {
    await this.profileDropdown.click(); // Hace clic en el menú del usuario para desplegar las opciones
  }

  /**
   * Logs out the user by clicking the logout button in the navbar
   * and waits for the login page to be visible.
   */
  async logout(): Promise<void> {
    const logoutButton = this.logoutButton;
    await this.openProfileMenu();
    await logoutButton.click();
    await this.page.waitForURL('/web/index.php/auth/login');
  }

  /**
   * Checks if the logout button is visible on the page.
   * @param {Page} page 
   * @returns {Promise<boolean>}
   */
  async isLogoutButtonVisible(page: Page, timeout = 5000): Promise<boolean> {
    try {
      await expect(this.logoutButton).toBeVisible({ timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  async goToDashboard(page): Promise<boolean> {
    if (!(await this.isLogoutButtonVisible(page, 1000))) {
      // Si no estás en una página con el botón de logout, navega al dashboard
      await page.goto('/web/index.php/dashboard/index');
      return await this.isLogoutButtonVisible(page);
    } else {
      return true;
    }
  }

  async about(): Promise<void> {
    const aboutButton = this.aboutButton;
    await this.openProfileMenu();
    await aboutButton.click();
    await expect(this.popup).toBeVisible();
  }

  async checkAboutPopupInformation(): Promise<boolean> {
    const popupTitle = this.popupTitle;
    const popupCompanyName = this.popupCompanyName;
    const popupVersion = this.popupVersion;
    const popupActiveEmployees = this.popupActiveEmployees;
    const popupEmployeesTerminated = this.popupEmployeesTerminated;

    try {
      await expect(popupTitle).toHaveText('About');
      await expect(popupCompanyName).toBeVisible();
      await expect(popupVersion).toBeVisible();
      await expect(popupActiveEmployees).toBeVisible();
      await expect(popupEmployeesTerminated).toBeVisible();
      return true;
    }
    catch (error) {
      return false;
    }
  }

  async closePopup(): Promise<void> {
    let popup = this.popup;
    let closePopupButton = this.closePopupButton;
    await expect(popup).toBeVisible();
    await closePopupButton.click();
    await expect(popup).not.toBeVisible(); 
  }

  async accessChangePassword(): Promise<void> {
    const changePasswordButton = this.changePasswordButton;
    await this.openProfileMenu();
    await changePasswordButton.click();    
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

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const currentPasswordInput = this.currentPassword;
    const newPasswordInput = this.newPassword;
    const confirmPasswordInput = this.confirmPassword;
    const saveButton = this.changePasswordSaveButton;

    await currentPasswordInput.fill(oldPassword);
    await newPasswordInput.fill(newPassword);
    await confirmPasswordInput.fill(newPassword);
    await saveButton.click();             
  }

  /**
   * It Allows to wait For Page Change URL
   * @param {PageChangeOption} options 
   * @returns {Promise<void>}
   */
  async waitForPageChange(options?: PageChangeOption): Promise<void> {
    const { path = '/auth/login', operator = "not" } = options || {};

    if (typeof path === 'string') {
      // Si es una cadena
      return operator === 'not'
        ? await this.page.waitForURL(url => !url.pathname.includes(path))
        : await this.page.waitForURL(url => url.pathname.includes(path));
    } else {
      // Si es una expresión regular
      return operator === 'not'
        ? await expect(this.page).not.toHaveURL(/auth\/login$/)
        : await expect(this.page).toHaveURL(/auth\/login$/);
    }
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load', { timeout: 60000 }); // Espera a que el DOM esté cargado
  }
}
