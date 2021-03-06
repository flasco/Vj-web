import React from 'react';
import { Row, Col, Table, Button, Modal, Input, Tooltip,Select } from 'antd';
import { connect } from 'react-redux';

import { fetchContestList } from '../../services/contest';

import './index.css';

function getFormatTime(text) {
  let date = new Date(text);
  let front = date.toLocaleDateString('zh');
  let back = date.toTimeString().substring(0, 8);
  return `${front} ${back}`;
}

function getStatusColor(text) {
  if (text.indexOf('Pend') !== -1) {
    return 'green';
  } else if (text.indexOf('Run') !== -1) {
    return 'red';
  } else if (text.indexOf('End') !== -1) {
    return '#808080';
  }
}

class ContestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      password: '',
      isVisible: false,
      contestNameText: '',
    }
    this.type = '-1';
    this.status = '';
    

    this.columns = [{
      title: 'Id',
      key: 'id',
      width: '5%',
      dataIndex: 'id',
    }, {
      title: (<Tooltip placement="top" title="press Enter to search"><Input placeholder='Contest Name' style={{ width: '55%' }} size="small" onChange={(e) => this.setState({ contestNameText: e.target.value })} onPressEnter={(e) => this.searchQues()} /></Tooltip>),
      key: 'title',
      width: '25%',
      render: (text, record) => <a onClick={() => this.isPrivateCheck(record.contestType, record.id)}>{record.title}</a>//<Link to={{ pathname: `./contest/${record.id}`, state: { isPrivate: record.contestType } }}>
    }, {
      title:(<Select defaultValue="-1" size="small" style={{width:70}}
          onChange={(val) => { this.type = val; this.searchQues() }}>
          <Select.Option value="-1">all</Select.Option>
          <Select.Option value="0">public</Select.Option>
          <Select.Option value="1">private</Select.Option>
        </Select>),
      key: 'contestType',
      width: '5%',
      render: (text, record) => <span style={{ color: record.contestType === 0 ? 'red' : 'green' }}>{record.contestType === 0 ? 'public' : 'private'}</span>
    }, {
      title:(<Select defaultValue="" size="small" style={{width:70}}
          onChange={(val) => { this.status = val; this.searchQues() }}>
          <Select.Option value="">all</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Runing">Running</Select.Option>
          <Select.Option value="Ended">Ended</Select.Option>
        </Select>),
      key: 'status',
      width: '7%',
      render: (text, record) => <span style={{ color: getStatusColor(record.status) }}>{record.status}</span>
    }, {
      title: 'Start Time (GMT+8)',
      key: 'startTime',
      width: '12%',
      render: (text, record) => <span>{getFormatTime(record.startTime)}</span>
    },];
  }

  componentDidMount() {
    this.fetchL(1,{});
  }

  searchQues = async () => {
    this.fetchL(1, {
      title: this.state.contestNameText,
      contestType: this.type,
      status: this.status,
    });
  }

  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return;
    };
  }

  fetchL = async (page, { title = '', accountName = '', status = '', contestType = '-1' }) => {
    this.setState({ loading: true });
    const datax = await fetchContestList(page, { title, accountName, status, contestType });
    const pagination = { ...this.state.pagination };
    pagination.total = datax.totalCount;
    this.cid = 0;
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

  contestAdd = () => {
    this.props.history.push('./contest/add')
  }

  isPrivateCheck = (type, id) => {
    if (type === 1) {
      this.cid = id;
      this.setState({ isVisible: true });
    } else {
      this.props.history.push(`./contest/${id}`);
    }
  }

  privatePush = () => {
    this.props.history.push({ pathname: `./contest/${this.cid}`, state: { pwd: this.state.password } });
  }

  closeWindow = () => {
    this.setState({ isVisible: false })
  }

  render() {
    return (
      <div>
        <Row style={{ marginBottom: 8 }}>
          <Col span={12} style={{ fontSize: 16 }}>Contest List</Col>
          <Col span={12} style={{ fontSize: 16 }}>
            {this.props.isLogin && <Button type="primary" style={{ float: 'right' }} onClick={this.contestAdd}>Create</Button>}
          </Col>
        </Row>
        <Table
          className="contestList-table"
          columns={this.columns}
          dataSource={this.state.data}
          rowKey={(record, index) => index}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} />
        <Modal
          width={300}
          visible={this.state.isVisible}
          onCancel={this.closeWindow}
          style={{ top: 120 }}
          footer={null}>
          <h2 style={{ marginBottom: 12 }}>Permission Check</h2>
          <Row gutter={20}>
            <Col span={16}>
              <Input placeholder='please input password' value={this.state.password} onPressEnter={this.privatePush} onChange={(e) => this.setState({ password: e.target.value })} />
            </Col>
            <Col span={8}><Button onClick={this.privatePush}>Submit</Button></Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

function select(state) {
  return {
    isLogin: state.user.isLogin
  }
}

export default connect(select)(ContestList);