// data/userData.js
import fs from 'fs';

export function readJSON(path) {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
}
