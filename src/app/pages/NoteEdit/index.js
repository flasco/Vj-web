import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNoteDet } from '../../services/note';

import EditForm from './components/EditForm';
import LoadingPage from '../../components/LoadingPage';
import NoPermisson from '../../components/NoPermisson';

import './index.css';

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      isLoading: true,
      isNoPermission: false,
    }

    this.info = props.location.state;
    console.log(this.info)
    if (this.info) {
      if (this.info.remoteId) { //p2 != undefined
        //个人写
        console.log(`你要写：oj:${this.info.remoteOj},id:${this.info.remoteId}`);
      } else {
        if (this.info.nid) {
          console.log('你要修改了！')
          this.fetchNote(this.info.nid);
        } else {
          console.log(`你好，${this.info.userId}`);
        }
      }
    }
    requestAnimationFrame(() => {
      this.setState({ isLoading: false })
    })
  }

  fetchNote = async (nid) => {
    if (nid === -1) {
      this.setState({ isLoading: false });
    } else {
      const data = await getNoteDet(nid);
      // console.log(data);
      this.setState({ data:data.obj, isLoading: false, isNoPermission: data.obj.userId !== this.props.userId });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingPage />
    }
    if (this.state.isNoPermission) {
      return <NoPermisson history={this.props.history} />
    }
    return (
      <EditForm data={this.state.data} userId={this.props.userId} nid={this.info.nid} history={this.props.history} />
    );
  }

}

function select(state) {
  return {
    userId: state.user.id,
    accountName: state.user.accountName,
  };
}

export default connect(select)(NoteEdit);