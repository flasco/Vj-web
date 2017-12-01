import React from 'react';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';

import { getNoteList } from '../../services/note';
import './index.css';

const columns = [{
  title: 'Id',
  key: 'id',
  dataIndex: 'id',
}, {
  title: 'Title',
  key: 'title',
  render: (text, record) => <Link to={`./note/${record.id}`}>{record.title}</Link>
}, {
  title: 'Author',
  key: 'author',
  render: (text, record) => <Link to={`/user/${record.author}`}>{record.author}</Link>
},]

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.type = 0;
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }

    if (this.p1 = props.match.params.uid) {
      this.type = 1; //这里是用户的列表
    } else if (this.p1 = props.match.params.oj) {
      this.type = 2; //这里是题库题目的题解跳转。
      this.p2 = props.match.params.id;
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
    const datax = await getNoteList(page, this.type, this.p1, this.p2);
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
          <Col span={12} style={{ fontSize: 16 }}>Note List</Col>
        </Row>
        <Table
          className="notelist-table"
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

export default NoteList;