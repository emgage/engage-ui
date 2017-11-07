import * as React from 'react';
import { Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LinkExampleSecond = () => (
  <div className={styles.example}>
    <Link
      url="http://www.lipsum.com/"
      external
    >
      Link open with another tab
    </Link>
  </div>
);

export default LinkExampleSecond;
