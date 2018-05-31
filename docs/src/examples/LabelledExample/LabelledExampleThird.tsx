import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelledExampleThird = () => (
  <div className={styles.example}>
    <Labelled
        customId="Id"
        label="Labelled hidden"
        action={{ content: 'Click Here', onAction:() => {alert('You have performed Click Action.');} }}
        labelHidden
    />
  </div>
);

export default LabelledExampleThird;
