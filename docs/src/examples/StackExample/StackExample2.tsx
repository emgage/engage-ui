import * as React from 'react';
import { Stack, Badge } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const StackExample2 = () => (
  <div className={styles.example}>
    <br />
    <Stack alignment="center" vertical={false}>
      <Badge working={false} icon={false}>Paid</Badge>
      <Badge working={false} icon={false}>Fulfilled</Badge>
      <Badge working={false} icon={false}>Test</Badge>
    </Stack>
    <br />
  </div>
);

export default StackExample2;
