import { faker } from '@faker-js/faker';

// Genera un username aleatorio
export const generateRandomUsername = (): string => {
    return faker.internet.username();
};
// Genera un username con una longitud específica
export const generateUsernameWithXCharacters = (length: number): string => {
    return faker.internet.username().substring(0, length);
};
// Genera un password aleatorio
export const generateRandomPassword = (length: number = 8): string => {
    return faker.internet.password({ length });
};
// Genera un password con requisitos mínimos: al menos una letra y un número
export const generatePasswordWithRequirements = (length: number = 8): string => {
    let password = '';
    while (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        password = faker.internet.password({ length, memorable: false, pattern: /\w/, prefix: 'A1' }); // Asegura que tenga una letra y un número
    }
    return password;
};

// Genera un email válido
export const generateEmail = (): string => {
    return faker.internet.email();
};

// Genera un nombre aleatorio
export const generateName = (): string => {
    return faker.person.firstName();
};
