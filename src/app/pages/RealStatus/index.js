import React from 'react';
import { Table } from 'antd';
// import { Link } from 'react-router-dom';

import { fetchRealStatus } from '../../services'

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
  key: 'runId',
  dataIndex: 'runId',
}, {
  title: 'Sub.Time',
  key: 'submitTime',
  dataIndex: 'submitTime',
}, {
  title: 'Status',
  key: 'judgeStatus',
  render: (text, record) => <span className={getColor(record.judgeStatus)}>{record.judgeStatus}</span>
}, {
  title: 'OJ-Id',
  key: 'OJ-Id',
  render: (text, record) => <span>{`${record.remoteOj}-${record.remoteProblemId}`}</span>
}, {
  title: 'Exe.Time',
  key: 'exeTime',
  dataIndex: 'exeTime',
}, {
  title: 'Exe.Mem',
  key: 'exeMemory',
  dataIndex: 'exeMemory',
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
  key: 'author',
  dataIndex: 'author',
}];

class RealSuatus extends React.Component {
  constructor(props) {
    super(props);
    let pushedState = this.props.location.state;
    this.selector = {
      runId: '', proId: '', author: '', language: '0', status: '0',
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
  async fetchData(page, { author = '', status = '', runId = '', proId = '', language = '' }) {
    this.setState({ loading: true });
    let data = await fetchRealStatus(runId, proId, author, language, status, page)
    const pagination = { ...this.state.pagination };
    this.setState({
      loading: false,
      data: data,
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