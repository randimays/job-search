const US_STATES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const STATE_ABBREVIATIONS = new Set(Object.keys(US_STATES));
const STATE_NAMES = new Set(Object.values(US_STATES).map(name => name.toLowerCase()));

// Matches anywhere inside the city text (case-insensitive, so 'REMOTE', 'Remotely',
// 'Tele-commute', 'Virtual', and 'Remote-Austin' are all caught). None of these
// appear inside a real US city name.
const NON_CITY_PATTERN = new RegExp(
  [
    'remote',
    'tele[\\s-]*commut',
    'tele[\\s-]*work',
    'virtual',
    'work[\\s-]*from[\\s-]*home',
    'wfh',
    'home[\\s-]*based',
    'hybrid',
    'on[\\s-]*site',
    'anywhere',
    'nationwide',
    'multiple',
    'locations?',
    'united[\\s-]*states',
  ].join('|'),
  'i',
);

// Standalone words that are not part of a real city name. Whole word match only,
// because 'us' appears inside real cities like 'Augusta' or 'Houston'.
const NON_CITY_WORDS = new Set(['usa', 'us', 'u.s.', 'u.s.a.']);

// Letters, spaces, periods, apostrophes, and hyphens only.
// Covers 'St. Louis', 'Winston-Salem', 'O'Fallon', 'Coeur d'Alene'.
const CITY_PATTERN = /^[A-Za-z][A-Za-z.'\- ]*[A-Za-z.]$/;

/**
 * Returns true only when the string is exactly 'City, State' where State is a
 * full US state name (any casing) or a two letter abbreviation (uppercase).
 *
 * Passes:  'Montgomery, Alabama', 'Montgomery, AL', 'St. Louis, MO'
 * Fails:   'Remote - Washington', 'Remote, Washington', 'Austin, TX, USA',
 *          'Texas', 'Austin', 'Toronto, Ontario'
 */
export function isCityAndState(location: string | null | undefined): boolean {
  if (!location || typeof location !== 'string') {
    return false;
  }

  const parts = location.trim().split(',');

  if (parts.length !== 2) {
    return false;
  }

  const city = parts[0]?.trim().replace(/\s+/g, ' ');
  const state = parts[1]?.trim();

  if (!city || !state) {
    return false;
  }

  if (!CITY_PATTERN.test(city)) {
    return false;
  }

  if (NON_CITY_PATTERN.test(city)) {
    return false;
  }

  const cityWords = city?.toLowerCase().split(/\s+/);

  if (!cityWords) {
    return false;
  }

  for (const word of cityWords) {
    if (NON_CITY_WORDS.has(word)) {
      return false;
    }
  }

  // Abbreviations must be uppercase so 'Austin, in' or 'Reno, or' don't slip through.
  if (STATE_ABBREVIATIONS.has(state)) {
    return true;
  }

  return STATE_NAMES.has(state.toLowerCase());
}