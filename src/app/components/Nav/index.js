import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import LoginWindow from './components/LoginWindow';
import UserBoard from './components/UserBoard';
import UserComp from './components/UserComp';

import './index.css';

const MenuItem = Menu.Item;
const { Header, Content, Footer } = Layout;
const header = 'http://upload.besoo.com/file/201611/24/1915559745908.jpg'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: [props.location.pathname.slice(1)],
    }
  }

  onMouseEnter = () => {
    this.props.isLogin && this.props.setMouse(false);
  }

  onMouseLeave = () => {
    this.props.isLogin && this.props.setMouse(true);
  }

  userLogin = (info) => {
    this.props.userLogin({
      ...info,
      isLogin: true,
    });
  }
  userLogout = () => {
    this.props.userLogout();
  }

  render() {
    let key = window.location.pathname.split('/')[2] || '';
    return (
      <Layout className="layout">
        <Header>
          <div className="Nav-logo"><span>Virtual Judge</span></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={this.state.selectedKeys}
            selectedKeys={[key]}
            style={{ lineHeight: '64px', float: 'left' }}>
            <MenuItem key="ques"><Link to="/main/ques">Problem</Link></MenuItem>
            <MenuItem key="contest"><Link to="/main/contest">Contest</Link></MenuItem>
            <MenuItem key="rank"><Link to="/main/rank">Rank</Link></MenuItem>
            <MenuItem key="status"><Link to="/main/status">Status</Link></MenuItem>
            <MenuItem key="info"><Link to="/main/info">Info</Link></MenuItem>
          </Menu>
          <div className={this.props.isLogin ? "Nav-head" : "Nav-head Nav-head-no-sign"} onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave}>
            <UserComp
              header={this.props.header || header}
              isLogin={this.props.isLogin}
              setUserLoginBoard={this.props.setUserLoginBoard}
              onMouseEnter={this.onMouseEnter} />
          </div>
          {this.props.userLoginBoard.isloginBoard && <LoginWindow
            userLogin={this.userLogin}
            isloginBoard={this.props.userLoginBoard.isloginBoard}
            isLogin={this.props.isLogin}
            setUserLoginBoard={this.props.setUserLoginBoard}
            windowType={this.props.userLoginBoard.windowType} />}
          <UserBoard
            header={this.props.header || header}
            userQuit={this.userLogout}
            setMouse={this.props.setMouse}
            onMouseOut={this.onMouseLeave}
            onMouseOver={this.onMouseEnter} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', marginTop: 32, padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2017 Created by flasco
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(Nav);