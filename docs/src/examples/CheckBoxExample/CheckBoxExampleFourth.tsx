import * as React from 'react';
import { Checkbox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CheckBoxExample = () => (
  <div className={styles.example}>
    <Checkbox
      label="With helpText "
      helpText="Some help"
      name="checkbox"
      value="Some value"
    />
  </div>
);

export default CheckBoxExample;
