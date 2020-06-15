import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button
      fullWidth
      disabled={false}
      disclosure={false}
      destructive={false}
      external={false}
      outline={false}
      primary={false}
      submit={false}
      plain={false}
    >
      FullWidth Button
    </Button>
  </div>
);

export default ButtonExample;
