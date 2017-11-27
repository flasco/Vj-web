import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

class UserBoard extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {

    };
  }

  userQuit = () => {
    this.props.userQuit();
    this.props.setMouse(true);
  }

  render() {
    const { header, accountName, userBoardHover, onMouseOut, onMouseOver } = this.props;
    return (
      <div className="userboard-container" style={{ visibility: userBoardHover ? 'hidden' : false }}
        onMouseOut={onMouseOut}>
        <div className="userboard-container-inner" onMouseOver={onMouseOver}
          style={{ visibility: userBoardHover ? 'hidden' : false }} >
          <img src={header} className="userboard-header" alt="flasco" />
          <div className="userboard-first-right" style={{ float: 'left', marginTop: 13, lineHeight: 'normal' }}>
            <span className="userboard-name">{accountName}</span>
            <div className="userboard-meta">
              <a>解题数 <b>147</b></a>
              <a>做题数 <b>458</b></a>
            </div>
          </div>
          <ul className="userboard-items">
            <li><Link key="report" to={`/user/note`}>解题报告</Link></li>
            <li><Link key="center" to={`/user/setting`}>个人中心</Link></li>
          </ul>
          <a className="userboard-quit" onClick={this.userQuit}>安全退出</a>
        </div>
      </div>

    );
  }
}

function select(state) {
  return {
    userBoardHover: state.mouse.userBoardHover,
    accountName: state.user.accountName,
  };
}


export default connect(select)(UserBoard);