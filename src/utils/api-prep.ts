import { BOARD_CONFIGS } from '../api/board-configs.ts';
import type { CompanyRow } from '../types/index.ts';

type Batches = Record<string, CompanyRow[]>;

export const batchCompaniesByProvider = (csvData: CompanyRow[]): Batches => {
  const batches: Batches = {};

  // Create an object with key:value pairs where the key is a provider (e.g. Greenhouse)
  // and the value is all of the rows in the spreadsheet for companies that use that provider
  // e.g. { Greenhouse: [['Greenhouse', 'capitaltg', 'Capital Technology Group']]}
  for (const config of BOARD_CONFIGS) {
    const companiesForThisBatch = csvData.filter(row => {
      const boardName = row.provider;

      return boardName?.toLowerCase() === config.name.toLowerCase();
    });

    if (companiesForThisBatch.length) {
      batches[config.name] = companiesForThisBatch;
    }
  }

  return batches;
};