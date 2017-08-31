import * as React from 'react';
import { Link } from 'react-router';

import * as styles from '../styles/global-styles.scss';

// tslint:disable-next-line:variable-name
const NotFoundPage = () => (
  <div className={styles.component_container}>
    <h1>404 Page Not Found</h1>
    <Link to="/">Go back to homepage</Link>
  </div>
);

export default NotFoundPage;
