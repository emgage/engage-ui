import * as React from 'react';
import { Checkbox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CheckBoxExample = () => (
  <div className={styles.example}>
    <Checkbox
      label="Default"
      disabled={false}
      labelHidden={false}
    />
  </div>
);

export default CheckBoxExample;
