/**
 * A collection of locators used in the base page of the application.
 */
export const basePageLocators = {
    /**
     * Locator for the navigation bar.
     */
    navbar: '.oxd-topbar-header',

    /**
     * Locator for the sidebar navigation.
     */
    sidebar: ['navigation', { name: 'Sidepanel' }],

    /**
     * Locator for the path heading.
     */
    path: ['heading', { name: 'Dashboard' }],

    /**
     * Locator for the profile dropdown in the top bar.
     */
    profileDropdown: '.oxd-topbar-header-userarea',

    /**
     * Locator for the logout button in the menu.
     */
    logoutButton: ['menuitem', { name: 'Logout' }],

    /**
     * Locator for the about button in the menu.
     */
    aboutButton: ['menuitem', { name: 'About' }],

    /**
     * Locator for the popup dialog.
     */
    popup: '.oxd-dialog-sheet',

    /**
     * Locator for the title of the popup dialog.
     */
    popupTitle: ['heading', { name: 'About' }],

    /**
     * Locator for the company name text in the popup dialog.
     */
    popupCompanyName: { text: 'Company Name: ' },

    /**
     * Locator for the version text in the popup dialog.
     */
    popupVersion: { text: 'Version: ' },

    /**
     * Locator for the active employees text in the popup dialog.
     */
    popupActiveEmployees: { text: 'Active Employees: ' },

    /**
     * Locator for the employees terminated text in the popup dialog.
     */
    popupEmployeesTerminated: { text: 'Employees Terminated: ' },

    /**
     * Locator for the close button in the popup dialog.
     */
    closePopupButton: '.oxd-dialog-close-button',

    /**
     * Locator for the change password button in the menu.
     */
    changePasswordButton: ['menuitem', { name: 'Change Password' }],

    /**
     * URL for the change password page.
     */
    changePasswordUrl: '/web/index.php/pim/updatePassword',

    /**
     * Locator for the PIM path heading.
     */
    PIMPath: ['heading', { name: 'PIM' }],

    /**
     * Locator for the container of the change password section.
     */
    containerChangePassword: '.orangehrm-main-title',

    /**
     * Locator for the current password input field.
     */
    currentPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Current Password")) + div input[type="password"]',

    /**
     * Locator for the new password input field.
     */
    newPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Password")) + div input[type="password"]',

    /**
     * Locator for the confirm password input field.
     */
    confirmPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Confirm Password")) + div input[type="password"]',

    /**
     * Locator for the save button in the change password section.
     */
    changePasswordSaveButton: ['button', { name: 'Save' }],

    /**
     * Locator for the cancel button in the change password section.
     */
    changePasswordCancelButton: ['button', { name: 'Cancel' }],

    /**
     * Locator for the loading spinner.
     */
    spinner: '.oxd-loading-spinner',
};
