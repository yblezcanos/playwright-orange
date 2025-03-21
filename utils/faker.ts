import { faker } from '@faker-js/faker';

/**
 * Generates a random username using the Faker library.
 *
 * @returns {string} A randomly generated username.
 */
export const generateRandomUsername = (): string => {
    return faker.internet.username();
};

/**
 * Generates a username with a specified number of characters.
 *
 * @param length - The desired length of the username.
 * @returns A string representing the generated username truncated to the specified length.
 */
export const generateUsernameWithXCharacters = (length: number): string => {
    return faker.internet.username().substring(0, length);
};

/**
 * Generates a random password with the specified length.
 *
 * @param {number} [length=8] - The length of the password to generate. Defaults to 8 if not specified.
 * @returns {string} A randomly generated password.
 */
export const generateRandomPassword = (length: number = 8): string => {
    return faker.internet.password({ length });
};

/**
 * Generates a password that meets specific requirements.
 * The password will be at least the specified length and will contain at least one letter and one number.
 *
 * @param {number} [length=8] - The desired length of the password. Defaults to 8 if not provided.
 * @returns {string} A generated password that meets the requirements.
 */
export const generatePasswordWithRequirements = (length: number = 8): string => {
    let password = '';
    while (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        password = faker.internet.password({ length, memorable: false, pattern: /\w/, prefix: 'A1' }); // Asegura que tenga una letra y un número
    }
    return password;
};

/**
 * Generates a random email address using the Faker library.
 *
 * @returns {string} A randomly generated email address.
 */
export const generateEmail = (): string => {
    return faker.internet.email();
};

/**
 * Generates a random first name.
 *
 * @returns {string} A randomly generated first name.
 */
export const generateName = (): string => {
    const firstName = faker.person.firstName();
    return firstName.length > 30 ? firstName.substring(0, 30) : firstName;
};

/**
 * Generates a random last name.
 *
 * @returns {string} A randomly generated last name.
 */
export const generateLastName = (): string => {
    const lastName = faker.person.lastName();
    return lastName.length > 30 ? lastName.substring(0, 30) : lastName;
};

/**
 * Generates a random middle name.
 *
 * @returns {string} A randomly generated middle name.
 */
export const generateMiddleName = (): string => {
    const middleName = faker.person.middleName();
    return middleName.length > 30 ? middleName.substring(0, 30) : middleName;
};

/**
 * Generates a random employee ID.
 * The ID will consist of a prefix "EMP" followed by a random 5-digit number.
 *
 * @returns {string} A randomly generated employee ID.
 */
export const generateEmployeeId = (): string => {
    let employeeId = '';
    while (!/^[\w!@#$%^&*()\-+=]{1,10}$/.test(employeeId)) {
        employeeId = faker.string.alphanumeric(10);
    }
    return employeeId;
};
