import * as React from 'react';
import { NavLink } from 'react-router-dom';

import * as styles from '../styles/global-styles.scss';

// tslint:disable-next-line:variable-name
const NotFoundPage = () => (
  <div className={styles.component_container}>
    <h1>404 Page Not Found</h1>
    <NavLink to="/">Go back to homepage</NavLink>
  </div>
);

export default NotFoundPage;
