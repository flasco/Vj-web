import { initState } from './reducers';

export function loadState() {
  let user = localStorage.getItem('@virtualJudge_user');
  if (user === null) {
    return initState;
  }
  return Object.assign({}, initState, { user })
}