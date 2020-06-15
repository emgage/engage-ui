import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button
      primary
      disabled={false}
      disclosure={false}
      destructive={false}
      external={false}
      fullWidth={false}
      outline={false}
      submit={false}
      plain={false}
    >
      Primary Button
    </Button>
  </div>
);

export default ButtonExample;
