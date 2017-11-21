import React from 'react';
import { Row, Col, Table, Input } from 'antd';
import { Link } from 'react-router-dom';

import { fetchQuesList } from '../../services';

import './index.css';

const columns = [{
  title: 'OJ',
  key: 'remoteOJ',
  dataIndex: 'remoteOJ',
},{
  title: 'Pro.Id',
  key: 'remoteProblemId',
  dataIndex: 'remoteProblemId',
}, {
  title: 'Title',
  key: 'title',
  render: (text, record) => <span><Link to={`./ques/${record.remoteProblemId}`}>{record.title}</Link></span>
}, {
  title: 'Ratio',
  key: 'ratio',
  dataIndex: 'ratio',
}];

class QuesList extends React.Component {
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

  async fetchL(page) {
    this.setState({ loading: true });
    const datax = await fetchQuesList(page);
    const pagination = { ...this.state.pagination };
    pagination.total = datax.totalCount;
    this.setState({
      loading: false,
      data: datax.results,
      pagination,
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchL(pagination.current);
  }



  render() {
    return (
      <div className="main-container">
        <Row gutter={16}>
          <Col span={12} style={{ fontSize: 16 }}>Question List</Col>
          <Col span={12}>
            <Input.Search
              placeholder="input here to search"
              style={{ width: 200, marginBottom: 12, float: 'right' }}
              onSearch={value => console.log(value)} />
          </Col>
        </Row>

        <Table
          className="ques-table"
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

export default QuesList;