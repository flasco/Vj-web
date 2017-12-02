import React from 'react';
import { Form, Input, DatePicker, Button, Table, Modal, Select } from 'antd';


import { fetchQuesDet } from '../../../../services/problem';

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
    }

    this.columns = [{
      title: 'Title',
      dataIndex: 'title',
      width: '30%',
      render: (text, record) => <span>{record.title}</span>,
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
            (
              <a onClick={() => { console.log(record); this.edit(record.key); }}>Edit</a>
            ) : null
        );
      },
    }];
  }
  handleAdd = async () => {
    const data = await fetchQuesDet(this.state.oj, this.state.id);
  }

  handleCancel = () => {
    this.setState({ visible: false });
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
          <Button onClick={this.handleAdd}>Add</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={this.columns} />
      </div>

    );
  }
}

export default ProblemAddTable;


/* <Modal
    width={650}
    visible={this.state.visible}
    onCancel={this.handleCancel}
    footer={null}>
  </Modal> */