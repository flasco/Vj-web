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
    this.fetchL = this.fetchL.bind(this);
  }

  componentDidMount() {
    this.fetchL(selectOj, 1);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  async fetchL(remoteOj, page, remoteProblemId = '', title = '') {
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
    const columns = [{
      title: (
        <Select defaultValue="HDU" style={{ width: 60 }} size="small"
          onChange={(val) => { selectOj = val; this.searchQues() }}>
          <Option value="HDU">HDU</Option>
          <Option value="PKU">PKU</Option>
        </Select>
      ),
      width:'7%',
      key: 'remoteOj',
      dataIndex: 'remoteOj',
    }, {
      title: (<Tooltip placement="top" title="press Enter to search"><Input placeholder='Pro.Id' style={{ width: 60 }} size="small" onChange={(e) => this.setState({ proIdText: e.target.value })} onPressEnter={(e) => this.searchQues()} /></Tooltip>),
      key: 'remoteProblemId',
      width:'12%',
      dataIndex: 'remoteProblemId',
    }, {
      title: (<Tooltip placement="top" title="press Enter to search"><Input placeholder='Title' style={{ width: 260 }} size="small" onChange={(e) => this.setState({ titleText: e.target.value })} onPressEnter={(e) => this.searchQues()} /></Tooltip>),
      key: 'title',
      width:'68%',
      render: (text, record) => <span><Link to={`/main/ques/${record.remoteOj}/${record.remoteProblemId}`}>{record.title}</Link></span>,
    }, {
      title: 'remoteAddr',
      key: 'url',
      width:'32%',
      render: (text, record) => <Link target='_blank' to={record.url}>Click me</Link>
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