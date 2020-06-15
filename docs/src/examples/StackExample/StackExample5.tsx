import * as React from 'react';
import { Stack, Badge, Heading } from '../../../../src/components/';
import Item from '../../../../src/components/Stack/Item';
import * as styles from '../../styles/components-page.scss';

const StackExample5 = () => (
  <div className={styles.example}>
    <br />
    <Stack vertical={false}>
      <Item fill>
        <Heading>Order #1136</Heading>
      </Item>
      <Item fill={false}>
        <Badge working={false} icon={false}>Paid</Badge>
      </Item>
      <Item fill={false}>
        <Badge working={false} icon={false}>Fulfilled</Badge>
      </Item>
    </Stack>
    <br />
  </div>
);

export default StackExample5;
