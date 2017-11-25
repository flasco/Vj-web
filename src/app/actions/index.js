export const MOUSE =  'MOUSE';

export const USER_LOGIN = 'USER_LOGIN';

export const USER_BOARD = 'USER_BOARD';

export function setUsertype(typ) {
  return { type: USER_LOGIN,typ }
}

export function setUserLoginBoard(typ) {
  return { type: USER_BOARD,typ }
}

export function setMouse(typ) {
  return { type: MOUSE,typ }
}