
import React from 'react';
import { Route, Switch, } from 'react-router-dom';

import Exam from '../app/pages/Exam';
import Info from '../app/pages/Info';
import RankList from '../app/pages/RankList';
import QuesList from '../app/pages/QuesList';
import QuesDet from '../app/pages/QuesDet';
import QueSubmit from '../app/pages/QueSubmit';
import QuesNote from '../app/pages/QuesNote';

const MainView = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/info`} component={Info} />
    <Route path={`${match.url}/ques`} component={QuesView} />
    <Route path={`${match.url}/exam`} component={Exam} />
    <Route path={`${match.url}/rank`} component={RankList} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>
)

const QuesView = ({ match }) =>(
  <Switch>
    <Route exact path={`${match.url}/`} component={QuesList} />
    <Route exact path={`${match.url}/:id`} component={QuesDet} />
    <Route path={`${match.url}/submit/:id`} component={QueSubmit} />
    <Route path={`${match.url}/note/:id`} component={QuesNote} />
  </Switch>
)

const Welcome = () => (<h1>Welcome to Virtual Judge</h1>)

const Routes = (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/main" component={MainView} />
    <Route component={() => <h1>Request Err</h1>} />
  </Switch>

);

export default Routes;