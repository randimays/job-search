export const parseCsv = fileContents => {
  return fileContents
    .split(/\r?\n/)
    .map(row => {
      return row.split(',');
    });
};