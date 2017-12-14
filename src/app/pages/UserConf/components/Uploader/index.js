import React from 'react';
import { Modal, Upload, message, Icon } from 'antd';
import { connect } from 'react-redux';

import { userUpdate } from '../../../../actions';
import config from '../../../../../config';
const { serverIp } = config;

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


class Uploader extends React.PureComponent {
  handleChange = (info) => {
    if (info.file.response !== undefined) {
      let path = `${serverIp}${info.file.response.path}`;
      this.props.dispatch(userUpdate({ icon: path }));
    }
  }

  render() {
    const imageUrl = this.props.icon;
    return (
      <Modal
        width={300}
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        footer={null}>
        <div>
          <h1 style={{ marginBottom: 12 }}>Header Upload</h1>
          <Upload
            className="avatar-uploader"
            name="icon"
            showUploadList={false}
            action={`${serverIp}/files/icon`}
            onChange={this.handleChange}
            withCredentials={true}//允许携带cookie
            beforeUpload={beforeUpload}>
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="avatar" /> :
                <Icon type="plus" className="avatar-uploader-trigger" />
            }
          </Upload>
        </div>
      </Modal>
    );
  }
}

function select(state) {
  return{
    icon:state.user.icon
  }
}

export default connect(select)(Uploader);