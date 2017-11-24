import React from 'react';
import {  Table, Spin, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { fetchContestDetList } from '../../services/contest';

import './index.css';

let cid;
const columns = [{
  title: 'Solved',
  key: 'solved',
  render: (rext, record) => record.solved && <Icon type="check" style={{color:'red'}}/>
}, {
  title: 'Pro.Id',
  key: 'remoteProblemId',
  dataIndex: 'remoteProblemId',
}, {
  title: 'Title',
  key: 'title',
  render: (text, record) => <span><Link to={`./${cid}/${record.remoteProblemId}`}>{record.title}</Link></span>
}, {
  title: 'Ratio',
  key: 'ratio',
  dataIndex: 'ratio',
}];

class ContestDet extends React.Component {
  constructor(props) {
    super(props);
    cid = props.match.params.cid;
    this.state = {
      data: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let d = await fetchContestDetList(this.cid);
    this.setState({ data: d, loading: false })
  }


  render() {
    if (!this.state.loading) {
      return (
        <div style={{ marginBottom: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h1>2017中国大学生程序设计竞赛-哈尔滨站-重现赛（感谢哈理工）</h1>
            <span>Start Time : 2017-11-11 12:00:00    End Time : 2017-11-11 17:00:00</span><br />
            <span>Contest Type : Public   Contest Status : Ended</span><br /><br />
            <span>Current Server Time : 2017-11-23 16:43:23</span>
          </div>

          <Table
            className="contestDet-table"
            columns={columns}
            dataSource={this.state.data}
            rowKey={(record, index) => index}
            pagination={false}
            onChange={this.handleTableChange} />
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Spin size="large" />
        </div>
      );
    }
  }
}

export default ContestDet;