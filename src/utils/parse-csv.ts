import type { CompanyRow } from '../types';

export const parseCsv = (fileContents: string): CompanyRow[] => {
  const rows = fileContents
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line !== '');

  return rows.map(row => {
    const columns = row.split(',');
    const [provider = '', boardToken = '', companyName = ''] = columns;

    return {
      provider: provider.trim(),
      boardToken: boardToken.trim(),
      companyName: companyName.trim()
    };
  });
};