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
  render: (text, record) => <span className={getColor(record.status)}>{getStatus(record.status)}</span>
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
      runId: '', proId: '', author: '', language: '', status: '',
    };
    this.selector = Object.assign({}, this.selector, pushedState);
    this.state = {
      data: [],
      pagination: '',
      loading: true,
    }
    this.timer = setInterval(()=>{
      this.fetchData(1, this.selector);
    },8000);
  }
  componentDidMount() {
    this.fetchData(1, this.selector);
    
  }
  componentWillUnmount() {
    clearInterval(this.timer);//清除定时器
    this.setState = (state, callback) => {
      return;
    };
  }
  async fetchData(page, { author = '', status = '', runId = '-1', proId = '', language = '' }) {
    this.setState({ loading: true });
    let data = await fetchRealStatus(page, { runId, proId, author, language, status, })
    // console.log(data);
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
        <h1 style={{ textAlign: 'center', marginBottom: 2 }}>Realtime Status</h1>
        <p style={{ textAlign: 'center', marginBottom: 2 }}>You can refresh table by click search button</p>
        <p style={{ textAlign: 'center', marginBottom: 14 }}>Every 8 seconds it will refresh automatically</p>
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