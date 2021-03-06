export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'img/pin.svg';

export const URL_MARKER_CURRENT =
  'img/pin-active.svg';

export const STAR_RATING = [
  'terribly', 'badly', 'not bad', 'good', 'perfect',
];

export const CITY_NAMES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg'
];
