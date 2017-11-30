import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './app/reducers'

import App from './app';
import registerServiceWorker from './registerServiceWorker';
import { loadState } from './app/utils/localStorage'

let initState = loadState();
let store = createStore(reducers, initState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
