import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav';
import Routes from './Routes';

import { setMouse, setUsertype, setUserLoginBoard } from './actions'

class App extends React.Component {
  render() {
    const { dispatch, userBoardHover, isLogin, userLoginBoard } = this.props
    return (
      <Router>
        <Nav
          isLogin={isLogin}
          userBoardHover={userBoardHover}
          userLoginBoard={userLoginBoard}
          setUserLoginBoard={type => dispatch(setUserLoginBoard(type))}
          setMouse={type => dispatch(setMouse(type))}
          setUsertype={type => dispatch(setUsertype(type))}>
          {Routes}
        </Nav>
      </Router>
    );
  }
}

function select(state) {
  return {
    userBoardHover: state.mouse.userBoardHover,
    isLogin: state.user.isLogin,
    userLoginBoard: state.userLoginBoard
  };
}

export default connect(select)(App);