import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample = () => (
  <div className={styles.example}>
    <br />
    <br />
    <Stack>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  </div>
);

export default StackExample;
