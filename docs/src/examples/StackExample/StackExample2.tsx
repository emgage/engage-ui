import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample2 = () => (
  <div className={styles.example}>
    <br />
    <Stack alignment="center">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Test</Badge>
    </Stack>
    <br />
  </div>
);

export default StackExample2;
