import React from 'react';
import { Form } from 'antd';
import './index.css';
const FormItem = Form.Item;

class ShowForm extends React.PureComponent {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { data } = this.props;
    return (
      <Form className="showForm-form" >
        <FormItem
          {...formItemLayout}
          label="accountName">
          <span>{data.accountName}</span>
          <div className="confForm-img">
            <img src={data.icon} className="confForm-header" alt={data.accountName} />
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender">
          <span>{(data.gender === '1' && 'man') || (data.gender === '2' && 'woman') || (data.gender === '3' && 'secret')}</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="School">
          <span>{data.school}</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Signature">
          <span dangerouslySetInnerHTML={{ __html: data.description.replace(/\n/g, '<br/>') }} />
        </FormItem>
      </Form>
    );
  }
}

const ShowFormWarpper = Form.create()(ShowForm);

export default ShowFormWarpper;