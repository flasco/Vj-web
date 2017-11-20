import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav';

import Routes from './app/Routes';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  (<Router>
    <Nav>
      {Routes}
    </Nav>
  </Router>),
  document.getElementById('root')
);

registerServiceWorker();
