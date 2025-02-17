import { Page, Locator } from "@playwright/test";
import { LocatorType, getByLocator } from "../../utils/locators";
import { basePageLocators } from "../locators/basePage";

export class BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = getByLocator(page, basePageLocators.navbar);
    this.sidebar = getByLocator(page, basePageLocators.sidebar as LocatorType);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async isSidebarVisible(): Promise<boolean> {
    return await this.sidebar.isVisible();
  }
  async isNavbarTextVisible(text: string): Promise<boolean> {
    return await this.navbar.locator(`text=${text}`).isVisible();
  }
}
