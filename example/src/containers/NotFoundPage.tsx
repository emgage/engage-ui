import * as React from 'react';
import { Link } from 'react-router';

// tslint:disable-next-line:variable-name
const NotFoundPage = () => (
  <div className="component-container">
    <h1>404 Page Not Found</h1>
    <Link to="/">Go back to homepage</Link>
  </div>
);

export default NotFoundPage;
