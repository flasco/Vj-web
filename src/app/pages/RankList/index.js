import React from 'react';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import { getUserRank } from '../../services';
import './index.css';

const columns = [{
  title: 'Rank',
  key: 'rank',
  dataIndex: 'rank',
}, {
  title: 'Author',
  key: 'accountName',
  render: (text, record) => <Link to={`/user/${record.id}`}>{record.accountName}</Link>
}, {
  title: 'Description',
  key: 'description',
  render: (text, record) => <span >{record.description.length > 30 ? `${record.description.substring(0, 28)}...` : record.description}</span>
}, {
  title: 'Solved',
  key: 'solved',
  render: (text, record) => <Link to={{ pathname: `/main/status`, state: { author: record.accountName, status: '1' } }}>{record.acCount}</Link>
}, {
  title: 'Submitted',
  key: 'submitted',
  render: (text, record) => <Link to={{ pathname: `/main/status`, state: { author: record.accountName } }}>{record.acCount + record.failCount}</Link>
}, {
  title: 'AC Ratio',
  key: 'acRatio',
  render: (text, record) => <span >{`${(record.acCount / ((record.acCount + record.failCount) !== 0 ? (record.acCount + record.failCount) : 1) * 100).toFixed(2)}%`}</span>
}];

class RankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
    this.fetchL = this.fetchL.bind(this);
  }
  componentDidMount() {
    this.fetchL(1);
  }

  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return;
    };
  }

  async fetchL(page) {
    this.setState({ loading: true });
    const datax = await getUserRank(page);
    console.log(datax);
    const pagination = { ...this.state.pagination };
    pagination.total = datax.totalCount;
    this.setState({
      loading: false,
      data: datax.results,
      pagination,
    });
  }

  render() {
    return (
      <div>
        <Row style={{ marginBottom: 8 }}>
          <Col span={12} style={{ fontSize: 16 }}>Rank List</Col>
        </Row>
        <Table
          className="ranklist-table"
          size="middle"
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

export default RankList;