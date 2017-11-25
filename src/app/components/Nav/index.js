import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import LoginWindow from './components/LoginWindow';
import UserBoard from './components/UserBoard';
import UserComp from './components/UserComp';

import header from '../../assert/header.jpg'

import './index.css';

const MenuItem = Menu.Item;
const { Header, Content, Footer } = Layout;

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

  userLogin = () => {
    this.props.setUsertype(true);
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
            <MenuItem key="ques"><Link to="/main/ques">题库</Link></MenuItem>
            <MenuItem key="contest"><Link to="/main/contest">比赛</Link></MenuItem>
            <MenuItem key="rank"><Link to="/main/rank">排名</Link></MenuItem>
            <MenuItem key="status"><Link to="/main/status">状态</Link></MenuItem>
            <MenuItem key="info"><Link to="/main/info">资讯</Link></MenuItem>
          </Menu>
          <div className={this.props.isLogin ? "Nav-head" : "Nav-head Nav-head-no-sign"} onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave}>
            <UserComp
              header={header}
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
            header={header}
            userQuit={this.userQuit}
            setMouse={this.props.setMouse}
            onMouseOut={this.onMouseLeave}
            onMouseOver={this.onMouseEnter}
            setUsertype={this.props.setUsertype}
            userBoardHover={this.props.userBoardHover} />
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