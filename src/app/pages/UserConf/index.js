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
    this.fetchInfo(this.uid);
    this.state = {
      data: {},
      isLoading: true,
    }
  }

  fetchInfo = async (uid) => {
    console.log(uid)
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
    const { uid } = this.props;
    const { isLoading, data } = this.state;
    // console.log(data.id);
    if (isLoading) {
      return (<LoadingPage />);
    }
    if (data.id === uid) {
      return (
        <div>
          <Row>
            <Col span={14}><h1 style={{ textAlign: 'right', marginBottom: 24 }}>My Infomation</h1></Col>
            <Col span={10}><Link key="show" to={`../${this.uid}`} style={{ lineHeight: '36px', marginLeft: 20 }}>Visitor Watch</Link></Col>
          </Row>
          <ConfForm data={data} submit={this.submitInfo} />
        </div>
      );
    } else {
      return (
        <NoPermission history={this.props.history} />
      );
    }
  }
}

function select(state) {
  return {
    uid: state.user.id
  };
}

export default connect(select)(UserConf);