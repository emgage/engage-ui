import * as React from 'react';
import { Link, IndexLink } from 'react-router';

import * as styles from '../../styles/nav.scss';

// tslint:disable-next-line:variable-name
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <h1>Components</h1>
      <ul>
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/component/choicelist" className={styles.active}>Choice List Component</Link></li>
        <li><Link to="/component/panel">Panel Component</Link></li>
        <li><Link to="/component/Image">Image Component</Link></li>
        <li><Link to="/component/labelled">Labelled Component</Link></li>
        <li><Link to="/component/positionedoverlay">Positioned Overlay Component</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
