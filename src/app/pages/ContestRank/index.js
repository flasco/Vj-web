import React from 'react';
import { Table } from 'antd';

import { getContestRank } from '../../services/contest';
import config from '../../../config';
import LoadingPage from '../../components/LoadingPage';
import './index.css';
const { serverIp } = config;

function getRankColor(item) {
  if (item.isFirstAc) {
    return 'contestRank-firstAc-color';//做出来了
  } else if (item.time) {
    return 'contestRank-ac-color';//做出来了
  } else if (item.failCount > 0) {
    return 'contestRank-wa-color';//错了好多又没做对
  }
}

function getContent(item) {
  if (item.time.length > 0) {
    if (item.failCount < 1) {
      return item.time
    } else {
      return `${item.time}<br/><span style="color:${item.isFirstAc ? 'white' : 'red'}">(-${item.failCount})</span>`
    }
  } else {
    if (item.failCount > 0) {
      return `<span style="color:gray;line-height:30px;">(-${item.failCount})</span>`
    }
  }
}

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
        width: '4%',
        render: (text, record, index) => <div>{index + 1}</div>,
      }, {
        title: 'Team',
        dataIndex: 'team',
        width: '8%',
        render: (text, record) => <div>{record.accountName}</div>,
      }, {
        title: 'Score',
        dataIndex: 'score',
        width: '4%',
        render: (text, record) => <div>{record.acCount}</div>,
      }, {
        title: 'Penalty',
        dataIndex: 'penalty',
        width: '5%',
        render: (text, record) => <div>{parseInt(record.penalty / 60000, 10)}</div>,
      }];
      for (let i = 65, j = 65 + val.listLength; i < j; i++) {
        this.columns.push({
          title: String.fromCharCode(i),
          dataIndex: `problem-${String.fromCharCode(i)}`,
          width: '5%',
          render: (text, record) => <div className={getRankColor(record.problems[i - 65])} dangerouslySetInnerHTML={{ __html: getContent(record.problems[i - 65]) }} />,
        })
      }
      this.setState({ isLoading: false, data: val.rank });
    })
  }

  render() {
    // console.log(document.body.offsetHeight)
    if (this.state.isLoading) {
      return <LoadingPage />
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Table
          size='small'
          className='contestRank-ranklist'
          dataSource={this.state.data}
          columns={this.columns}
          pagination={false}
          rowKey={(item, index) => index} />
        <a href={`${serverIp}/excels/contests/${this.cid}`}>Download</a>
      </div>
    )
  }
}

export default ContestRank;