export const parseCsv = (fileContents: string): string[][] => {
  return fileContents
    .split(/\r?\n/)
    .map((row: string): string[] => {
      return row.split(',');
    });
};