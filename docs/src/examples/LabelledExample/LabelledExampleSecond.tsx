import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelledExampleSecond = () => (
  <div className={styles.example}>
    <Labelled
      customId="Id"
      label="Testing labelled"
      action={{ content: 'Click Here', onAction:() => {alert('You have performed Click Action.');} }}
      required={false}
      helpText="HelpText"
    />
  </div>
);

export default LabelledExampleSecond;
