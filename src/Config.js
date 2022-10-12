import Config from 'react-native-config';

/**
 * Colors
 */
export const COLORS = {
  primary: '#55A8D4',
  primary100: '#29C6E0',
  gray: '#7F7F84',
  white: '#fff',
  green: 'green',
  red: 'red',
};

/**
 * General Dimensions
 */
export const GENERAL_DIMENSIONS = {
  cardBorderRadius: 12,
};

/**
 * Login Screen Dimensions
 */
export const LOGIN_DIMENSIONS = {
  formHorizontalMargin: 20,
  inputsBorderRadius: 12,
  buttonBorderRadius: 12,
};

/**
 * API
 */
export const BASE_URL = Config.BASE_URL;
export const API_BASE_URL = BASE_URL + '/api/';
export const API_TOKEN_TYPE = 'Bearer';

/**
 * Storage
 */
export const STORAGE_KEY = 'rwKc:8)%8cPubxjADUK$Cfk~dN]b&YLk';
export const STORAGE_NAMES = {
  TOKEN: 'APP:TOKEN',
  PROFILE: 'APP:PROFILE',
  LAST_LOGGED_USER_ID: 'APP:LAST_LOGGED_USER_ID',
  CURRENT_LOCALE: 'APP:CURRENT_LOCALE',
};

/**
 * Order Screen Dimensions
 */
export const ORDER_DIMENSIONS = {
  tableDescriptionWidth: '70%',
};
