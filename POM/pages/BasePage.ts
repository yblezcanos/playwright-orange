import { Page, Locator, expect } from "@playwright/test";
import { LocatorType, getByLocator } from "../../utils/locators";
import { basePageLocators } from "../locators/basePage";

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

  constructor(page: Page) {
    this.page = page;
    this.navbar = getByLocator(page, basePageLocators.navbar);
    this.sidebar = getByLocator(page, basePageLocators.sidebar as LocatorType);
    this.logoutButton = getByLocator(page, basePageLocators.logoutButton as LocatorType);
    this.profileDropdown = getByLocator(page, basePageLocators.profileDropdown as LocatorType);
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
