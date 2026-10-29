import { BOARD_CONFIGS } from '../api/board-configs.ts';

type Batches = Record<string, string[][]>;

export const batchCompaniesByProvider = (csvData: string[][]): Batches => {
  let batches: Batches = {};

  // Create an object with key:value pairs where the key is a provider (e.g. Greenhouse)
  // and the value is all of the rows in the spreadsheet for companies that use that provider
  // e.g. { Greenhouse: [['Greenhouse', 'capitaltg', 'Capital Technology Group']]}
  for (const config of BOARD_CONFIGS) {
    const companiesForThisBatch = csvData.filter(row => {
      const boardName = row[0];

      return boardName.toLowerCase() === config.name.toLowerCase();
    });

    if (companiesForThisBatch.length) {
      batches[config.name] = companiesForThisBatch;
    }
  }

  return batches;
};