import { combineReducers } from 'redux'
import { MOUSE, USER_LOGIN, USER_LOGOUT, USER_BOARD, USER_UPDATE } from '../actions'

import { setItem, removeItem } from '../utils/localStorage';
import config from '../../config';

const mouseState = {
  userBoardHover: true,
}
const userState = {
  isLogin: false,
  id: '',
  accountName: '',
  icon: 'http://upload.besoo.com/file/201611/24/1915559745908.jpg',
  acCount: 0,
  failCount: 0,
  description: '',
  school: '',
  gender: '',
  password: '',
}

const userLoginBoardState = {
  isloginBoard: false,
  windowType: 1,
}

export const initState = {
  mouse: { ...mouseState },
  user: { ...userState },
  userLoginBoard: { ...userLoginBoardState }
}

function user(state = userState, action) {
  switch (action.type) {
    case USER_LOGIN:
      config.devMode || (action.info.icon = `${config.serverIp}${action.info.icon}`);
      setItem('@virtualJudge_user', action.info);//本地存储
      console.log(action.info)
      sessionStorage.setItem('isLoginCache', true);
      return Object.assign({}, state, { ...action.info });
    case USER_UPDATE:
      let st = Object.assign({}, state, { ...action.info });
      setItem('@virtualJudge_user', st);//本地存储
      return st;
    case USER_LOGOUT:
      removeItem('@virtualJudge_user');
      sessionStorage.setItem('isLoginCache', false);
      return Object.assign({}, state, { ...userState });
    default:
      return state;
  }
}

function userLoginBoard(state = userLoginBoardState, action) {
  switch (action.type) {
    case USER_BOARD:
      return Object.assign({}, state, { ...action.typ })
    default:
      return state
  }
}


function mouse(state = mouseState, action) {
  switch (action.type) {
    case MOUSE:
      {
        if (action.typ !== state.userBoardHover) {
          return Object.assign({}, state, { userBoardHover: action.typ });
        } else {
          return state;
        }
      }
    default:
      return state
  }
}


const reducers = combineReducers({
  mouse,
  user,
  userLoginBoard
})

export default reducers