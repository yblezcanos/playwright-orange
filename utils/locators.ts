import { Locator, Page } from "@playwright/test";

// Definir los tipos de localizadores admitidos
export type LocatorType =
  | string  // XPath o CSS
  | { css: string; nth?: number }  // getByText
  | { text: string; nth?: number }  // getByText
  | { label: string; nth?: number }  // getByLabel
  | { placeholder: string; nth?: number }  // getByPlaceholder
  | { altText: string; nth?: number }  // getByAltText
  | { title: string; nth?: number }  // getByTitle
  | { testId: string; nth?: number }  // getByTestId
  | [role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]]; // getByRole

/**
 * Get the component by locatorType
 * @param {Page} page 
 * @param {LocatorType} locator 
 * @returns {locator} Located Component
 */
export function getByLocator(page: Page, config: LocatorType): Locator {
  let cmp: Locator | null = null;

  if (typeof config === "string") {
    config = { "css": config };
  }

  if (Array.isArray(config)) {
    cmp = page.getByRole(config[0], config[1]);  // Manejo de getByRole
  }

  if ("css" in config) {
    cmp = page.locator(config.css);  // Manejo de CSS/XPath
  }

  if ("text" in config) {
    cmp = page.getByText(config.text);  // Manejo de getByText
  }

  if ("label" in config) {
    cmp = page.getByLabel(config.label);  // Manejo de getByLabel
  }

  if ("placeholder" in config) {
    cmp = page.getByPlaceholder(config.placeholder);  // Manejo de getByPlaceholder
  }

  if ("altText" in config) {
    cmp = page.getByAltText(config.altText);  // Manejo de getByAltText
  }

  if ("title" in config) {
    cmp = page.getByTitle(config.title);  // Manejo de getByTitle
  }

  if ("testId" in config) {
    cmp = page.getByTestId(config.testId);  // Manejo de getByTestId
  }

  if (!cmp) {
    throw new Error("Invalid locator type");
  }

  if ("nth" in config && config.nth !== undefined) {
    cmp = cmp.nth(config.nth);
  }

  return cmp;
}
