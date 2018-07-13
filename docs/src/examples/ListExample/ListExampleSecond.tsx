import * as React from 'react';
import { List, Item } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ListExampleSecond = () => (
  <div className={styles.example}>
    <List componentType="number">
        <Item>Yellow shirt</Item>
        <Item>Red shirt</Item>
        <Item>Green shirt</Item>
    </List>
  </div>
);

export default ListExampleSecond;
