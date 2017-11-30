import { initState } from '../reducers';
import { cipher, decipher } from './crypto';



export function loadState() {
  let user = getItem('@virtualJudge_user');
  if (user === null) {
    return initState;
  }
  return Object.assign({}, initState, { user })
}

export async function setItem(key, value) {
  let str = JSON.stringify(value);
  localStorage.setItem(key, await cipher('aes-256-cbc', '1314520', str));
}

export async function getItem(key) {
  let str = localStorage.getItem(key);
  if (str !== null) {
    let obj = JSON.parse(await decipher('aes-256-cbc', '1314520', str));
    return obj;
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}