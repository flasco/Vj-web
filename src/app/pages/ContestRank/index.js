import React from 'react';
import { Table } from 'antd';

import { getContestRank } from '../../services/contest';

import LoadingPage from '../../components/LoadingPage';
import './index.css';

function getRankColor(item) {
  if (item.firstAc) {
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
      return `${item.time}<br/><span style="color:gray;">(-${item.failCount})</span>`
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
      this.columns = [{
        title: 'Rank',
        dataIndex: 'rank',
        width: '5%',
        render: (text, record, index) => <div>{index + 1}</div>,
      }, {
        title: 'Team',
        dataIndex: 'team',
        width: '8%',
        render: (text, record) => <div>{record.accountName}</div>,
      }, {
        title: 'Score',
        dataIndex: 'score',
        width: '10%',
        render: (text, record) => <div>{record.acCount}</div>,
      }, {
        title: 'Penalty',
        dataIndex: 'penalty',
        width: '10%',
        render: (text, record) => <div>{parseInt(record.penalty / 60000, 10)}</div>,
      }];
      for (let i = 65, j = 65 + val.listLength; i < j; i++) {
        this.columns.push({
          title: String.fromCharCode(i),
          dataIndex: `problem-${String.fromCharCode(i)}`,
          width: '10%',
          render: (text, record) => <div className={getRankColor(record.problems[i - 65])} dangerouslySetInnerHTML={{ __html: getContent(record.problems[i - 65]) }} />,
        })
      }
      this.setState({ isLoading: false, data: [...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank, ...val.rank] });
    })
  }

  render() {
    // console.log(document.body.offsetHeight)
    const tableHeight = document.body.offsetHeight > 540 ? document.body.offsetHeight - 298 : 280;
    if (this.state.isLoading) {
      return <LoadingPage />
    }
    return (
      <div>
        <Table
          bordered
          scroll={{ y: tableHeight }}
          className='contestRank-ranklist'
          dataSource={this.state.data}
          columns={this.columns}
          pagination={false}
          rowKey={(item, index) => index} />
      </div>
    )
  }
}

export default ContestRank;