/// <reference path="../../@types/rc-form.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactPerfTool from 'react-perf-tool';
import * as Perf from 'react-addons-perf';
import App from './App';
import BaseTheme from '../../themes/Delicious/index';

ReactDOM.render(
  <BaseTheme>
    <div>
      <App />
      <ReactPerfTool perf={Perf} />
    </div>
  </BaseTheme>,
  document.getElementById('root'),
);
