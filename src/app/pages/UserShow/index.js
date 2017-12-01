import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserInfo } from '../../services/user';

import ShowForm from './components/ShowForm'
import LoadingPage from '../../components/LoadingPage';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.uid = props.match.params.uid;

    this.fetchInfo(this.uid);
    this.state = {
      isMe: this.uid === `${props.uid}`,
      data: {},
      isLoading: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isMe: this.uid === `${nextProps.uid}`, })
  }

  fetchInfo = async (uid) => {
    const datx = await getUserInfo(uid);
    this.setState({
      data: datx,
      isLoading: false,
    })
  }

  render() {
    const { isMe, isLoading, data } = this.state;
    if (isLoading) {
      return (<LoadingPage />);
    }
    return (
      <div>
        <Row >
          <Col span={14}><h1 style={{ textAlign: 'right', marginBottom: 24 }}>Persional Infomation</h1></Col>
          <Col span={10}>
            {isMe && <Link key="setting" to={`./${this.uid}/setting`} style={{ lineHeight: '36px', marginLeft: 20 }}>Setting</Link>}
          </Col>
        </Row>
        <ShowForm data={data} />
      </div>
    );
  }
}

function select(state) {
  return {
    uid: state.user.id,
  };
}

export default connect(select)(UserShow);