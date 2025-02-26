import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';

export async function mockDisabledUserResponse(page: Page) {
    const mockedResponse = fs.readFileSync(path.join(__dirname, 'disable.html'), 'utf8');
    //const mockedResponse = fs.readFileSync(__dirname + '/mocks/disable.html', 'utf8');

    await page.route('**/web/index.php/auth/validate', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'text/html; charset=UTF-8',
            body: mockedResponse,
        });
    });
}