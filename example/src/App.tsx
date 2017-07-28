import * as React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './routes';
import Nav from './ui/Nav';
import * as style from './ui/example.scss';

interface State {
  appName?: string,
  appDescription: string,
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      appName: '',
      appDescription: '',
    };
  }

  render() {
      return (
      <Router>
        <div className={style.Wrapper}>
          <Nav />
          <div className={style.Content}>
          <h1>Example Page will have NAV, Sidebar, main content.</h1>
          
          <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
