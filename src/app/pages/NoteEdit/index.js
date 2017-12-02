import React from 'react';
// import { Link } from 'react-router-dom';


import EditForm from './components/EditForm';

import './index.css';

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);


    this.info = props.location.state;
    console.log(this.info)
    if (this.info) {
      if (this.info.p2) { //p2 != undefined
        //个人写
        console.log(`你要写：oj:${this.info.p1},id:${this.info.p2}`);
      } else {
        console.log(`你好，${this.info.p1}`);
      }
    } else {
      console.log(`你没有访问权限。`)
    }
  }

  render() {
    return (
      <div className="noteEdit-cont">
        <EditForm />
        <br />
        <div style={{ textAlign: 'center' }}></div>
      </div>
    );
  }

}

export default NoteEdit;