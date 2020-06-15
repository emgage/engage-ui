import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample4 = () => (
  <div className={styles.example}>
    <br />
    <Stack vertical>
      <Badge working={false} icon={false}>Paid</Badge>
      <Badge working={false} icon={false}>Fulfilled</Badge>
    </Stack>
    <br />
  </div>
);

export default StackExample4;
