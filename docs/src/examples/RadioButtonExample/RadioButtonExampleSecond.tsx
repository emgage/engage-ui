import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleSecond = () => (
  <div className={styles.example}>
      <RadioButton customName="gender" label="Male" />
      <RadioButton customName="gender" label="Female" />
  </div>
);

export default RadioButtonExampleSecond;
