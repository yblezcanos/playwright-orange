import { error } from "console";

export const loginPageLocators = {
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    username: { placeholder: 'Username' },
    password: { placeholder: 'Password' },
    loginButton: ['button', { name: 'Login' }],
    errorAlert: '.oxd-alert--error',
};
