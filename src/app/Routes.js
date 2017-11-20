
import React from 'react';
import { Route, Switch, } from 'react-router-dom';

import Nav from '../components/Nav';

import App from './pages/main';
import antdTest from './pages/antdTest';
import discuss from './pages/discuss';
import postDet from './pages/postDet';



const About = () => (
  <div>
    <h3>About</h3>
  </div>
)
const MainView = ({ match }) => (
  <Nav>
    <Route path={`${match.url}/about`} component={About} />
    <Route path={`${match.url}/discuss`} component={discuss} />
    <Route path={`${match.url}/antdTest`} component={antdTest} />
    <Route path={`${match.url}/detail/:postId`} component={postDet} />
  </Nav>
)

const Routes = (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/main" component={MainView} />
    <Route component={() => <span>Err</span>} />
  </Switch>

);

export default Routes;