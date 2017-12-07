import React from 'react';
import { Avatar } from 'antd';
class UserComp extends React.Component {

  openLoginWindow = (type) => { // type = 1 打开登录界面， type = 2 打开注册界面。
    this.props.isLogin || this.props.setUserLoginBoard({
      isloginBoard: true,
      windowType: type
    });
  }

  render() {
    // console.log(this.props.icon)
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
          <a onClick={this.openLoginWindow.bind(this, 1)}>Login</a>
          <a onClick={this.openLoginWindow.bind(this, 2)}>Register</a>
        </div>
      );
    }

  }
}

export default UserComp;