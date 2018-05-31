import * as React from 'react';
import { Checkbox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CheckBoxExample = () => (
  <div className={styles.example}>
    <Checkbox
      label="With error"
      customName="checkbox"
      customValue="Some value"
      error="Some error"
    />
  </div>
);

export default CheckBoxExample;
