import * as React from 'react';
import { Link } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LinkExampleThird = () => (
  <div className={styles.example}>
    <Link onClick={() => { alert('You clicked on link'); }} external={false}>
      Test Link
    </Link>
  </div>
);

export default LinkExampleThird;
