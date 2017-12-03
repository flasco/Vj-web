import React from 'react';
import { Form, Input, DatePicker, Button, message,Select } from 'antd';

import ProblemAddTable from '../ProblemAddTable';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class ContestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemList: [],
    }
  }

  refreshList = (list) => {
    this.setState({
      problemList: list
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.state.problemList.length < 1) {
        message.error('please add problem ! ');
        return;
      }
      const rangeTimeValue = values['timePicker'];
      let startTime = rangeTimeValue[0].valueOf();
      let duringTime = rangeTimeValue[1].valueOf() - rangeTimeValue[0].valueOf();
      const subValues = {
        title: values.title,
        startTime,
        duringTime,
        list: this.state.problemList
      }
      console.log(subValues);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 6
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label='Title'
          {...formItemLayout}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input title' }],
          })(
            <Input placeholder="Title" />
            )}
        </FormItem>
        <FormItem label='Type'
          {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue:'public',
            rules: [{ required: true, message: 'Please input title' }],
          })(
            <Select>
              <Option value='public'>public</Option>
              <Option value='private'>private</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label='RangTime'
          {...formItemLayout}>
          {getFieldDecorator('timePicker', {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
        </FormItem>
        <ProblemAddTable refreshList={this.refreshList} />
        <FormItem style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" htmlType="submit" >Submit</Button>
        </FormItem>
      </Form>
    );
  }
}
const ContestFormWarpper = Form.create()(ContestForm);
export default ContestFormWarpper;