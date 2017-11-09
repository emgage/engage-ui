import * as React from 'react';
import { Caption , List, Item } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CaptionExample = () => (
  <div className={styles.example}>
    <List type="bullet">
      <Item>Yellow shirt<Caption>Received</Caption></Item>
      <Item>Red shirt<Caption>Not Received</Caption></Item>
      <Item>Green shirt<Caption>Received</Caption></Item>
    </List>
  </div>
);

export default CaptionExample;
