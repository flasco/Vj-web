import React from 'react';
import { Table, Input, Select, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import { fetchQuesList } from '../../services/problem';

import './index.css';
const Option = Select.Option;
let selectOj = 'HDU';


class QuesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      proIdText: '',
      titleText: '',
    }
  }

  componentDidMount() {
    this.fetchL(selectOj, 1);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  fetchL = async (remoteOj, page, remoteProblemId = '', title = '') => {
    this.setState({ loading: true });
    const datax = await fetchQuesList(remoteOj, page, remoteProblemId, title);
    const pagination = { ...this.state.pagination };

    pagination.total = datax.totalCount;
    this.setState({
      loading: false,
      data: datax.results,
      pagination,
    });
  }

  searchQues = async () => {
    this.fetchL(selectOj, 1, this.state.proIdText, this.state.titleText);
  }

  handleTableChange = (pagination, filters) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchL(selectOj, pagination.current);
  }

  render() {
    console.log(this.state.data)
    const columns = [{
      title: (
        <Select defaultValue="HDU" style={{ width: '100%' }} size="small"
          onChange={(val) => { selectOj = val; this.searchQues() }}>
          <Option value="HDU">HDU</Option>
          <Option value="PKU">PKU</Option>
        </Select>
      ),
      width: '10%',
      key: 'remoteOj',
      dataIndex: 'remoteOj',
    }, {
      title: (<Tooltip placement="top" title="press Enter to search"><Input placeholder='Pro.Id' style={{ width: 60 }} size="small" onChange={(e) => this.setState({ proIdText: e.target.value })} onPressEnter={(e) => this.searchQues()} /></Tooltip>),
      key: 'remoteProblemId',
      width: '12%',
      dataIndex: 'remoteProblemId',
    }, {
      title: (<Tooltip placement="top" title="press Enter to search"><Input placeholder='Title' style={{ width: 260 }} size="small" onChange={(e) => this.setState({ titleText: e.target.value })} onPressEnter={(e) => this.searchQues()} /></Tooltip>),
      key: 'title',
      width: '64%',
      render: (text, record) => <span><Link style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }} to={`/main/ques/${record.remoteOj}/${record.remoteProblemId}`}>{record.title}</Link></span>,
    }, {
      title: 'remoteAddr',
      key: 'url',
      width: '34%',
      render: (text, record) => <a target='_blank' href={record.url}>Click me</a>
    }];
    return (
      <div>
        <p span={12} style={{ marginBottom: 12, fontSize: 16 }}>Question List</p>
        <Table
          className="ques-table"
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

export default QuesList;