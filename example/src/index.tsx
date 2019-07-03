import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import BaseTheme from '../../themes/Delicious/index';

const REACT_VERSION = React.version;

ReactDOM.render(
  // <BaseTheme>
    <div>
      <label>React Version: {REACT_VERSION}</label>
      <App />
    </div>
  // </BaseTheme>
  ,
  document.getElementById('root')
);
