import React from 'react';
import { Modal, Upload, message, Icon } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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



  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info);
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
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
          <h1 style={{marginBottom:12}}>Header Upload</h1>
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="http://localhost:3025/upload"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}>
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