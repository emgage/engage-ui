import * as React from 'react';
import { Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const SelectExample = () => (
  <div className={styles.example}>
    <Select
      label="City"
      options={[
        'New York',
        'New Jersey',
        'Washigton DC',
      ]}
      placeholder="Select"
      customValue="New York"
      helpText="Please Select City"
      customId="SelectId"
      customName="Select Name"
    />
  </div>
);

export default SelectExample;
