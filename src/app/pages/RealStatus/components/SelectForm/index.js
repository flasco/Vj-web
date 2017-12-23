import React from 'react';
import { Form, Row, Col, Input, Button, Select, Tooltip } from 'antd';

import './index.css';
const FormItem = Form.Item;
const Option = Select.Option;

class SelectForm extends React.Component {
  constructor(props){
    super(props);
    this.type = this.props.type ? this.props.type : 1;
  }
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
        <Row gutter={5} type="flex" justify="center">
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
          {this.type === 2 && <Col span={3}  >
            <Tooltip placement="top" title="problemId">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`id`, {
                    initialValue: this.props.selector.id,
                  })(
                    <Input placeholder="proId" style={{ height: 30 }} />
                    )}
                </FormItem>
              </div>
            </Tooltip>
          </Col>}
          {this.type === 1 && <Col span={3}  >
            <Tooltip placement="top" title="OJ">
              <Col>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`remoteOj`, {
                    initialValue: this.props.selector.oj,
                  })(
                    <Input placeholder="Oj" style={{ height: 30 }} />
                    )}
                </FormItem>
              </Col>
            </Tooltip>
          </Col>}

          {this.type === 1 && <Col span={3}  >
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
          </Col>}
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
                    <Select>
                      <Option value="">All</Option>
                      <Option value="G++">G++</Option>
                      <Option value="GCC">GCC</Option>
                      <Option value="C++">C++</Option>
                      <Option value="C">C</Option>
                      <Option value="Pascal">Pascal</Option>
                      <Option value="Java">Java</Option>
                      <Option value="C#">C#</Option>
                    </Select>)}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip placement="top" title="Status">
              <div>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator(`status`, {
                    initialValue: this.props.selector.status
                  })(
                    <Select >
                      <Option value="">All</Option>
                      <Option value="AC">Accepted</Option>
                      <Option value="WA">Wrong Answer</Option>
                      <Option value="PE">Presentation Error</Option>
                      <Option value="CE">Compilation Error</Option>
                      <Option value="RE">Runtime Error</Option>
                      <Option value="TLE">Time Limit Exceeded</Option>
                      <Option value="MLE">Memory Limit Exceeded</Option>
                      <Option value="OLE">Output Limit Exceeded</Option>
                    </Select>)}
                </FormItem>
              </div>
            </Tooltip>
          </Col>
          <Button type="primary" htmlType="submit" style={{marginLeft:12, height: 30 }}>Search</Button>
        </Row>
      </Form>
    );
  }
}

const SelectFormWapper = Form.create()(SelectForm);

export default SelectFormWapper;