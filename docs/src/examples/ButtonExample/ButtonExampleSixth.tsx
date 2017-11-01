import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button size="large" disclosure={true}>Large Button</Button>
  </div>
);

export default ButtonExample;
