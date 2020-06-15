import * as React from 'react';
import { Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const BadgeExample = () => (
  <div className={styles.example}>
    <Badge
      status="info"
      working={false}
      icon={false}
    >
      Badge Example 3
    </Badge>
  </div>
);

export default BadgeExample;
