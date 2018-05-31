import * as React from 'react';
import { Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const SelectExample1 = () => (
  <div className={styles.example}>
    <Select
      label="City"
      options={[
        'New York',
        'New Jersey',
        'Washigton DC',
      ]}
      placeholder="Select"
      disabled
      customId="SelectId"
      customName="Select Name"
    />
  </div>
);

export default SelectExample1;

