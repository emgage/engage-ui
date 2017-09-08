import * as React from 'react';
import Nav from '../components/Nav';

// tslint:disable-next-line:import-name
import * as styles from '../styles/global-styles.scss';

export interface IProps {
  children?: React.ReactNode;
}

// tslint:disable-next-line:variable-name
const App = (props: IProps) => (
    <div className={styles.app_container}>
      <Nav />
      {props.children}
    </div>
);

export default App;
