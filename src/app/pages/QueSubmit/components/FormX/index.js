import React from 'react';
import { Row, Col, Form, Input, Select, Button, message } from 'antd';

import { postCode } from '../../../../services/index';

import './index.css';

const FormItem = Form.Item;

class FormX extends React.Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.props.cid.length === 0) {
          let data = await postCode({
            ...values,
            remoteOj: this.props.oj,
          })
          if (data.success === 0) {
            message.error('no login. submit failed');
          } else {
            this.props.history.push('/main/status');
          }
        } else {
          let data = await postCode({
            ...values,
            contestId: this.props.cid,
            remoteProblemId: this.props.qid,
            remoteOj: this.props.oj,
            index: this.props.id - 1,
          });
          if (data.success === 0) {
            message.error('no login. submit failed');
          } else {
            this.props.changePage('4');
          }
        }
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
          {this.props.cid === '' ? <Col span={12} >
            <FormItem {...formItemLayout} label={`Pro.Id`}>
              {getFieldDecorator(`remoteProblemId`, {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: 'please input Pro.Id' }],
                initialValue: this.props.qid,
              })(<Input placeholder="Pro.Id" />)}
            </FormItem>
          </Col> : <Col span={12} >
              <FormItem {...formItemLayout} label={`Pro.Id`}>
                <span>{String.fromCharCode( +this.props.id + 64)}</span>
              </FormItem>
            </Col>}
          <Col span={12} >
            <FormItem {...formItemLayout} label={`Lan.Id`}>
              {getFieldDecorator(`language`, { initialValue: 'G++' })(
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