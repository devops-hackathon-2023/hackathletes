export const DEFAULT_USER = {
  id: '-1',
  name: 'User not found',
  role: 'Role not found',
  password: '',
  profilePicture: '',
  favourites: [],
};

export const DEFAULT_LOGIN_USER_ID = '1';

export const ENVIRONMENTS = ['DEV', 'INT', 'PRS', 'PRED', 'PROD'];

export const QUALITY_GATE_TYPES = [
  'SECURITY_HOTSPOTS_REVIEWED',
  'CODE_COVERAGE',
  'DUPLICATED_LINES',
  'XRAY_DOCKER',
  'MAINTAINABILITY_RATING',
  'RELIABILITY_RATING',
  'SECURITY_RATING',
] as const;
