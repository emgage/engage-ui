/// <reference path="../../@types/rc-form.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactPerfTool from 'react-perf-tool';
import * as Perf from 'react-addons-perf';
import { ThemeProvider } from 'react-css-themr';
import App from './App';

const contextTheme = {
  PLink: require('./Link.scss'),
};

ReactDOM.render(
  <ThemeProvider theme={contextTheme}>
    <div>
      <App />
      <ReactPerfTool perf={Perf} />
    </div>
  </ThemeProvider>,
  document.getElementById('root'),
);
