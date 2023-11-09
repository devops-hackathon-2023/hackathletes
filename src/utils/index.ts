import moment from 'moment';

export const capitalizeFirstLetter = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

export const getPageTitle = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return capitalizeFirstLetter(lastSegment);
};
export const toRelativeTime = (dateString: string): string => moment(dateString).fromNow();
export const toRelativeTimeShort = (dateString: string): string => {
  const relativeTimeFull = toRelativeTime(dateString);

  // Use regex to extract the number and time unit from the full relative time
  const matches = relativeTimeFull.match(/(\d+)\s(\w+)/);
  if (!matches) {
    return '0m'; // Return '0m' if the dateString is less than a minute ago
  }

  const [, value, unit] = matches;

  // Map full unit names to their abbreviations
  const unitAbbreviations: { [key: string]: string } = {
    second: 's',
    minute: 'm',
    hour: 'h',
    day: 'd',
    month: 'M',
    year: 'y',
  };

  // Plural units are just the singular + 's', so we can remove the 's' to find the unit abbreviation
  const unitSingular = unit.endsWith('s') ? unit.slice(0, -1) : unit;
  const abbreviatedUnit = unitAbbreviations[unitSingular];

  if (!abbreviatedUnit) {
    return relativeTimeFull; // If we can't abbreviate, return the full string
  }

  return `${value}${abbreviatedUnit}`;
};
export const resolvePlatform = (platform: string) => {
  switch (platform) {
    case 'AZURE':
      return 'Azure';
    case 'OPEN_SHIFT':
      return 'OpenShift';
    case 'WEB_LOGIC':
      return 'WebLogic';
    default:
      return platform;
  }
};

export const resolveStatusColor = (status: string) => {
  if (status === 'SUCCESS') {
    return 'success';
  }
  if (status === 'FAILED') {
    return 'error';
  }
  return 'info';
};
