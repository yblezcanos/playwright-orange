/**
 * Locators for the login page of the OrangeHRM application.
 */
export const loginPageLocators = {
    /**
     * URL of the login page.
     */
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

    /**
     * Locator for the title element on the login page.
     * The title is expected to be a heading with the name 'Login'.
     */
    title: ['heading', { name: 'Login' }],

    /**
     * Locator for the username input field.
     * The input field is identified by its placeholder attribute 'Username'.
     */
    username: { placeholder: 'Username' },

    /**
     * Locator for the password input field.
     * The input field is identified by its placeholder attribute 'Password'.
     */
    password: { placeholder: 'Password' },

    /**
     * Locator for the login button.
     * The button is identified by its name attribute 'Login'.
     */
    loginButton: ['button', { name: 'Login' }],

    /**
     * Locator for the validation message associated with the username input field.
     * The validation message is expected to be a sibling span element following the input field.
     */
    usernameValidationMessage: 'div:has(input[placeholder="Username"]) + span',

    /**
     * Locator for the validation message associated with the password input field.
     * The validation message is expected to be a sibling span element following the input field.
     */
    passwordValidationMessage: 'div:has(input[placeholder="Password"]) + span',

    /**
     * Locator for the error alert element.
     * The error alert is identified by the class 'oxd-alert--error'.
     */
    errorAlert: '.oxd-alert--error',

    /**
     * Locator for the text within the error alert element.
     * The text is identified by the class 'oxd-alert--error'.
     */
    errorAlertText: '.oxd-alert--error',
};
