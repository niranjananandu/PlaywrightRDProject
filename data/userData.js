// data/userData.js
import fs from 'fs';

export function getUsers() {
  const data = fs.readFileSync('./data/users.json', 'utf-8');
  return JSON.parse(data);
}
