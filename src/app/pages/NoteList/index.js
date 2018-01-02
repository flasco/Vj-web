import React from 'react';
import { Row, Col, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

import { getNoteList } from '../../services/note';
import './index.css';

const columns = [{
  title: 'Id',
  key: 'id',
  width: '7%',
  dataIndex: 'id',
}, {
  title: 'Title',
  key: 'title',
  width: '80%',
  render: (text, record) => <Link to={`./note/${record.id}`}>{record.title}</Link>
}, {
  title: 'Author',
  key: 'author',
  width: '13%',
  render: (text, record) => <Link to={`/user/${record.userId}`}>{record.author}</Link>
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
    this.userId = props.match.params.uid;
    this.remoteOj = props.match.params.oj
    this.remoteId = props.match.params.qid;
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
  fetchL = async (page) => {
    this.setState({ loading: true });
    const datax = await getNoteList(page, this.remoteOj, this.remoteId, this.userId);
    const pagination = { ...this.state.pagination };
    pagination.total = datax.totalCount;
    this.setState({
      loading: false,
      data: datax.results,
      pagination,
    });
  }

  noteWrite = () => {
    this.props.history.push({ pathname: '/main/ques/noteEdit', state: { userId: this.userId, remoteOj: this.remoteOj, remoteId: this.remoteId } });
  }

  render() {
    return (
      <div>
        <Row style={{ marginBottom: 8 }}>
          <Col span={12} style={{ fontSize: 16 }}>Note List</Col>
          <Col span={12} style={{ fontSize: 16 }}>
            <Button type="primary" style={{ float: 'right' }} onClick={this.noteWrite}>Write</Button>
          </Col>
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