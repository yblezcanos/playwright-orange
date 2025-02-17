import { Locator, Page } from "@playwright/test";

// Definir los tipos de localizadores admitidos
export type LocatorType =
  | string  // XPath o CSS
  | { text: string }  // getByText
  | { label: string }  // getByLabel
  | { placeholder: string }  // getByPlaceholder
  | { altText: string }  // getByAltText
  | { title: string }  // getByTitle
  | { testId: string }  // getByTestId
  | [role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]]; // getByRole

export function getByLocator(page: Page, locator: LocatorType): Locator {
  if (typeof locator === "string") {
    return page.locator(locator);  // Manejo de CSS/XPath
  }

  if (Array.isArray(locator)) {
    return page.getByRole(locator[0], locator[1]);  // Manejo de getByRole
  }

  if ("text" in locator) {
    return page.getByText(locator.text);  // Manejo de getByText
  }

  if ("label" in locator) {
    return page.getByLabel(locator.label);  // Manejo de getByLabel
  }

  if ("placeholder" in locator) {
    return page.getByPlaceholder(locator.placeholder);  // Manejo de getByPlaceholder
  }

  if ("altText" in locator) {
    return page.getByAltText(locator.altText);  // Manejo de getByAltText
  }

  if ("title" in locator) {
    return page.getByTitle(locator.title);  // Manejo de getByTitle
  }

  if ("testId" in locator) {
    return page.getByTestId(locator.testId);  // Manejo de getByTestId
  }

  throw new Error("Invalid locator type");
}
