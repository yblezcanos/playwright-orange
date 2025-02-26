import { error } from "console";

export const basePageLocators = {
    navbar: '.oxd-topbar-header',      
    sidebar: ['navigation', { name: 'Sidepanel' }],
    path: ['heading', { name: 'Dashboard' }],

    profileDropdown: '.oxd-topbar-header-userarea',
    logoutButton: ['menuitem', { name: 'Logout' }],
};
