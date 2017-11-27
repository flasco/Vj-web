import React from 'react';
import { Form } from 'antd';

import './index.css';
const FormItem = Form.Item;

class ShowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // UpVisible: false,
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <Form className="confForm-form" >
        <FormItem
          {...formItemLayout}
          label="NickName">
          <span>无夏丶</span>
          <div className="confForm-img">
            <img src="http://img2.woyaogexing.com/2017/11/07/705db8f16970ff85!400x400_big.jpg" className="confForm-header" alt="无夏丶" />
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Signature">
          <span>这人贼懒，没有写签名。</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender">
            <span>woman</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="School">
          <span>浙江科技学院</span>
        </FormItem>
      </Form>
    );
  }
}

const ShowFormWarpper = Form.create()(ShowForm);

export default ShowFormWarpper;