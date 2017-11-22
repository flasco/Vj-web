import React from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

const FormItem = Form.Item;

class FormX extends React.Component {

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
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
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
    }
    return (
      <Form
        onSubmit={this.handleSearch}
      >
        <Row gutter={10}>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`Pro.Id`}>
              {getFieldDecorator(`Pro.Id`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`Lan.Id`}>
              {getFieldDecorator(`Language`,{
                initialValue:'a10'
              })(
                <Select
                  size='default'
                  onChange={(val)=>console.log(val)}
                >
                  {children}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem {...codeLayout}>
              {getFieldDecorator(`sourceCode`)(
                <Input.TextArea placeholder="placeholder"
                  style={{ height: 370 }} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const FormXWarpper = Form.create()(FormX);

export default FormXWarpper;