import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import LoginWindow from './components/LoginWindow';
import UserBoard from './components/UserBoard';
import UserComp from './components/UserComp';

import './index.css';

const MenuItem = Menu.Item;
const { Header, Content, Footer } = Layout;
const defaultHeader = 'http://upload.besoo.com/file/201611/24/1915559745908.jpg';

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
    const { children, isLogin, header, userLoginBoard, setUserLoginBoard, setMouse } = this.props;
    return (
      <Layout className="layout">
        <Header style={{padding:'0 22px'}}>
          <div style={{ margin: '0 auto', maxWidth: 980,minWidth:980 }}>
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
            <div className={isLogin ? "Nav-head" : "Nav-head Nav-head-no-sign"} onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave}>
              <UserComp
                header={header || defaultHeader}
                isLogin={isLogin}
                setUserLoginBoard={setUserLoginBoard}
                onMouseEnter={this.onMouseEnter} />
            </div>
            {userLoginBoard.isloginBoard && <LoginWindow
              userLogin={this.userLogin}
              isloginBoard={userLoginBoard.isloginBoard}
              isLogin={isLogin}
              setUserLoginBoard={setUserLoginBoard}
              windowType={userLoginBoard.windowType} />}
            <UserBoard
              header={header || defaultHeader}
              userQuit={this.userLogout}
              setMouse={setMouse}
              onMouseOut={this.onMouseLeave}
              onMouseOver={this.onMouseEnter} />
          </div>
        </Header>
        <Content style={{ margin: '0 auto', maxWidth: 980,minWidth:980 }}>
          <div style={{ background: '#fff', margin: 0, marginTop: 32, padding: 24, minHeight: 280,width:'100%' }}>
            {children}
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