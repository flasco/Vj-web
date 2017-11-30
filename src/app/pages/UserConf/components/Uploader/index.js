import React from 'react';
import { Modal, Upload, message, Icon } from 'antd';
import { uploadAvatar } from '../../../../services/user';

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
  constructor(props) {
    super(props);
    this.state = {
      // visible: false,
      imageUrl: '',
    };
  }

  render() {
    const imageUrl = this.state.imageUrl;
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
            name="userIcon"
            showUploadList={false}
            customRequest={async (componentsData) => {
              let originFile = componentsData.file;
              if(beforeUpload(originFile)){
                let formData = new FormData();
                formData.append("command", "upload_image");
                formData.append("imageType", this.name);
                formData.append(componentsData.filename, originFile, originFile.name);
                await uploadAvatar(formData);
              }
            }}
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

export default Uploader;