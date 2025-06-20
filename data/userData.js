// data/userData.js
import fs from 'fs';

export function getUsers(path) {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
}
