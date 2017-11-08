import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample1 = () => (
  <div className={styles.example}>
    <br />
    <Stack spacing="tight">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
    <br />
  </div>
);

export default StackExample1;
