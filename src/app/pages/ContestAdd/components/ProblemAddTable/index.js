import React from 'react';
import { Input, Button, Table, Select, Popconfirm } from 'antd';


import { fetchQuesDet } from '../../../../services/problem';
import QuesEditModal from '../QuesEditModal';

const Option = Select.Option;

class ProblemAddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.dataSource.length,
      visible: false,
      oj: 'HDU',
      id: '1000',
      buttonLoading: false,
      editKey: 0,
    }

    this.columns = [{
      title: 'Index',
      dataIndex: 'key',
      width: '10%',
      render: (text, record, index) => <span>{index + 1}</span>,
    }, {
      title: 'Oj',
      dataIndex: 'remoteOj',
      width: '10%',
      render: (text, record) => <span>{record.remoteOj}</span>,
    }, {
      title: 'Id',
      dataIndex: 'remoteProblemId',
      width: '10%',
      render: (text, record) => <span>{record.remoteProblemId}</span>,
    }, {
      title: 'Title',
      dataIndex: 'title',
      width: '50%',
      render: (text, record) => <span>{record.title}</span>,
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.props.dataSource.length > 0 ?
            (
              <span>
                <a onClick={() => this.edit(record.key)} style={{ marginRight: 8 }}>Edit</a>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.key)}>
                  <a>Delete</a>
                </Popconfirm>
              </span>
            ) : null
        );
      },
    }];
  }

  handleAdd = async () => {
    const { count } = this.state;
    const { dataSource } = this.props;
    if(this.state.id === '') return ;
    this.setState({ buttonLoading: true, id: '', })
    const data = await fetchQuesDet(this.state.oj, this.state.id);
    // console.log(data);
    if(data === '') {
      this.setState({
        buttonLoading: false
      });
      return ;
    }
    const newData = {
      key: count,
      isEdited: 0,
      ...data,
    };
    this.props.refreshList([...dataSource, newData]);
    this.setState({
      count: count + 1,
      buttonLoading: false
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  editItem = (values) => {
    const { editKey } = this.state;
    const { dataSource } = this.props;
    dataSource[editKey].isEdited = 1;
    const newData = Object.assign({}, dataSource[editKey], values);
    dataSource.splice(editKey, 1, newData);
    this.props.refreshList(dataSource)

    this.setState({
      visible: false
    })
  }

  edit = (key) => {
    const { dataSource } = this.props;
    let editKey = -1;
    for (let i = 0, j = dataSource.length; i < j; i++) {
      if (dataSource[i].key === key) {
        editKey = i;
        break;
      }
    }
    editKey !== -1 && this.setState({
      editKey,
      visible: true
    })
  }

  delete = (key) => {
    const { dataSource } = this.props;
    let deleteKey = -1;
    for (let i = 0, j = dataSource.length; i < j; i++) {
      if (dataSource[i].key === key) {
        deleteKey = i;
        break;
      }
    }

    if (deleteKey !== -1) {
      dataSource.splice(deleteKey, 1);
      this.props.refreshList(dataSource)
    }
  }


  render() {
    const { dataSource } = this.props;
    return (
      <div>
        <div style={{ marginBottom: 14, textAlign: 'center' }}>
          <Input addonBefore={
            <Select defaultValue="HDU" style={{ width: 60 }} onChange={(value) => this.setState({ oj: value })}>
              <Option value="HDU">HDU</Option>
              <Option value="PKU">PKU</Option>
            </Select>
          } style={{ width: '200px', marginRight: 24 }} placeholder=" Id" value={this.state.id} onPressEnter={this.handleAdd} onChange={(e) => this.setState({ id: e.target.value })} />
          <Button onClick={this.handleAdd} loading={this.state.buttonLoading} icon="plus">Add</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={this.columns} pagination={false} rowKey={(item, index) => index} />
        <QuesEditModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          data={this.props.dataSource[this.state.editKey]}
          submit={this.editItem} />
      </div>
    );
  }
}

export default ProblemAddTable;

