import React from 'react';
import { Modal, Tabs, message } from 'antd';

import LoginFormWapper from './components/Login';
import RegisterFormWapper from './components/Register';

import { userLoginCheck, userRegisterCheck } from '../../../../services/user';


class LoginWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  closeLoginWindow = () => {
    this.props.isLogin || this.props.setUserLoginBoard({
      isloginBoard: false,
    });
  }
  setError = (type) => {
    this.setState({
      isError: type,
    })
  }

  async loginSubmit(values) {
    let res = await userLoginCheck(values);
    if (res.flag) {
      this.closeLoginWindow();
      this.props.userLogin(res.res);
    } else {
      this.setError(true);
      message.error('Login Error.');
    }
  }

  async registerSubmit(values) {
    let flag = await userRegisterCheck(values);
    if (flag) {
      this.closeLoginWindow();
      message.success('Register Success!');
      this.props.userLogin({
        userName:values.userName,
        password:values.password,
      });//直接登录账号。
    } else {
      this.setError(true);
      message.error('Register Error, please change your userName');
    }
  }

  render() {
    return (
      <Modal
        width={300}
        visible={this.props.isloginBoard}
        onCancel={this.closeLoginWindow}
        footer={null}>
        <Tabs defaultActiveKey={`${this.props.windowType}`} animated={false} >
          <Tabs.TabPane tab="Login" key="1">
            <LoginFormWapper submit={this.loginSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <RegisterFormWapper submit={this.registerSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default LoginWindow;