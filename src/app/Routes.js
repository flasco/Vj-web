
import React from 'react';
import { Route, Switch, } from 'react-router-dom';



import main from '../app/pages/main';
import Exam from '../app/pages/Exam';
import Info from '../app/pages/Info';
import QuesList from '../app/pages/QuesList';
import RankList from '../app/pages/RankList';
import QuesDet from '../app/pages/QuesDet';



const About = () => (
  <div>
    <h3>About</h3>
  </div>
)
const MainView = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/info`} component={Info} />
    <Route exact path={`${match.url}/ques`} component={QuesList} />
    <Route path={`${match.url}/ques/:id`} component={QuesDet} />
    <Route path={`${match.url}/exam`} component={Exam} />
    <Route path={`${match.url}/rank`} component={RankList} />
    <Route component={() => <h1>Request Err</h1>} />
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