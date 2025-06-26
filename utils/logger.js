import fs from 'fs';
import path from 'path'
import { createFolder } from './createDatedFolder'; 

function createLogger(testName = 'default') {
  const dir = 'logs';
    const path = createFolder(testName, dir)
    const fullPath = path+'.log'
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//   const filePath = path.join(logDir, `${testName.replace(/\s+/g, '_')}.log`);

  return {
    log: (message) => {
      const timestamp = new Date().toISOString();
      const entry = `[${timestamp}] ${message}\n`;
      fs.appendFileSync(fullPath, entry);
      console.log(entry.trim());
    }
  };
}

export { createLogger };
