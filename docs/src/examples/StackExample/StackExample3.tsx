import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample3 = () => (
  <div className={styles.example}>
    <br />
    <Stack distribution="equalSpacing" vertical={false}>
      <Badge working={false} icon={false}>Paid</Badge>
      <Badge working={false} icon={false}>Fulfilled</Badge>
    </Stack>
    <br />
  </div>
);

export default StackExample3;
