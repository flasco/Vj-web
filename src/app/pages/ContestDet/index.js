import React from 'react';
import { Table, Spin, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchContestDetList } from '../../services/contest';
import { getTime } from '../../utils/sleep';

import './index.css';

let cid;
const columns = [{
  title: 'Solved',
  width: '7%',
  key: 'solved',
  render: (rext, record) => record.solved && <Icon type="check" style={{ color: 'red' }} />
}, {
  title: 'Pro.Id',
  width: '7%',
  key: 'proId',
  render: (text, record, index) => <span>{index + 1}</span>
}, {
  title: 'Title',
  key: 'title',
  width: '42%',
  render: (text, record, index) => <span><Link to={{ pathname: `./${cid}/${index + 1}`, state: { oj: record.remoteOj, qid: record.remoteProblemId } }}>{record.title}</Link></span>
}, {
  title: 'Ratio',
  key: 'ratio',
  width: '20%',
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
    let d = await fetchContestDetList(cid);
    this.setState({ data: d, loading: false })
  }


  render() {
    const { data } = this.state;
    const { userId } = this.props;
    if (!this.state.loading) {
      return (
        <div style={{ marginBottom: 12,fontSize: '10pt' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h1 style={{ display: 'inline', marginRight: 12 }}>{data.title}</h1>{userId === data.userId && <Link to={{ pathname: './add', state: { cid } }} style={{ fontSize: '12pt' }} >Edit</Link>}<br />
            <span style={{ marginRight: 12 }}>Start Time : {getTime(new Date(data.startTime))} </span>   <span>End Time : {getTime(new Date(data.startTime + data.duration))}</span><br />
            <span style={{ marginRight: 12 }}>Contest Type : {data.contestType === 0 ? 'Public' : 'Private'}</span> <span>Contest Status : {data.status}</span><br />
            <span>Current Server Time : {data.currentTime}</span>
          </div>
          <Table
            className="contestDet-table"
            columns={columns}
            dataSource={this.state.data.containProblems}
            rowKey={(record, index) => index}
            pagination={false}
            onChange={this.handleTableChange} />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link style={{ fontSize: '11pt' }} to={`./${cid}/rank`}>Rank</Link>
          </div>
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

function select(state) {
  return {
    userId: state.user.id,
  };
}

export default connect(select)(ContestDet);