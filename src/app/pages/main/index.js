import React from 'react';
import { Row, Col, Carousel } from 'antd';
import img from '../../assert/logo.svg';
import img2 from '../../assert/2.png';
import img3 from '../../assert/160.jpg';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Row>
          <Col style={{ fontSize: 16 }}>Announcement</Col>
        </Row>
        <hr className="markdown-hr" />
        <Carousel
          autoplay
          autoplaySpeed={2500}>
          <div><img src={img} alt="alt" /></div>
          <div><img src={img2} alt="alt" /></div>
          <div><img src={img3} alt="alt" /></div>
          <div><img src={img2} alt="alt" /></div>
        </Carousel>
        <br />
        <p style={{ textAlign: 'center' }}>welcome to my website,it designed by Ant Design</p>
      </div>
    );
  }
}

export default App;