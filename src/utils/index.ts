export const capitalizeFirstLetter = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

export const getPageTitle = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return capitalizeFirstLetter(lastSegment);
};
