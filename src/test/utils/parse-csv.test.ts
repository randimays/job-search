import { describe, expect, it } from 'vitest';
import { parseCsv } from '../../utils/parse-csv';

describe('parseCsv', () => {
  it('correctly parses CSV data', () => {
    expect(parseCsv('Ashby,aidkit,AidKit\nAshby,propel,Propel\nAshby,sovra,SOVRA')).toEqual([
      ['Ashby', 'aidkit', 'AidKit'],
      ['Ashby', 'propel', 'Propel'],
      ['Ashby', 'sovra', 'SOVRA']
    ])
  });
});