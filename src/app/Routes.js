
import React from 'react';
import { Route, Switch, } from 'react-router-dom';

import Info from '../app/pages/Info';
import RankList from '../app/pages/RankList';
import RealSuatus from '../app/pages/RealStatus';

import QuesList from '../app/pages/QuesList';
import QueSubmit from '../app/pages/QueSubmit';
import QuesNote from '../app/pages/QuesNote';

import UserShow from '../app/pages/UserShow';
import UserConf from '../app/pages/UserConf';

import NoteList from '../app/pages/NoteList';
import QuesDet from '../app/pages/QuesDet';

import ContestList from '../app/pages/ContestList';
import ContestDet from '../app/pages/ContestDet';

import NoteEdit from '../app/pages/NoteEdit';



const MainView = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/info`} component={Info} />
    <Route path={`${match.url}/ques`} component={QuesView} />
    <Route path={`${match.url}/contest`} component={ContestView} />
    <Route path={`${match.url}/rank`} component={RankList} />
    <Route path={`${match.url}/status`} component={RealSuatus} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>
)

const UserView = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/:uid`} component={UserShow} />
    <Route path={`${match.url}/:uid/setting`} component={UserConf} />
    <Route path={`${match.url}/:uid/note`} component={NoteList} />
    <Route path={`${match.url}/:uid/note/:nid`} component={QuesNote} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>
)

const ContestView = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={ContestList} />
    <Route exact path={`${match.url}/:cid`} component={ContestDet} />
    <Route exact path={`${match.url}/:cid/:qid`} component={QuesDet} />
    <Route path={`${match.url}/:cid/:qid/submit`} component={QueSubmit} />
    <Route path={`${match.url}/:cid/:qid/note`} component={NoteList} />
    <Route path={`${match.url}/:cid/:qid/note/:nid`} component={QuesNote} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>
)

const QuesView = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/noteEdit`} component={NoteEdit} />
    <Route exact path={`${match.url}/`} component={QuesList} />
    <Route exact path={`${match.url}/:oj/:id`} component={QuesDet} />
    <Route path={`${match.url}/:oj/:id/submit`} component={QueSubmit} />
    <Route path={`${match.url}/:oj/:id/note`} component={NoteList} />
    <Route path={`${match.url}/:oj/:id/note/:nid`} component={QuesNote} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>
)

const Welcome = () => (<h1>Welcome to Virtual Judge</h1>)

const Routes = (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/main" component={MainView} />
    <Route path="/user" component={UserView} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>
);

export default Routes;