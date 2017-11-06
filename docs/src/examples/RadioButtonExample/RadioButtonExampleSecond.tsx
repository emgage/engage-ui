import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleSecond = () => (
  <div className={styles.example}>
      <RadioButton name="gender" label="Male" />
      <RadioButton name="gender" label="Female" />
  </div>
);

export default RadioButtonExampleSecond;
