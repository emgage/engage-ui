import * as React from 'react';
import { Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BadgeExample = () => (
  <div className={styles.example}>
    <Badge
      status="success"
    >
      Badge Example 2
    </Badge>
  </div>
);

export default BadgeExample;
