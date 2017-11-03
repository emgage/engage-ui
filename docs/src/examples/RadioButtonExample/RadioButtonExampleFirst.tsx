import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleFirst = () => (
  <div className={styles.example}>
      <RadioButton label="Accounts are disabled" checked/>
  </div>
);

export default RadioButtonExampleFirst;
