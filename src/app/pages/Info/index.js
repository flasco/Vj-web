import React from 'react';
import { connect } from 'react-redux';

import './index.css';

class Info extends React.Component{
  render(){
    return(
      <h1>这里是资讯界面</h1>
    );
  }
}

function select(state) {
  return {
    userBoardHover: state.mouse.userBoardHover,
    isLogin: state.user.isLogin,
    userLoginBoard:state.userLoginBoard
  };
}

export default connect(select)(Info);