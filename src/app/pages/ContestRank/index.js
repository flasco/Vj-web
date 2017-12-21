import React from 'react';
import { Table } from 'antd';

import { getContestRank } from '../../services/contest';

import LoadingPage from '../../components/LoadingPage';

class ContestRank extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cid = props.match.params.cid;
    console.log(this.cid)
    this.state = {
      data: '',
      isLoading: true,

    }
    this.columns = [];
  }
  componentDidMount() {
    getContestRank(this.cid).then(val => {
      console.log(val);
      this.columns = [{
        title: 'Rank',
        dataIndex: 'rank',
        width: '5%',
        render: (text, record, index) => <span>{index + 1}</span>,
      }, {
        title: 'Team',
        dataIndex: 'team',
        width: '8%',
        render: (text, record) => <span>{record.accountName}</span>,
      }, {
        title: 'Score',
        dataIndex: 'score',
        width: '10%',
        render: (text, record) => <span>{record.acCount}</span>,
      }, {
        title: 'Penalty',
        dataIndex: 'penalty',
        width: '10%',
        render: (text, record) => <span>{parseInt(record.penalty / 60000,10)}</span>,
      }];
      for (let i = 65, j = 65 + val.listLength; i < j; i++) {
        this.columns.push({
          title: String.fromCharCode(i),
          dataIndex: `problem-${String.fromCharCode(i)}`,
          width: '10%',
          render: (text, record) => <span>{`${record.problems[i-65].time}(-${record.problems[i-65].failCount})`}</span>,
        })
      }
      this.setState({ isLoading: false, data: val.rank });
    })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingPage />
    }
    return (
      <div>
        <h1>Rank</h1>
        <Table
          bordered
          dataSource={this.state.data}
          columns={this.columns}
          pagination={false}
          rowKey={(item, index) => index} />
      </div>
    )
  }
}

export default ContestRank;