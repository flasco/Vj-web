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
    if (this.props.isLogin) {
      return (
        <Avatar icon="user"
          className="Nav-Ava"
          size="large"
          src={this.props.header}
          onMouseOver={this.props.onMouseEnter} />
      );
    } else {
      return (
        <div>
          <a onClick={this.openLoginWindow.bind(this, 1)}>登录</a>
          <a onClick={this.openLoginWindow.bind(this, 2)}>注册</a>
        </div>
      );
    }

  }
}

export default UserComp;