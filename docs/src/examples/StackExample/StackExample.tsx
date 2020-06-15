import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample = () => (
  <div className={styles.example}>
    <br />
    <br />
    <Stack vertical={false}>
      <Badge working={false} icon={false}>Paid</Badge>
      <Badge working={false} icon={false}>Fulfilled</Badge>
    </Stack>
  </div>
);

export default StackExample;
