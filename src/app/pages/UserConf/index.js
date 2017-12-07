import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import { getUserInfo, submitUserInfo } from '../../services/user';

import NoPermission from '../../components/NoPermisson';
import LoadingPage from '../../components/LoadingPage';
import ConfForm from './components/ConfForm';

class UserConf extends React.Component {
  constructor(props) {
    super(props);
    this.uid = props.match.params.uid;
    this.permission = `${this.uid}` === `${props.uid}`;
    this.permission && this.fetchInfo(this.uid);
    this.state = {
      data: {},
      isLoading: this.permission,
    }
  }

  fetchInfo = async (uid) => {
    const datx = await getUserInfo(uid);
    this.setState({
      data: datx,
      isLoading: false,
    })
  }

  submitInfo = async (values) => {
    await submitUserInfo(values);
  }

  render() {
    const { isLoading, data } = this.state;
    if (isLoading) {
      return (<LoadingPage />);
    }
    if (!this.permission) {
      return <NoPermission history={this.props.history} />
    }
    return (
      <div>
        <Row>
          <Col span={14}><h1 style={{ textAlign: 'right', marginBottom: 24 }}>My Infomation</h1></Col>
          <Col span={10}><Link key="show" to={`../${this.uid}`} style={{ lineHeight: '36px', marginLeft: 20 }}>Visitor Watch</Link></Col>
        </Row>
        <ConfForm data={data} submit={this.submitInfo} />
      </div>
    );

  }
}

function select(state) {
  return {
    uid: state.user.id
  };
}

export default connect(select)(UserConf);