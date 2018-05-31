import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleFirst = () => (
  <div className={styles.example}>
      <RadioButton customName="companyname" label="Hidden" checked/>
      <RadioButton customName="companyname" label="Optional" />
      <RadioButton customName="companyname" label="Required" />
  </div>
);

export default RadioButtonExampleFirst;
