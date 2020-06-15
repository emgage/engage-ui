import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleFirst = () => (
  <div className={styles.example}>
      <RadioButton name="companyname" label="Hidden" checked labelHidden={false} disabled={false} />
      <RadioButton name="companyname" label="Optional" labelHidden={false} disabled={false} checked={false} />
      <RadioButton name="companyname" label="Required" labelHidden={false} disabled={false} checked={false} />
  </div>
);

export default RadioButtonExampleFirst;
