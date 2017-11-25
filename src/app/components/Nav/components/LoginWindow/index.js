import React from 'react';
import { Modal, Tabs } from 'antd';

import LoginFormWapper from './components/Login';
import RegisterFormWapper from './components/Register';


class LoginWindow extends React.Component {
  constructor(props){
    super(props);
    this.state={

    };
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  closeLoginWindow = () => {
    this.props.isLogin || this.props.setUserLoginBoard({
      isloginBoard: false,
    });
  }

  loginSubmit(values){
    console.log(values);
    this.closeLoginWindow();
    this.props.userLogin();
  }
  registerSubmit(values){
    console.log(values);
    this.props.closeLoginWindow();
  }

  render() {
    return (
      <Modal
        width={300}
        visible={this.props.isloginBoard}
        onCancel={this.closeLoginWindow}
        footer={null}>
        <Tabs defaultActiveKey={`${this.props.windowType}`} animated={false} >
          <Tabs.TabPane tab="登录" key="1">
            <LoginFormWapper submit={this.loginSubmit}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册" key="2">
            <RegisterFormWapper submit={this.registerSubmit}/>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default LoginWindow;