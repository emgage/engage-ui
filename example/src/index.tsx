import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactPerfTool from 'react-perf-tool';
import App from './App';
import BaseTheme from '../../themes/Delicious/index';

const Perf = require('react-addons-perf');

ReactDOM.render(
  <BaseTheme>
    <div>
      <App />
       <ReactPerfTool perf={Perf} /> 
    </div>
  </BaseTheme>,
  document.getElementById('root'),
);
