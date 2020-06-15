import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleSecond = () => (
  <div className={styles.example}>
      <RadioButton name="gender" label="Male" labelHidden={false} disabled={false} checked={false} />
      <RadioButton name="gender" label="Female" labelHidden={false} disabled={false} checked={false} />
  </div>
);

export default RadioButtonExampleSecond;
