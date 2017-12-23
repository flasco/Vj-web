import React from 'react';
import { Table } from 'antd';
// import { Link } from 'react-router-dom';

import { fetchRealStatus } from '../../services'
import { getTime } from '../../utils/sleep';

import SelectForm from './components/SelectForm';
import './index.css';

function getColor(text) {
  if (text === 'AC') {
    return "realStatus-acColor";
  } else if (text === 'PE') {
    return "realStatus-PresError";
  } else if (text === 'CE') {
    return "realStatus-CompError";
  } else {
    return "realStatus-waColor";
  }
}

function getStatus(text) {
  if (text === 'AC') return 'Accepted'
  else if (text === 'WA') return 'Wrong Answer'
  else if (text === 'PE') return 'Presentation Error'
  else if (text === 'CE') return 'Compilation Error'
  else if (text === 'RE') return 'Runtime Error'
  else if (text === 'TLE') return 'Time Limit Exceeded'
  else if (text === 'MLE') return 'Memory Limit Exceeded'
  else if (text === 'OLE') return 'Output Limit Exceeded'
  else if (text === 'PENDING') return 'Pending'
  else if (text === 'SUBMIT_FAILED') return 'Submit Failed'
  else return text;
}

class RealSuatus extends React.Component {
  constructor(props) {
    super(props);
    let pushedState = this.props.location.state;
    this.selector = {
      runId: '', proId: '', oj: '', author: '', language: '', status: '', cid: '-1', id: '',
    };
    this.selector = Object.assign({}, this.selector, pushedState);
    this.state = {
      data: [],
      pagination: '',
      loading: true,
    }
    this.type = this.props.type !== undefined ? this.props.type : 1;
    if (this.type === 1) {
      this.columns = [{
        title: 'Run Id',
        key: 'id',
        width: '7%',
        dataIndex: 'id',
      }, {
        title: 'Sub.Time',
        key: 'submitTime',
        width: '11%',
        render: (text, record) => <span>{getTime(new Date(record.submitTime))}</span>
      }, {
        title: 'Status',
        key: 'status',
        width: '12%',
        render: (text, record) => <span className={getColor(record.status)}>{getStatus(record.status)}</span>
      }, {
        title: 'OJ-Id',
        key: 'OJ-Id',
        width: '8%',
        render: (text, record) => <span>{`${record.remoteOj}-${record.remoteProblemId}`}</span>
      }, {
        title: 'Exe.Time',
        key: 'executionTime',
        width: '6%',
        dataIndex: 'executionTime',
      }, {
        title: 'Exe.Mem',
        key: 'executionMemory',
        width: '6%',
        dataIndex: 'executionMemory',
      }, {
        title: 'Code Len.',
        key: 'codeLen',
        width: '6%',
        dataIndex: 'codeLen',
      }, {
        title: 'Language',
        key: 'language',
        width: '6%',
        dataIndex: 'language',
      }, {
        title: 'Author',
        key: 'accountName',
        width: '7%',
        dataIndex: 'accountName',
      }];
    } else {
      this.columns = [{
        title: 'Run Id',
        key: 'id',
        width: '7%',
        dataIndex: 'id',
      }, {
        title: 'Author',
        key: 'accountName',
        width: '7%',
        dataIndex: 'accountName',
      }, {
        title: 'Sub.Time',
        key: 'submitTime',
        width: '7%',
        render: (text, record) => <span>{getTime(new Date(record.submitTime))}</span>
      }, {
        title: 'Status',
        key: 'status',
        width: '12%',
        render: (text, record) => <span className={getColor(record.status)}>{getStatus(record.status)}</span>
      }, {
        title: 'Id',
        key: 'pid',
        width: '7%',
        render: (text, record) => <span>{`${record.remoteOj}-${record.remoteProblemId}`}</span>
      }, {
        title: 'Exe.Time',
        key: 'executionTime',
        width: '6%',
        dataIndex: 'executionTime',
      }, {
        title: 'Exe.Mem',
        key: 'executionMemory',
        width: '6%',
        dataIndex: 'executionMemory',
      }, {
        title: 'Code Len.',
        key: 'codeLen',
        width: '6%',
        dataIndex: 'codeLen',
      }, {
        title: 'Language',
        key: 'language',
        width: '6%',
        dataIndex: 'language',
      }];
    }
    this.timer = setInterval(() => {
      this.fetchData(1, this.selector);
      // console.log('action...')
    }, 8000);
  }
  componentDidMount() {
    this.fetchData(1, this.selector);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentKey === '4') {
      this.fetchData(1, this.selector);
      this.timer = setInterval(() => {
        this.fetchData(1, this.selector);
      }, 8000)
    } else {
      this.timer && clearInterval(this.timer);
    }
    return true;
  }
  componentWillUnmount() {
    clearInterval(this.timer);//清除定时器
    this.setState = (state, callback) => {
      return;
    };
  }
  async fetchData(page, { author = '', status = '', runId = '-1', proId = '', oj = '', language = '', cid = '-1' }) {
    this.setState({ loading: true });
    let data = await fetchRealStatus(page, { runId, proId, author, language, oj, status, cid })
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
        {this.type === 1 && <div>
          <h1 style={{ textAlign: 'center', marginBottom: 2 }}>Realtime Status</h1>
          <p style={{ textAlign: 'center', marginBottom: 2 }}>You can refresh table by click search button</p>
        </div>}
        <p style={{ textAlign: 'center', marginBottom: 14 }}>Every 8 seconds it will refresh automatically</p>
        <SelectForm search={this.search} selector={this.selector} type={this.props.type} />
        <Table
          size="middle"
          className="realStatus-table"
          columns={this.columns}
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