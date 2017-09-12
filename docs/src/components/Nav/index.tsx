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
        <li><Link to="/component/message">Message Component</Link></li>
        <li><Link to="/component/column">Column Component</Link></li>
        <li><Link to="/component/badge">Badge Component</Link></li>
        <li><Link to="/component/loading">Loading Component</Link></li>
        <li><Link to="/component/select">Select Component</Link></li>
        <li><Link to="/component/connected">Connected Component</Link></li>
        <li><Link to="/component/card">Card Component</Link></li>
        <li><Link to="/component/labelled">Labelled Component</Link></li>
        <li><Link to="/component/label">Label Component</Link></li>
        <li><Link to="/component/positionedoverlay">Positioned Overlay Component</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
