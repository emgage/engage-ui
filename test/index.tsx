import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@friendsofreactjs/react-css-themr';
import { DeliciousThemeContext } from '../themes/Delicious/index';
import HeaderComponent from './HeaderComponent';

// const REACT_VERSION = React.version;

ReactDOM.render(
  <ThemeProvider theme={DeliciousThemeContext}>
    <div>
      <HeaderComponent isLoggedIn={true} />
      <App />
    </div>
  </ThemeProvider>
  ,
  document.getElementById('app-root')
);
