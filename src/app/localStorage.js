import { initState } from './reducers';

export function loadState() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    return initState;
  }
  return Object.assign({}, initState, { user })
}