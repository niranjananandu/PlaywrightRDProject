import fs from 'fs';
import path from 'path';

export async function takeTimestampedScreenshot(page, title, dir = 'screenshots') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${safeTitle}_${timestamp}.png`;

  const fullPath = path.join(dir, fileName);

  // Create folder if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await page.screenshot({ path: fullPath });
}