import { createFolder } from './createDatedFolder';

export async function takeTimestampedScreenshot(page, title, dir = 'screenshots') {
  const path = createFolder(title, dir)
  const fullPath = path + '.png'
  console.log('screenshot: '+fullPath)
  await page.screenshot({ path: fullPath });
}