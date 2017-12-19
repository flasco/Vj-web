import React from 'react';
import { Form, Input, DatePicker, Button, message, Select, Col, Row } from 'antd';

import { fetchContestDetList } from '../../../../services/contest';

import ProblemAddTable from '../ProblemAddTable';
import LoadingPage from '../../../../components/LoadingPage';
import moment from 'moment';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class ContestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containProblems: [],
      isLoading: true,
      isPrivate: false,
    }

  }
  componentDidMount() {
    if (this.props.cid !== void 0) {
      fetchContestDetList(this.props.cid).then(val => {
        console.log(val);
        val.containProblems.filter((x, index) => x.key = index);
        this.refreshList(val.containProblems);
        this.setState({ isLoading: false })
        this.props.form.setFieldsValue({
          title: val.title,
          timePicker: [
            moment(new Date(val.startTime)),
            moment(new Date(val.startTime + val.duration))
          ],
          contestType: `${val.contestType}`
        });
      })
    } else {
      this.setState({ isLoading: false })
    }

  }

  refreshList = (list) => {
    this.setState({
      containProblems: list
    })
  }

  handleSelectChange = (value) => {
    this.setState({ isPrivate: value === '1' })
    this.props.form.setFieldsValue({
      password: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.state.containProblems.length < 1) {
        message.error('please add problem ! ');
        return;
      }
      const rangeTimeValue = values['timePicker'];
      let startTime = rangeTimeValue[0].valueOf();
      let duration = rangeTimeValue[1].valueOf() - rangeTimeValue[0].valueOf();
      let now = Date.now();
      if (startTime + duration + 4 * 3600000 < now) { //要求必须和现在的时间叉开4小时以上
        message.error('please reselect time !');
        return;
      }
      const subValues = {
        title: values.title,
        contestType: values.contestType,
        password: values.password,
        startTime,
        duration,
        containProblems: this.state.containProblems,
      }
      this.props.submit(subValues);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 8
      },
    };
    if (this.state.isLoading) {
      return <LoadingPage />
    }
    return (
      <Form>
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
          <Row gutter={12}>
            <Col span={8}>
              <FormItem>
                {getFieldDecorator('contestType', {
                  initialValue: '0',
                  rules: [{ required: true, message: 'Please input title' }],
                })(
                  <Select onChange={this.handleSelectChange}>
                    <Option value='0'>public</Option>
                    <Option value='1'>private</Option>
                  </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={16}>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: '',
                })(
                  <Input placeholder="password" disabled={!this.state.isPrivate} />
                  )}
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label='RangTime'
          {...formItemLayout}>
          {getFieldDecorator('timePicker', {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
        </FormItem>
        <ProblemAddTable refreshList={this.refreshList} dataSource={this.state.containProblems} />
        <FormItem style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
        </FormItem>
      </Form>
    );
  }
}


const ContestFormWarpper = Form.create()(ContestForm);

export default ContestFormWarpper;