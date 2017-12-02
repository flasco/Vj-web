import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';

import ProblemAddTable from '../ProblemAddTable';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class ContestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const rangeTimeValue = values['timePicker'];
      let startTime = rangeTimeValue[0].valueOf();
      let duringTime = rangeTimeValue[1].valueOf() - rangeTimeValue[0].valueOf();
      console.log(duringTime);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <Input placeholder="Title" />
        </FormItem>
        <FormItem>
          {getFieldDecorator('timePicker', {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
        </FormItem>
        <ProblemAddTable />
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}
const ContestFormWarpper = Form.create()(ContestForm);
export default ContestFormWarpper;