import React from 'react';
import { Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import LoadingPage from '../../components/LoadingPage';

import { getNoteDet } from '../../services/note';
import './index.css';

class QuesNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
    }
    this.nid = props.match.params.nid;
    this.getNote();
  }
  getNote = async () => {
    const data = await getNoteDet(this.nid);
    // console.log(data);
    this.setState({ data, isLoading: false })
  }
  render() {
    const { isLoading, data } = this.state;
    if (isLoading) {
      return <LoadingPage />
    }
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <h1>{data.title}</h1>
          <Row gutter={40} type="flex" justify="center">
            <Col span={4}><Icon type="user" style={{ marginRight: 4 }} /><span style={{ fontSize: 14 }}>{data.author}</span></Col>
            <Col span={4}><Icon type="pushpin-o" style={{ marginRight: 4 }} /><span style={{ fontSize: 14 }}>{`${data.remoteOj} - ${data.remoteId}`}</span></Col>
          </Row>
          <Link to={{ pathname: '/main/ques/noteEdit', state: { nid: this.nid } }} style={{ fontSize: '12pt' }}>Edit</Link>
        </div>
        <ReactMarkdown
          className="noteEdit-markdown"
          source={data.content}
          escapeHtml={false} />
        <div style={{ marginTop: 20, fontSize: '12pt', textAlign: 'center' }}>
          <Link to="../note" >Back</Link>
        </div>
      </div>
    );
  }

}

export default QuesNote;