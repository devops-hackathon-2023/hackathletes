import { SasItem } from '@/constants/types';
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
  const matches = /(\d+)\s(\w+)/.exec(relativeTimeFull);
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

export const formatVersion = (version: string): string => {
  const parts = version.split('.');
  while (parts.length < 3) {
    parts.push('0');
  }
  return parts.slice(0, 3).join('.');
};

export const toggleItemInArray = (array: SasItem[], item: SasItem) => {
  const itemIndex = array.findIndex(({ moduleName }) => moduleName === item.moduleName);
  if (itemIndex !== -1) {
    array.splice(itemIndex, 1);
  } else {
    array.push(item);
  }
};

export const getItemFromSessionStorage = (key: string) => {
  try {
    const retreivedItem = sessionStorage.getItem(key);
    if (retreivedItem) {
      return JSON.parse(retreivedItem);
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};
