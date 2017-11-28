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
    this.accountName = props.match.params.accountName;

    this.fetchInfo(this.accountName);
    this.state = {
      isMe: this.accountName === props.accountName,
      data: {},
      isLoading: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isMe: this.accountName === nextProps.accountName, })
  }

  fetchInfo = async (accountName) => {
    const datx = await getUserInfo(accountName);
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
            {isMe && <Link key="setting" to={`./${this.accountName}/setting`} style={{ lineHeight: '36px', marginLeft: 20 }}>Setting</Link>}
          </Col>
        </Row>
        <ShowForm data={data} />
      </div>
    );
  }
}

function select(state) {
  return {
    accountName: state.user.accountName,
  };
}

export default connect(select)(UserShow);