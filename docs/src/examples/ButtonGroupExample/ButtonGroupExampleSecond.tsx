import * as React from 'react';
import { ButtonGroup , Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonGroupExampleSecond = () => (
  <div className={styles.example}>
    <ButtonGroup segmented>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  </div>
);

export default ButtonGroupExampleSecond;
