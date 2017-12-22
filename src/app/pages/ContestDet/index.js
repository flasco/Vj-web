import React from 'react';
import { Table, Spin, Icon, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import QuesDet from '../QuesDet';
import QuesSubmit from '../QueSubmit';
import ContestRank from '../ContestRank';
import RealStatus from '../RealStatus';

import { fetchContestDetList } from '../../services/contest';
import NoPermission from '../../components/NoPermisson';
import { getTime } from '../../utils/sleep';

import './index.css';

let cid, oj = '', qid = '', pwd = '', id = '';//id 是指在本题在本次比赛中的id

class ContestDet extends React.Component {
  constructor(props) {
    super(props);
    cid = props.match.params.cid;
    if (props.location.state !== undefined) {
      pwd = props.location.state.pwd;
    }
    this.state = {
      data: '',
      loading: true,
      isFailed: false,
      currentKey: '1',
    };
    this.columns = [{
      title: 'Solved',
      width: '7%',
      key: 'solved',
      render: (rext, record) => record.solved && <Icon type="check" style={{ color: 'red' }} />
    }, {
      title: 'Pro.Id',
      width: '7%',
      key: 'proId',
      render: (text, record, index) => <span>{String.fromCharCode(65 + index)}</span>
    }, {
      title: 'Title',
      key: 'title',
      width: '42%',
      render: (text, record, index) => <span><a onClick={() => { oj = record.remoteOj; qid = record.remoteProblemId; id = index + 1; this.setState({ currentKey: '2' }) }}>{record.title}</a></span>
    }, {
      title: 'Ratio',
      key: 'ratio',
      width: '20%',
      dataIndex: 'ratio',
    }];
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (cid !== nextProps.match.params.cid) {
      cid = nextProps.match.params.cid
      this.fetchData();
    }
    return true
  }

  async fetchData() {
    let data = await fetchContestDetList(cid, pwd);
    if (data.success === 0) {
      this.setState({ isFailed: true })
    } else {
      // console.log(data.obj)
      oj = data.obj.containProblems[0].remoteOj;
      qid = data.obj.containProblems[0].remoteProblemId;
      id = '1';
      this.setState({ data: data.obj, loading: false })
    }
  }

  changePage = (item) => {
    this.setState({ currentKey: item });
  }

  render() {
    const { data, currentKey } = this.state;
    const { userId } = this.props;
    if (this.state.isFailed) {
      return (
        <NoPermission path='/main/contest' history={this.props.history} />
      )
    }
    if (!this.state.loading) {
      return (
        <div style={{ marginBottom: 4, fontSize: '10pt' }}>
          <div style={{ textAlign: 'center', marginBottom: 4 }}>
            <h1 style={{ display: 'inline', marginRight: 12 }}>{data.title}</h1>{userId === data.userId && <Link to={{ pathname: './add', state: { cid } }} style={{ fontSize: '12pt' }} >Edit</Link>}<br />
            <span style={{ marginRight: 12 }}>Start Time : {getTime(new Date(data.startTime))} </span>   <span>End Time : {getTime(new Date(data.startTime + data.duration))}</span><br />
            <span>Current Server Time : {data.currentTime}</span><br />
            <span style={{ marginRight: 12 }}>Type : {data.contestType === 0 ? 'Public' : 'Private'}</span> <span>Status : {data.status}</span>
          </div>
          <Tabs
            activeKey={currentKey}
            animated={false}
            onChange={this.changePage}>
            <Tabs.TabPane tab="list" key="1">
              <Table
                className="contestDet-table"
                columns={this.columns}
                dataSource={this.state.data.containProblems}
                rowKey={(record, index) => index}
                pagination={false} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Det" key="2">
              <QuesDet match={{ params: { qid: id, cid } }} location={{ state: { oj, qid, pwd } }} changePage={this.changePage} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Submit" key="3">
              <QuesSubmit match={{ params: { qid: id } }} location={{ state: { oj, qid, pwd, cid } }} changePage={this.changePage} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Status" key="4">
              <RealStatus location={{ state: {} }} type={2} currentKey={this.state.currentKey}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rank" key="5">
              <ContestRank match={{ params: { cid } }} />
            </Tabs.TabPane>
          </Tabs>
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