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
export const BASE_URL = 'http://192.168.1.69:8000/';
export const API_BASE_URL = BASE_URL + 'api/';
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

/**
 * Dummy Data
 */
export const ROOMS_DATA = [
  {
    id: 1,
    description: 'Sala 1',
    availableTables: 5,
    busyTables: 5,
  },
  {
    id: 2,
    description: 'Sala 2',
    availableTables: 10,
    busyTables: 2,
  },
  {
    id: 3,
    description: 'Sala 3',
    availableTables: 20,
    busyTables: 2,
  },
];

export const TABLES_DATA = [
  {
    id: 1,
    roomId: 1,
    description: 'Mesa 1',
    seats: 4,
    hasRequest: true,
  },
  {
    id: 2,
    roomId: 1,
    description: 'Mesa 2',
    seats: 4,
    hasRequest: true,
  },
  {
    id: 3,
    roomId: 1,
    description: 'Mesa 3',
    seats: 4,
    hasRequest: true,
  },
  {
    id: 4,
    roomId: 1,
    description: 'Mesa 4',
    seats: 10,
    hasRequest: true,
  },
  {
    id: 5,
    roomId: 1,
    description: 'Mesa 5',
    seats: 2,
    hasRequest: true,
  },
  {
    id: 6,
    roomId: 2,
    description: 'Mesa 1',
    seats: 6,
    hasRequest: false,
  },
  {
    id: 7,
    roomId: 2,
    description: 'Mesa 2',
    seats: 4,
    hasRequest: true,
  },
  {
    id: 8,
    roomId: 2,
    description: 'Mesa 3',
    seats: 4,
    hasRequest: false,
  },
  {
    id: 9,
    roomId: 2,
    description: 'Mesa 4',
    seats: 10,
    hasRequest: true,
  },
  {
    id: 10,
    roomId: 2,
    description: 'Mesa 5',
    seats: 4,
    hasRequest: false,
  },
  {
    id: 11,
    roomId: 2,
    description: 'Mesa 6',
    seats: 6,
    hasRequest: false,
  },
  {
    id: 12,
    roomId: 2,
    description: 'Mesa 7',
    seats: 4,
    hasRequest: false,
  },
  {
    id: 13,
    roomId: 2,
    description: 'Mesa 8',
    seats: 2,
    hasRequest: false,
  },
  {
    id: 14,
    roomId: 2,
    description: 'Mesa 9',
    seats: 4,
    hasRequest: false,
  },
  {
    id: 15,
    roomId: 2,
    description: 'Mesa 10',
    seats: 6,
    hasRequest: false,
  },
  {
    id: 16,
    roomId: 3,
    description: 'Mesa 1',
    seats: 2,
    hasRequest: true,
  },
  {
    id: 17,
    roomId: 3,
    description: 'Mesa 2',
    seats: 4,
    hasRequest: false,
  },
  {
    id: 18,
    roomId: 3,
    description: 'Mesa 3',
    seats: 10,
    hasRequest: true,
  },
  {
    id: 19,
    roomId: 3,
    description: 'Mesa 4',
    seats: 4,
    hasRequest: false,
  },
  {
    id: 20,
    roomId: 3,
    description: 'Mesa 5',
    seats: 6,
    hasRequest: false,
  },
];

export const CATEGORIES_DATA = [
  {
    id: 1,
    description: 'Hambur.',
    imageSource: {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910014.png',
    },
  },
  {
    id: 2,
    description: 'Pipocas',
    imageSource: {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910018.png',
    },
  },
  {
    id: 3,
    description: 'Café',
    imageSource: {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910024.png',
    },
  },
  {
    id: 4,
    description: 'Batatas',
    imageSource: {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910027.png',
    },
  },
  {
    id: 5,
    description: 'Bebidas',
    imageSource: {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910024.png',
    },
  },
  {
    id: 6,
    description: 'Pizza',
    imageSource: {
      uri: 'https://cdn-icons-png.flaticon.com/256/4910/4910034.png',
    },
  },
];

export const PRODUCTS_DATA = [
  {
    id: 1,
    categoryId: 3,
    description: 'ad',
    price: 42.15,
  },
  {
    id: 2,
    categoryId: 3,
    description: 'Lorem',
    price: 27.81,
  },
  {
    id: 3,
    categoryId: 6,
    description: 'excepteur',
    price: 4.85,
  },
  {
    id: 4,
    categoryId: 4,
    description: 'consectetur',
    price: 19.62,
  },
  {
    id: 5,
    categoryId: 5,
    description: 'quis',
    price: 5.74,
  },
  {
    id: 6,
    categoryId: 3,
    description: 'adipisicing',
    price: 2.92,
  },
  {
    id: 7,
    categoryId: 4,
    description: 'minim',
    price: 22.21,
  },
  {
    id: 8,
    categoryId: 1,
    description: 'dolor',
    price: 32.05,
  },
  {
    id: 9,
    categoryId: 4,
    description: 'veniam',
    price: 32.93,
  },
  {
    id: 10,
    categoryId: 3,
    description: 'fugiat',
    price: 19.27,
  },
  {
    id: 11,
    categoryId: 5,
    description: 'Lorem',
    price: 34.29,
  },
  {
    id: 12,
    categoryId: 4,
    description: 'nisi',
    price: 39.73,
  },
  {
    id: 13,
    categoryId: 3,
    description: 'qui',
    price: 42.28,
  },
  {
    id: 14,
    categoryId: 2,
    description: 'quis',
    price: 32.71,
  },
  {
    id: 15,
    categoryId: 6,
    description: 'excepteur',
    price: 2.11,
  },
  {
    id: 16,
    categoryId: 1,
    description: 'in',
    price: 14.26,
  },
  {
    id: 17,
    categoryId: 5,
    description: 'officia',
    price: 24.31,
  },
  {
    id: 18,
    categoryId: 3,
    description: 'enim',
    price: 35.29,
  },
  {
    id: 19,
    categoryId: 6,
    description: 'Lorem',
    price: 40.36,
  },
  {
    id: 20,
    categoryId: 3,
    description: 'amet',
    price: 46.1,
  },
  {
    id: 21,
    categoryId: 5,
    description: 'et',
    price: 48.91,
  },
  {
    id: 22,
    categoryId: 5,
    description: 'est',
    price: 12.08,
  },
  {
    id: 23,
    categoryId: 6,
    description: 'mollit',
    price: 29.64,
  },
  {
    id: 24,
    categoryId: 2,
    description: 'officia',
    price: 45.3,
  },
  {
    id: 25,
    categoryId: 5,
    description: 'id',
    price: 6.65,
  },
  {
    id: 26,
    categoryId: 5,
    description: 'voluptate',
    price: 42.23,
  },
  {
    id: 27,
    categoryId: 4,
    description: 'occaecat',
    price: 40.65,
  },
  {
    id: 28,
    categoryId: 4,
    description: 'pariatur',
    price: 10.78,
  },
  {
    id: 29,
    categoryId: 6,
    description: 'nulla',
    price: 22.23,
  },
  {
    id: 30,
    categoryId: 1,
    description: 'cupidatat',
    price: 42.42,
  },
  {
    id: 31,
    categoryId: 6,
    description: 'Lorem',
    price: 30.38,
  },
  {
    id: 32,
    categoryId: 3,
    description: 'sunt',
    price: 22.11,
  },
  {
    id: 33,
    categoryId: 4,
    description: 'voluptate',
    price: 36.82,
  },
  {
    id: 34,
    categoryId: 6,
    description: 'velit',
    price: 6.75,
  },
  {
    id: 35,
    categoryId: 4,
    description: 'eu',
    price: 5.32,
  },
  {
    id: 36,
    categoryId: 1,
    description: 'minim',
    price: 48.71,
  },
  {
    id: 37,
    categoryId: 1,
    description: 'irure',
    price: 42.3,
  },
  {
    id: 38,
    categoryId: 6,
    description: 'proident',
    price: 10.44,
  },
  {
    id: 39,
    categoryId: 4,
    description: 'aute',
    price: 13.73,
  },
  {
    id: 40,
    categoryId: 4,
    description: 'ipsum',
    price: 23.84,
  },
  {
    id: 41,
    categoryId: 5,
    description: 'incididunt',
    price: 16.65,
  },
  {
    id: 42,
    categoryId: 4,
    description: 'labore',
    price: 14.36,
  },
  {
    id: 43,
    categoryId: 4,
    description: 'tempor',
    price: 47.56,
  },
  {
    id: 44,
    categoryId: 1,
    description: 'proident',
    price: 13.74,
  },
  {
    id: 45,
    categoryId: 3,
    description: 'ut',
    price: 23.2,
  },
  {
    id: 46,
    categoryId: 3,
    description: 'id',
    price: 46.88,
  },
  {
    id: 47,
    categoryId: 4,
    description: 'cupidatat',
    price: 21.16,
  },
  {
    id: 48,
    categoryId: 3,
    description: 'ea',
    price: 36.97,
  },
  {
    id: 49,
    categoryId: 2,
    description: 'in',
    price: 16.78,
  },
  {
    id: 50,
    categoryId: 1,
    description: 'qui',
    price: 40.98,
  },
];
