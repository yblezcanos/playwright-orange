import { error } from "console";

export const changePasswordLocators = {
    changePasswordButton: ['menuitem', { name: 'Change Password' }],
    changePasswordUrl: '/web/index.php/pim/updatePassword',
    PIMPath: ['heading', { name: 'PIM' }],
    containerChangePassword: '.orangehrm-main-title',
    currentPassword:   'div.oxd-input-group__label-wrapper:has(label:text("Current Password")) + div input[type="password"]',
    newPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Password")) + div input[type="password"]',
    confirmPassword: 'div.oxd-input-group__label-wrapper:has(label:text("Confirm Password")) + div input[type="password"]',
    changePasswordSaveButton: ['button', { name: 'Save' }],
    changePasswordCancelButton: ['button', { name: 'Cancel' }],
    spinner: '.oxd-loading-spinner',

    errorMessage: '.oxd-toast.oxd-toast--error',
    alertMessage: '.oxd-input-field-error-message',
    newPasswordLabelPolicy: '.orangehrm-password-chip',
};
