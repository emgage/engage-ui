import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample4 = () => (
  <div className={styles.example}>
    <br />
    <Stack vertical>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
    <br />
  </div>
);

export default StackExample4;
