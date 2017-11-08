import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from './Routes';
import configureStore from './store/configureStore';

require('../assets/favicon.ico');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={Routes} />
  </Provider>,
  document.getElementById('app')
);
