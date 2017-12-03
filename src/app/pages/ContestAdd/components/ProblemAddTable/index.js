import React from 'react';
import { Form, Input, DatePicker, Button, Table, Modal, Select, Popconfirm } from 'antd';


import { fetchQuesDet } from '../../../../services/problem';
import QuesEditModal from '../QuesEditModal';

const Option = Select.Option;

class ProblemAddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      count: 0,
      visible: false,
      oj: 'HDU',
      id: '1000',
      buttonLoading: false,
      editKey: 0,
    }

    this.columns = [{
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
          this.state.dataSource.length > 0 ?
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
    const { count, dataSource } = this.state;
    const data = await fetchQuesDet(this.state.oj, this.state.id);
    const newData = {
      key: count,
      ...data,
    };
    
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    },()=>{
      this.props.refreshList(this.state.dataSource)
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  editItem = (values) => {
    const { dataSource, editKey } = this.state;
    const newData = Object.assign({}, dataSource[editKey], values);
    dataSource.splice(editKey, 1, newData);
    this.setState({
      dataSource: [...dataSource],
      visible:false
    },()=>{
      this.props.refreshList(this.state.dataSource)
    })
  }

  edit = (key) => {
    const { dataSource } = this.state;
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
    const { dataSource } = this.state;
    let deleteKey = -1;
    for (let i = 0, j = dataSource.length; i < j; i++) {
      if (dataSource[i].key === key) {
        deleteKey = i;
        break;
      }
    }

    if (deleteKey !== -1) {
      dataSource.splice(deleteKey, 1);
      this.setState({
        dataSource: [...dataSource],
      },()=>{
        this.props.refreshList(this.state.dataSource)
      });
    }
  }


  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div style={{ marginBottom: 14, textAlign: 'center' }}>
          <Input addonBefore={
            <Select defaultValue="HDU" style={{ width: 60 }} onChange={(value) => this.setState({ oj: value })}>
              <Option value="HDU">HDU</Option>
              <Option value="PKU">PKU</Option>
            </Select>
          } style={{ width: '200px', marginRight: 24 }} placeholder=" Id" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
          <Button onClick={this.handleAdd} loading={this.state.buttonLoading}>Add</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={this.columns} pagination={false} />
        <QuesEditModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          data={this.state.dataSource[this.state.editKey]}
          submit={this.editItem} />
      </div>

    );
  }
}

export default ProblemAddTable;

