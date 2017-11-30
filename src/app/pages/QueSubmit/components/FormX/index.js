import React from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';

import { postCode } from '../../../../services/index';

import './index.css';

const FormItem = Form.Item;

class FormX extends React.Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        postCode({
          ...values,
          cid: this.props.cid,
          type: this.props.type,
        });
        this.props.history.push('/main/status');
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const codeLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    }
    let children = [];
    for (let i = 0, j = this.props.selectChild.length; i < j; i++) {
      children.push(<Select.Option key={this.props.selectChild[i].value} >{this.props.selectChild[i].content}</Select.Option>)
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={10} style={{ width: '75%', margin: '0 auto' }}>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`Pro.Id`}>
              {getFieldDecorator(`remoteProblemId`, {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: 'please input Pro.Id' }],
                initialValue: this.props.qid,
              })(<Input placeholder="Pro.Id" />)}
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`Lan.Id`}>
              {getFieldDecorator(`language`, { initialValue: '0' })(
                <Select size='default'>
                  {children}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem {...codeLayout}>
              {getFieldDecorator(`source`, {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: 'Make sure that your code length is longer than 50 and not exceed 65536 Bytes', min: 50, max: 6553500 }],
              })(
                <Input.TextArea
                  placeholder="please insert your code "
                  style={{ height: 370, resize: 'none' }} />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">submit</Button>
            <Button style={{ marginLeft: 8 }} onClick={() => { this.props.form.resetFields(); }}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const FormXWarpper = Form.create()(FormX);

export default FormXWarpper;