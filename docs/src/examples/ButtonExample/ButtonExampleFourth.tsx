import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button
      destructive
      accessibilityLabel="No Label"
      disabled={false}
      disclosure={false}
      external={false}
      fullWidth={false}
      outline={false}
      primary={false}
      submit={false}
      plain={false}
    >
      Destructive Button
    </Button>
  </div>
);

export default ButtonExample;
