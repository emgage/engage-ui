/// <reference path="../../@types/rc-form.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as ReactPerfTool from 'react-perf-tool';
// import * as Perf from 'react-addons-perf';
import { LayoutProvider } from 'react-page-layout';
import App from './App';
import BaseTheme from '../../themes/Delicious/index';
import DocumnentLayout from './layout/DocumentLayout';

const layouts = {
  docs: DocumnentLayout,
};

ReactDOM.render(
  <LayoutProvider layouts={layouts}>
    <BaseTheme>
      <div>
        <App />
        {/* <ReactPerfTool perf={Perf} /> */}
      </div>
    </BaseTheme>
  </LayoutProvider>,
  document.getElementById('root'),
);
