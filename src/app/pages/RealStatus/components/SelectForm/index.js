import React from 'react';
import { Form, Row, Col, Input, Button, Select, Tooltip } from 'antd';

import './index.css';
const FormItem = Form.Item;
const Option = Select.Option;

class SelectForm extends React.Component {
  componentDidMount() {
    if (this.props.author !== void 0) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.search(values);
        }
      });
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.search(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };
    return (
      <Form
        className="realStatus-form"
        onSubmit={this.handleSearch}>
        <Row gutter={20} type="flex" justify="center">
          <Col span={3}>
            <Tooltip placement="top" title="RunId">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`runId`, {
                    initialValue: this.props.selector.runId,
                  })(
                    <Input placeholder="RunId" style={{ height: 30 }} />
                    )}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Col span={3}  >
            <Tooltip placement="top" title="Problem Id">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`proId`, {
                    initialValue: this.props.selector.proId,
                  })(
                    <Input placeholder="ProId" style={{ height: 30 }} />
                    )}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Col span={3}>
            <Tooltip placement="top" title="Author">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`author`, {
                    initialValue: this.props.selector.author
                  })(
                    <Input placeholder="Author" style={{ height: 30 }} />
                    )}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Col span={3}>
            <Tooltip placement="top" title="Language">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`language`, {
                    initialValue: this.props.selector.language
                  })(
                    <Select onChange={(val) => console.log(val)}>
                      <Option value="0">All</Option>
                      <Option value="1">G++</Option>
                      <Option value="2">GCC</Option>
                      <Option value="3">C++</Option>
                      <Option value="4">C</Option>
                      <Option value="5">Pascal</Option>
                      <Option value="6">Java</Option>
                      <Option value="7">C#</Option>
                    </Select>)}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Col span={5}>
            <Tooltip placement="top" title="Status">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`status`, {
                    initialValue: this.props.selector.status
                  })(
                    <Select onChange={(val) => console.log(val)}>
                      <Option value="0">All</Option>
                      <Option value="1">Accepted</Option>
                      <Option value="2">Wrong Answer</Option>
                      <Option value="3">Presentation Error</Option>
                      <Option value="4">Compilation Error</Option>
                      <Option value="5">Runtime Error</Option>
                      <Option value="6">Time Limit Exceeded</Option>
                      <Option value="7">Memory Limit Exceeded</Option>
                      <Option value="8">Output Limit Exceeded</Option>
                    </Select>)}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Button type="primary" htmlType="submit" style={{ height: 30 }}>Search</Button>
        </Row>
      </Form>
    );
  }
}

const SelectFormWapper = Form.create()(SelectForm);

export default SelectFormWapper;