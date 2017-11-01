import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button destructive accessibilityLabel="No Label">Destructive Button</Button>
  </div>
);

export default ButtonExample;
