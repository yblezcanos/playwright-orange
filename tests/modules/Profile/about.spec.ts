import { test, expect } from '@playwright/test';
import { BasePage } from '../../../POM/pages/BasePage';

test.describe('Profile About Section', () => {
    test('should open the about popup with correct information', async ({ page }) => {
        let basePage = new BasePage(page);
        await basePage.goToDashboard(page);
        await basePage.about();
        let IsPopupInformationOK = await basePage.checkAboutPopupInformation();
        await expect(IsPopupInformationOK).toBeTruthy();    
    });

    test('should close the about popup', async ({ page }) => {
        let basePage = new BasePage(page);
        await basePage.goToDashboard(page);
        await basePage.about();
        await basePage.closePopup();        
    });
});