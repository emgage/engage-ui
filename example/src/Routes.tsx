import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './ui/Home';
import NotFound from './ui/NotFound';
import Components from './Components';

export default() => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/components/" component={Components}/>
    <Route component={NotFound}/>
  </Switch>
);
