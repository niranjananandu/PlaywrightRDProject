import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createFolder } from '../../utils/createDatedFolder.js';
import fs from 'fs';
import { test } from '../fixtures/loginFixture.js';


test.only('should have no critical accessibility violations', async ({ pageManager }, testInfo) => {
if (!pageManager || !pageManager.page) {
        throw new Error('pageManager or pageManager.page is not initialized');
    }

    const dir = 'accessibilityLogs';
    const path = createFolder(testInfo.title, dir)
    const fullPath = path + '.txt'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const results = await new AxeBuilder(pageManager.page).analyze();
    const serious = results.violations.filter(v => v.impact === 'critical');
    if (serious.length > 0) {
        console.log('Serious/Critical accessibility violations:', serious);
        fs.appendFileSync(fullPath, JSON.stringify(serious, null, 2));
    }
    expect(serious).toEqual([]);
});