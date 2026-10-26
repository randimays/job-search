export const parseCsv = (fileContents: string): any => {
  return fileContents
    .split(/\r?\n/)
    .map((row: string): string[] => {
      return row.split(',');
    });
};