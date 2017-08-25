import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import * as styles from '../../styles/nav.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><h5>Components</h5></li>
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/component/choicelist" className={styles.active}>Choice List Component</Link></li>
        <li><Link to="/component/panel">Panel Component</Link></li>
        <li><Link to="/component/Scrollable">Scrollable Component</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
