import React from 'react';
// import { Link } from 'react-router-dom';

import { getNoteDet } from '../../services/note';

import EditForm from './components/EditForm';

import './index.css';

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    }

    this.info = props.location.state;
    console.log(this.info)
    if (this.info) {
      if (this.info.p2) { //p2 != undefined
        //个人写
        console.log(`你要写：oj:${this.info.p1},id:${this.info.p2}`);
      } else {
        if (this.info.nid) {
          console.log('你要修改了！')
          this.fetchNote(this.info.nid);
        } else {
          console.log(`你好，${this.info.p1}`);
        }
      }
    } else {
      console.log(`你没有访问权限。`)
    }
  }

  fetchNote = async (nid) => {
    const data = await getNoteDet(nid);
    console.log(data);
    this.setState({ data });
  }

  render() {
    return (
      <EditForm data={this.state.data} />
    );
  }

}

export default NoteEdit;