import * as React from 'react';
import { ButtonGroup , Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonGroupExampleSecond = () => (
  <div className={styles.example}>
    <ButtonGroup segmented>
      <Button
        disabled={false}
        disclosure={false}
        destructive={false}
        external={false}
        fullWidth={false}
        outline={false}
        primary={false}
        submit={false}
        plain={false}
      >
        Button 1
      </Button>
      <Button
        disabled={false}
        disclosure={false}
        destructive={false}
        external={false}
        fullWidth={false}
        outline={false}
        primary={false}
        submit={false}
        plain={false}
      >
        Button 2
      </Button>
    </ButtonGroup>
  </div>
);

export default ButtonGroupExampleSecond;
