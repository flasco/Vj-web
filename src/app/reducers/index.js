import { combineReducers } from 'redux'
import { MOUSE, USER_LOGIN, USER_BOARD } from '../actions'

const mouseState = {
  userBoardHover: true,
}
const userState = {
  isLogin: false,
}
const userLoginBoardState = {
  isloginBoard: false,
  windowType: 1,
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

function user(state = userState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, { isLogin: action.typ })
    default:
      return state
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

const reducers = combineReducers({
  mouse,
  user,
  userLoginBoard
})

export default reducers