import * as React from 'react';
import Nav from '../components/Nav';

export interface IProps {
  children?: React.ReactNode;
}

// tslint:disable-next-line:variable-name
const App = (props: IProps) => (
    <div className="app-container">
      <Nav />
      {props.children}
    </div>
);
  
export default App;
