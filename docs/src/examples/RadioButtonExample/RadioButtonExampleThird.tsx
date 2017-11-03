import * as React from 'react';
import { RadioButton } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const RadioButtonExampleThird = () => (
    <div className={styles.example}>
        <RadioButton
          label="Accounts are disabled"
          helpText="Customers will only be able to check out as guests"
          checked id="Radioid"
          name="Radioname"
          value="Test"
          disabled
          labelHidden/>
    </div>
);

export default RadioButtonExampleThird;
