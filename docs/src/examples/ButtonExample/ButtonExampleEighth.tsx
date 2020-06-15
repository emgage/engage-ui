import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button
      disabled
      disclosure={false}
      destructive={false}
      external={false}
      fullWidth={false}
      outline={false}
      primary={false}
      submit={false}
      plain={false}
    >
      Disabled Button
    </Button>
  </div>
);

export default ButtonExample;
