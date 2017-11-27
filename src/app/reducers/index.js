import { combineReducers } from 'redux'
import { MOUSE, USER_LOGIN, USER_LOGOUT, USER_BOARD } from '../actions'

const mouseState = {
  userBoardHover: true,
}
const userState = {
  isLogin: false,
  userName: '',
  password: '',
  header: '',
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
      localStorage.setItem('user', JSON.stringify(action.info));//本地存储
      return Object.assign({}, state, { ...action.info });
    case USER_LOGOUT:
      localStorage.clear();
      return Object.assign({}, state, { isLogin: false, userName: '' });
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