import * as React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import ComponentsPage from './containers/ComponentsPage';
import NotFoundPage from './containers/NotFoundPage';

export default () => (
  <App>
    <Route exact path="/" component={HomePage} />
    <Route path="/component/:component" component={ComponentsPage} />
    <Route path="*" component={NotFoundPage}/>
  </App>
);
