export const MOUSE = 'MOUSE';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_BOARD = 'USER_BOARD';

export function userLogin(info) {
  return { type: USER_LOGIN, info }
}

export function userLogout() {
  return { type: USER_LOGOUT }
}

export function setUserLoginBoard(typ) {
  return { type: USER_BOARD, typ }
}

export function setMouse(typ) {
  return { type: MOUSE, typ }
}