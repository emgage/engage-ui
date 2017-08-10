import * as React from 'react';
import { Link, IndexLink } from 'react-router';

import * as styles from '../../styles/nav.scss';

// tslint:disable-next-line:variable-name
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/component/choicelist">Choice List Component</Link></li>
        <li><Link to="/component/panel">Panel Component</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
