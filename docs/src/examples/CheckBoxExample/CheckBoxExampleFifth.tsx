import * as React from 'react';
import { Checkbox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CheckBoxExample = () => (
  <div className={styles.example}>
    <Checkbox
      label="With error"
      name="checkbox"
      value="Some value"
      error="Some error"
      disabled={false}
      labelHidden={false}
    />
  </div>
);

export default CheckBoxExample;
