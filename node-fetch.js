import fs from 'fs';
import http from 'http';
import { parseCsv } from './src/utils/parseCsv.ts';
import { batchCompaniesByProvider } from './src/utils/api-prep.ts';

const spreadsheetRaw = fs.readFileSync('./jobBoards-test.csv', 'utf-8');
const formatted = parseCsv(spreadsheetRaw);
const batches = batchCompaniesByProvider(formatted);
console.log('batches: ', batches);

formatted.forEach(companyRow => {
});

const server = http.createServer((req, res) => {
  res.end('Hello');
});

server.listen(8000, '127.0.0.1', () => {
});