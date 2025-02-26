import { error } from "console";

export const basePageLocators = {
    navbar: '.oxd-topbar-header',      
    sidebar: ['navigation', { name: 'Sidepanel' }],
    path: ['heading', { name: 'Dashboard' }],

    profileDropdown: '.oxd-topbar-header-userarea',

    logoutButton: ['menuitem', { name: 'Logout' }],

    aboutButton: ['menuitem', { name: 'About' }],
    popup: '.oxd-dialog-sheet',
    popupTitle: ['heading', { name: 'About' }],
    popupCompanyName: { text: 'Company Name: ' },
    popupVersion: { text: 'Version: ' },
    popupActiveEmployees: { text: 'Active Employees: ' },
    popupEmployeesTerminated: { text: 'Employees Terminated: ' },
    closePopupButton: '.oxd-dialog-close-button',

    changePasswordButton: ['menuitem', { name: 'Change Password' }],
    changePasswordUrl: '/web/index.php/pim/updatePassword',
    PIMPath: ['heading', { name: 'PIM' }],
    containerChangePassword: '.orangehrm-main-title',
    currentPassword: { label: 'Current Password' },
    newPassword: { label: 'Password' },
    confirmPassword: { label: 'Confirm Password' },
    changePasswordSaveButton: ['button', { name: 'Save' }],
    changePasswordCancelButton: ['button', { name: 'Cancel' }],
};
