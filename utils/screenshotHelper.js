import fs from 'fs';
import path from 'path';

export async function takeTimestampedScreenshot(page, title, dir = 'screenshots') {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formatted = `${year}${month}${day}`;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${safeTitle}_${timestamp}.png`;
  const newdir = dir + '/' + formatted;
  const fullPath = path.join(newdir, fileName);

  // Create folder if it doesn't exist
  if (!fs.existsSync(newdir)) {
    fs.mkdirSync(newdir, { recursive: true });
  }

  await page.screenshot({ path: fullPath });
}