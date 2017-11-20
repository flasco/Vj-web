import React from 'react';
import { Row, Col, Tag, Table, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import img from '../../assert/logo.svg';
import './index.css';

const data = [{
  header: img,
  type: '聊天',
  postId: '457661',
  title: '不忘初心，一路前行。',
  author: '浅凉。',
  time_1: '2017-11-5',
  replyNum: 17,
}, {
  header: img,
  type: '聊天',
  postId: '455481',
  title: '不忘初心，一路前行。',
  author: '浅凉。',
  time_1: '2017-11-5',
  replyNum: 17,
}];

const columns = [{
  title: '头像',
  key: 'header',
  render: (text, record) => <Avatar src={record.header} size="large" style={{ backgroundColor: '#fff' }} />
}, {
  title: '标签',
  key: 'tag',
  render: (text, record) => <TagSwitch type={record.type} />
}, {
  title: '标题',
  key: 'title',
  render: (text, record) => <span><Link to={`/detail/${record.postId}`}>{record.title}</Link></span>
}, {
  title: '作者',
  key: 'author',
  render: (text, record) =>
    <div style={{ fontSize: 12 }}>
      <span>{record.author}</span><br /><span style={{ color: '#999' }}>{record.time_1}</span>
    </div>
}, {
  title: '回复数',
  dataIndex: 'replyNum',
  key: 'replyNum',
}];


class TagSwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.colorSwitch = {
      '全部': 'blue',
      '心情': 'cyan',
      '聊天': 'green',
    }
  }
  render() {
    return (
      <Tag color={this.colorSwitch[this.props.type]}>{this.props.type}</Tag>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="main-container">
        <Row gutter={16}>
          <Col span={12} style={{ fontSize: 16 }}>Discussion List</Col>
          <Col span={12}>
            <div style={{ float: 'right' }}>
              <TagSwitch type='全部' />
              <TagSwitch type='心情' />
              <TagSwitch type='聊天' />
            </div>
          </Col>
        </Row>
        <hr className="markdown-hr-list" />
        <Table
          className="discuss-table"
          dataSource={data}
          showHeader={false}
          columns={columns}
          rowKey={(record, index) => index} />
      </div>
    );
  }
}

export default App;