import React from 'react';
import { Table, Input, Select } from 'antd';
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
      sortedInfo: {
        order: '',
        columnKey: '',
        proIdText: '',
        titleText: '',
      }
    }
    this.fetchL = this.fetchL.bind(this);
  }

  componentDidMount() {
    this.fetchL(selectOj, 1, {});
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  async fetchL(selectOj, page, sorter) {
    this.setState({ loading: true });
    const datax = await fetchQuesList(selectOj, page, sorter);
    const pagination = { ...this.state.pagination };
    pagination.total = datax.totalCount || pagination.total;
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
      sortedInfo: sorter,
    });
    this.fetchL(selectOj, pagination.current, {
      sortKey: sorter.columnKey,
      sortOrder: sorter.order
    });
  }

  render() {
    let { sortedInfo } = this.state;
    const columns = [{
      title: (
        <Select defaultValue="HDU" style={{ width: 70 }} size="small"
          onChange={(val) => selectOj = val}>
          <Option value="HDU">HDU</Option>
          <Option value="PKU">PKU</Option>
        </Select>
      ),
      key: 'remoteOJ',
      dataIndex: 'remoteOJ',
    }, {
      title: (<Input placeholder='Pro.Id' style={{ width: 70 }} size="small" onChange={(e) => this.setState({ proIdText: e.target.value })} onPressEnter={(e) => console.log(this.state.proIdText)} />),
      key: 'remoteProblemId',
      dataIndex: 'remoteProblemId',
      sorter: (a, b) => a.remoteProblemId - b.remoteProblemId,
      sortOrder: sortedInfo.columnKey === 'remoteProblemId' && sortedInfo.order,
    }, {
      title: (<Input placeholder='Title' style={{ width: 260 }} size="small" onChange={(e) => this.setState({ titleText: e.target.value })} onPressEnter={(e) => console.log(this.state.titleText)} />),
      key: 'title',
      render: (text, record) => <span><Link to={`./ques/${record.remoteProblemId}`}>{record.title}</Link></span>,
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
    }, {
      title: 'Ratio',
      key: 'ratio',
      dataIndex: 'ratio',
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