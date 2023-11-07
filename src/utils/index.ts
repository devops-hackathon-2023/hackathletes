import moment from 'moment';

export const capitalizeFirstLetter = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

export const getPageTitle = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return capitalizeFirstLetter(lastSegment);
};

export const toRelativeTime = (dateString: string): string => moment(dateString).fromNow();

export const toRelativeTimeShort = (date: string) => {
  const formattedDate = moment(date);
  const diffMinutes = moment().diff(formattedDate, 'minutes');
  const diffHours = moment().diff(formattedDate, 'hours');
  const diffDays = moment().diff(formattedDate, 'days');
  const diffMonths = moment().diff(formattedDate, 'months');
  const diffYears = moment().diff(formattedDate, 'years');

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  if (diffDays < 30) {
    return `${diffDays}d`;
  }
  if (diffMonths < 12) {
    return `${diffMonths}M`;
  }
  return `${diffYears}y`;
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
