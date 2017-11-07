import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleFirst = () => (
  <div className={styles.example}>
      <RadioButton name="companyname" label="Hidden" checked/>
      <RadioButton name="companyname" label="Optional" />
      <RadioButton name="companyname" label="Required" />
  </div>
);

export default RadioButtonExampleFirst;
