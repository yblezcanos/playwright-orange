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
  readonly profileMenu: Locator;

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
    this.profileMenu = getByLocator(page, basePageLocators.profileMenu);
  }

  /**
   * Navigates to the specified URL.
   *
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Checks if the sidebar is visible on the page.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the sidebar is visible.
   */
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
      await navbarPath.waitFor({ state: 'attached', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the profile menu by clicking on the profile dropdown element.
   * 
   * @returns {Promise<void>} A promise that resolves when the profile menu is opened.
   */
  async openProfileMenu(): Promise<void> {
    await this.profileDropdown.click(); // Hace clic en el menú del usuario para desplegar las opciones
  }

  /**
   * Navigates to the dashboard page if the specified locator is not visible.
   * 
   * @param page - The Playwright Page object representing the browser page.
   * @param locator - The Playwright Locator object to check for visibility.
   * @returns A promise that resolves to a boolean indicating whether the locator is visible.
   */
  async goToDashboard(page: Page, locator: Locator): Promise<boolean> {
    if (!(await locator.isVisible())) {
      // Si no estás en una página con el botón de logout u otra opción del menú de perfil, navega al dashboard
      await page.goto('/web/index.php/dashboard/index');

      // Espera a que el locator esté visible con un timeout
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
    }
    return await locator.isVisible();
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
  async isLogoutButtonVisible(page: Page): Promise<boolean> {
    try {
      await expect(this.logoutButton).toBeVisible();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Navigates to the "About" section by performing the following steps:
   * 1. Opens the profile menu.
   * 2. Clicks the "About" button.
   * 3. Verifies that the popup is visible.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async about(): Promise<void> {
    const aboutButton = this.aboutButton;
    await this.openProfileMenu();
    await aboutButton.click();
    await expect(this.popup).toBeVisible();
  }

  /**
   * Checks the information displayed in the "About" popup.
   *
   * This method verifies that the "About" popup contains the expected title and that
   * the company name, version, active employees, and terminated employees elements are visible.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if all checks pass, or `false` if any check fails.
   */
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

  /**
   * Closes the popup if it is visible.
   * 
   * This method first checks if the popup is visible, then clicks the close button,
   * and finally verifies that the popup is no longer visible.
   * 
   * @returns {Promise<void>} A promise that resolves when the popup is closed.
   */
  async closePopup(): Promise<void> {
    let popup = this.popup;
    let closePopupButton = this.closePopupButton;
    await expect(popup).toBeVisible();
    await closePopupButton.click();
    await expect(popup).not.toBeVisible();
  }

  /**
   * Checks if the change password button is visible on the page.
   *
   * @param {Page} page - The Playwright Page object representing the browser page.
   * @returns {Promise<boolean>} A promise that resolves to true if the change password button is visible, otherwise false.
   */
  async isChangePasswordVisible(page: Page): Promise<boolean> {
    try {
      await expect(this.changePasswordButton).toBeVisible();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Navigates to the change password section by performing the following steps:
   * 1. Opens the profile menu.
   * 2. Clicks on the change password button.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async accessChangePassword(): Promise<void> {
    const changePasswordButton = this.changePasswordButton;
    await this.openProfileMenu();
    await changePasswordButton.click();
  }

  /**
   * Verifies the visibility of the profile menu on the page.
   * Ensures that the profile menu is visible and contains the expected text.
   *
   * @param {Page} page - The Playwright Page object representing the browser page.
   * @returns {Promise<void>} A promise that resolves when the verification is complete.
   */
  async verifyMenuVisibility(page: Page): Promise<void> {
    // Asegúrate de que el menú de perfil esté visible en cada resolución
    await this.openProfileMenu();
    const menu = this.profileMenu;
    await expect(menu).toBeVisible();
  
    // Verifica si el menú se ve correctamente (puedes agregar más comprobaciones visuales)
    const menuText = await menu.textContent();
    expect(menuText).toContain('About');   
    expect(menuText).toContain('Support');
    expect(menuText).toContain('Change Password'); 
    expect(menuText).toContain('Logout');     
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

  /**
   * Waits for the page to fully load.
   * 
   * This method waits for the page's load state to be 'load', indicating that the DOM content is fully loaded.
   * It has a timeout of 60 seconds.
   * 
   * @returns {Promise<void>} A promise that resolves when the page load is complete.
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('load', { timeout: 60000 }); // Espera a que el DOM esté cargado
  }  
}
