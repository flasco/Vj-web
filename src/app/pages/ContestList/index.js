import React from 'react';
import { Row, Col, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchContestList } from '../../services/contest';

import './index.css';

function getFormatTime(text) {
  let date = new Date(text);
  let front = date.toLocaleDateString('zh');
  let back = date.toTimeString().substring(0, 8);
  return `${front} ${back}`;
}

function getStatusColor(text) {
  if (text.indexOf('Pend') !== -1) {
    return 'green';
  } else if (text.indexOf('Run') !== -1) {
    return 'red';
  } else if (text.indexOf('End') !== -1) {
    return '#808080';
  }
}

const columns = [{
  title: 'Id',
  key: 'id',
  width: '5%',
  dataIndex: 'id',
}, {
  title: 'Contest Name',
  key: 'title',
  width: '38%',
  render: (text, record) => <span><Link to={`./contest/${record.id}`}>{record.title}</Link></span>
}, {
  title: 'Start Time (GMT+8)',
  key: 'startTime',
  width: '12%',
  render: (text, record) => <span>{getFormatTime(record.startTime)}</span>
}, {
  title: 'Type',
  key: 'contestType',
  width: '5%',
  render: (text, record) => <span style={{ color: record.contestType === 0 ? 'red' : 'green' }}>{record.contestType === 0 ? 'public' : 'private'}</span>
}, {
  title: 'Status',
  key: 'status',
  width: '7%',
  render: (text, record) => <span style={{ color: getStatusColor(record.status) }}>{record.status}</span>
}];

class ContestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
  }

  componentDidMount() {
    this.fetchL(1);
  }

  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return;
    };
  }

  fetchL = async (page) => {
    this.setState({ loading: true });
    const datax = await fetchContestList(page);
    const pagination = { ...this.state.pagination };
    pagination.total = datax.totalCount;
    this.setState({
      loading: false,
      data: datax.results,
      pagination,
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchL(pagination.current);
  }

  contestAdd = () =>{
    this.props.history.push('./contest/add')
  }
  render() {
    return (
      <div>
        <Row style={{ marginBottom: 8 }}>
          <Col span={12} style={{ fontSize: 16 }}>Contest List</Col>
          <Col span={12} style={{ fontSize: 16 }}>
            {this.props.isLogin && <Button type="primary" style={{ float: 'right' }} onClick={this.contestAdd}>Create</Button>}
          </Col>
        </Row>
        <Table
          className="contestList-table"
          columns={columns}
          dataSource={this.state.data}
          rowKey={(record, index) => index}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} />
      </div>
    );
  }
}

function select(state) {
  return {
    isLogin: state.user.isLogin
  }
}

export default connect(select)(ContestList);