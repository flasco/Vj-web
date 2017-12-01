import React from 'react';
import { Table } from 'antd';
// import { Link } from 'react-router-dom';

import { fetchRealStatus } from '../../services'
import { getTime } from '../../utils/sleep';

import SelectForm from './components/SelectForm';
import './index.css';

function getColor(text) {
  if (text.indexOf('Accept') !== -1) {
    return "realStatus-acColor";
  } else if (text.indexOf('Pres') !== -1) {
    return "realStatus-PresError";
  } else if (text.indexOf('Comp') !== -1) {
    return "realStatus-CompError";
  } else {
    return "realStatus-waColor";
  }
}

const columns = [{
  title: 'Run Id',
  key: 'id',
  dataIndex: 'id',
}, {
  title: 'Sub.Time',
  key: 'submitTime',
  render: (text, record) => <span>{getTime(new Date(record.submitTime))}</span>
}, {
  title: 'Status',
  key: 'status',
  render: (text, record) => <span className={getColor(record.status)}>{record.status}</span>
}, {
  title: 'OJ-Id',
  key: 'OJ-Id',
  render: (text, record) => <span>{`${record.remoteOj}-${record.remoteProblemId}`}</span>
}, {
  title: 'Exe.Time',
  key: 'executionTime',
  dataIndex: 'executionTime',
}, {
  title: 'Exe.Mem',
  key: 'executionMemory',
  dataIndex: 'executionMemory',
}, {
  title: 'Code Len.',
  key: 'codeLen',
  dataIndex: 'codeLen',
}, {
  title: 'Language',
  key: 'language',
  dataIndex: 'language',
}, {
  title: 'Author',
  key: 'accountName',
  dataIndex: 'accountName',
}];

class RealSuatus extends React.Component {
  constructor(props) {
    super(props);
    let pushedState = this.props.location.state;
    this.selector = {
      runId: '-1', proId: '', author: '', language: '', status: '',
    };
    this.selector = Object.assign({}, this.selector, pushedState);
    this.state = {
      data: [],
      pagination: '',
      loading: true,
    }
  }
  componentDidMount() {
    this.fetchData(1, this.selector);
  }
  async fetchData(page, { author = '', status = '', runId = '-1', proId = '', language = '' }) {
    this.setState({ loading: true });
    let data = await fetchRealStatus(page, { runId, proId, author, language, status, })
    console.log(data);
    const pagination = { ...this.state.pagination };
    pagination.total = data.totalCount;
    this.setState({
      loading: false,
      data: data.results,
      pagination,
    })
  }
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchData(pagination.current, this.selector);
  }
  search = (values) => {
    this.selector = Object.assign({}, this.selector, values)
    this.fetchData(1, this.selector);
  }
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: 14 }}>Realtime Status</h1>
        <SelectForm search={this.search} selector={this.selector} />
        <Table
          size="middle"
          className="realStatus-table"
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

export default RealSuatus;