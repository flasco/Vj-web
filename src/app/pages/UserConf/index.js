import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import { getUserInfo } from '../../services/user';

import NoPermission from '../../components/NoPermisson';
import LoadingPage from '../../components/LoadingPage';
import ConfForm from './components/ConfForm';

class UserConf extends React.Component {
  constructor(props) {
    super(props);
    this.accountName = props.match.params.accountName;
    this.fetchInfo(this.accountName);
    this.state = {
      data: {},
      isLoading: true,
    }
  }

  fetchInfo = async (accountName) => {
    const datx = await getUserInfo(accountName);
    this.setState({
      data: datx,
      isLoading: false,
    })
  }

  render() {
    const { isLogin } = this.props;
    const { isLoading, data } = this.state;
    if (isLogin) {
      if (isLoading) {
        return (<LoadingPage />);
      }
      return (
        <div>
          <Row >
            <Col span={14}><h1 style={{ textAlign: 'right', marginBottom: 24 }}>My Infomation</h1></Col>
            <Col span={10}><Link key="show" to={`../${this.accountName}`} style={{ lineHeight: '36px', marginLeft: 20 }}>Visitor Watch</Link></Col>
          </Row>
          <ConfForm data={data} accountName={this.accountName} />
        </div>
      );
    } else {
      return (
        <NoPermission />
      );
    }

  }
}

function select(state) {
  return {
    isLogin: state.user.isLogin,
  };
}

export default connect(select)(UserConf);