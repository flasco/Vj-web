import React from 'react';
// import { Link } from 'react-router-dom';
import { Modal, Tabs, Form, Icon, Input, Button, Checkbox } from 'antd';

import LoginFormWapper from './components/Login';
import RegisterFormWapper from './components/Register';
import './index.css';



class LoginWindow extends React.Component {
  render() {
    return (
      <Modal
        width={300}
        visible={this.props.isloginBoard}
        onCancel={this.props.closeLoginWindow}
        footer={null}>
        <Tabs defaultActiveKey={`${this.props.windowType}`} animated={false}>
          <Tabs.TabPane tab="登录" key="1">
            <LoginFormWapper />
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册" key="2">
            <RegisterFormWapper />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default LoginWindow;