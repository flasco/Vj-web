import React from 'react';
import { connect } from 'react-redux'
import { Avatar } from 'antd';
class UserComp extends React.Component {

  openLoginWindow = (type) => { // type = 1 打开登录界面， type = 2 打开注册界面。
    this.props.isLogin || this.props.setUserLoginBoard({
      isloginBoard: true,
      windowType: type
    });
  }

  render() {
    if (this.props.isLogin) {
      return (
        <Avatar icon="user"
          className="Nav-Ava"
          size="large"
          src={this.props.icon} />
      );
    } else {
      return (
        <div>
          <a onClick={() => { this.openLoginWindow(1) }}>Login</a>
          <a onClick={() => { this.openLoginWindow(2) }}>Register</a>
        </div>
      );
    }

  }
}

function select(state) {
  return {
    icon: state.user.icon,
  }
}

export default connect(select)(UserComp);