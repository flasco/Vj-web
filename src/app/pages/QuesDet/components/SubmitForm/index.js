import React from 'react';
import { Icon, Spin, Modal, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

class SubmitForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Form >
        <Form.Item
          {...formItemLayout}
          label="Problem Id">
          {getFieldDecorator('ProblemId', {
            rules: [{ required: true, message: 'Please input problem Id!' }],
            initialValue: '1000',
          })(
            <Input />
            )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Language">
          {getFieldDecorator('Language', {
            rules: [{ required: true, message: 'Please select your Language' }],
            initialValue:'0'
          })(
            <Select  style={{ width: 120 }} onChange={(value)=>console.log(`selected ${value}`)}>
              <Select.Option value="0">G++</Select.Option>
              <Select.Option value="1">GCC</Select.Option>
              <Select.Option value="2">C++</Select.Option>
              <Select.Option value="3">C</Select.Option>
              <Select.Option value="4">Pascal</Select.Option>
              <Select.Option value="5">Java</Select.Option>
              <Select.Option value="6">C#</Select.Option>
            </Select>
            )}
        </Form.Item>

      </Form>
    );
  }
}

const WrappedForm = Form.create()(SubmitForm);

export default WrappedForm;
