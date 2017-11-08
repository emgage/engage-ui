import * as React from 'react';
import { Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LinkExampleFirst = () => (
  <div className={styles.example}>
    <Link url="http://www.lipsum.com/">
      Click on lipsum Link
    </Link>
  </div>
);

export default LinkExampleFirst;
