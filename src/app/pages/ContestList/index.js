import React from 'react';
import { Row, Col,Table } from 'antd';
import { Link } from 'react-router-dom';

import { fetchContestList } from '../../services';

import './index.css';

const columns = [{
  title: 'Id',
  key: 'contestId',
  dataIndex: 'contestId',
},{
  title: 'Contest Name',
  key: 'contestName',
  render: (text, record) => <span><Link to={`./contest/${record.contestId}`}>{record.contestName}</Link></span>
}, {
  title: 'Start Time (GMT+8)',
  key: 'startTime',
  dataIndex: 'startTime',
}, {
  title: 'Type',
  key: 'contestType',
  render: (text, record) => <span style={{color:record.contestType.indexOf('lic')!== -1?'red':'green'}}>{record.contestType}</span>
}, {
  title: 'Status',
  key: 'contestStatus',
  render: (text, record) => <span style={{color:record.contestStatus.indexOf('Pend')!== -1?'green':'#808080'}}>{record.contestStatus}</span>
}];

class ContestList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
    this.fetchL = this.fetchL.bind(this);
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

  async fetchL(page) {
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
  render(){
    return(
      <div>
      <Row style={{marginBottom:8}}>
        <Col span={12} style={{ fontSize: 16 }}>Contest List</Col>
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

export default ContestList;