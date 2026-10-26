import fs from 'fs';
import http from 'http';
import { parseCsv } from './src/utils/parseCsv.js';

const spreadsheetRaw = fs.readFileSync('./jobBoards.csv', 'utf-8');
const formatted = parseCsv(spreadsheetRaw);

const server = http.createServer((req, res) => {
  res.end('Hello');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});