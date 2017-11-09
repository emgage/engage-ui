import * as React from 'react';
import { ButtonGroup , Button } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ButtonGroupExampleFirst = () => (
  <div className={styles.example}>
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  </div>
);

export default ButtonGroupExampleFirst;
