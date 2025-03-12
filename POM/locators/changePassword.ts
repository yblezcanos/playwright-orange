/**
 * Locators for the Change Password page in the OrangeHRM application.
 */
export const changePasswordLocators = {
    /**
     * Locator for the Change Password button in the menu.
     * @type {Array}
     */
    changePasswordButton: ['menuitem', { name: 'Change Password' }],

    /**
     * URL for the Change Password page.
     * @type {string}
     */
    changePasswordUrl: '/web/index.php/pim/updatePassword',

    /**
     * Locator for the PIM heading.
     * @type {Array}
     */
    PIMPath: ['heading', { name: 'PIM' }],

    /**
     * Locator for the container of the Change Password section.
     * @type {string}
     */
    containerChangePassword: '.orangehrm-main-title',

    /**
     * Locator for the current password input field.
     * @type {string}
     */
    currentPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Current Password")) + div input[type="password"]',

    /**
     * Locator for the new password input field.
     * @type {Object}
     * @property {string} css - CSS selector for the new password input field.
     * @property {number} nth - Index of the new password input field.
     */
    newPassword: { "css": 'div.oxd-input-group__label-wrapper:has(label:text("Password")) + div input[type="password"]', "nth": 1 },

    /**
     * Locator for the confirm password input field.
     * @type {string}
     */
    confirmPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Confirm Password")) + div input[type="password"]',

    /**
     * Locator for the Save button on the Change Password page.
     * @type {Array}
     */
    changePasswordSaveButton: ['button', { name: 'Save' }],

    /**
     * Locator for the Cancel button on the Change Password page.
     * @type {Array}
     */
    changePasswordCancelButton: ['button', { name: 'Cancel' }],

    /**
     * Locator for the loading spinner.
     * @type {string}
     */
    spinner: '.oxd-loading-spinner',

    /**
     * Locator for the error message toast.
     * @type {string}
     */
    errorMessage: '.oxd-toast-content--error .oxd-text--toast-message',

    /**
     * Locator for the successfully Saved message toast.
     * @type {string}
     */
    successfullySaved: '.oxd-toast-content-text.oxd-text--toast-message',

    /**
     * Locator for the alert message displayed below New Password field.
     * @type {string}
     */
    //alertMessage: '.oxd-input-field-error-message',
    alertMessageNewPassword:'.oxd-input-group:has(label:has-text("Password")) .oxd-input-field-error-message',

    /**
     * Locator for the new password policy label.
     * @type {string}
     */
    newPasswordLabelPolicy: '.orangehrm-password-chip',

    /**
     * Locator for the confirm password alert error.
     * @type {string}
     */
    confirmPasswordAlertErrorMessage: 'Passwords do not match',

    /**
     * Locator for the alert message displayed below Confirm Password field.
     * @type {string}
     */
    alertMessageConfirmPassword: '.oxd-input-group:has(label:has-text("Confirm Password")) .oxd-input-field-error-message',
};
