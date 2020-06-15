import * as React from 'react';
import { Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonExample = () => (
  <div className={styles.example}>
    <Button
      plain url = "http://www.lipsum.com/"
      external
      disabled={false}
      disclosure={false}
      destructive={false}
      fullWidth={false}
      outline={false}
      primary={false}
      submit={false}
    >
      Plain Button
    </Button>
  </div>
);

export default ButtonExample;
