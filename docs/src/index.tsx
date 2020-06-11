import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Routes from './Routes';

import { history, configureStore } from './store/configureStore';

require('../assets/favicon.ico');

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);
