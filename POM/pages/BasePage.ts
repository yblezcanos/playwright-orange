import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.locator(".oxd-topbar-header");
    this.sidebar = page.getByRole('navigation', { name: 'Sidepanel' });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async isSidebarVisible(): Promise<boolean> {
    return await this.sidebar.isVisible();
  }
}
