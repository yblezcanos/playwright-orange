import { error } from "console";

export const loginPageLocators = {
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    title: ['heading', { name: 'Login' }],
    username: { placeholder: 'Username' },
    password: { placeholder: 'Password' },
    loginButton: ['button', { name: 'Login' }],
    usernameValidationMessage: 'div:has(input[placeholder="Username"]) + span',
    passwordValidationMessage: 'div:has(input[placeholder="Password"]) + span',

    errorAlert: '.oxd-alert--error',
    errorAlertText: '.oxd-alert--error',
};
