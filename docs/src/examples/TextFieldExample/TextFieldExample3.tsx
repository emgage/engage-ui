import * as React from 'react';
import { TextField, ChoiceList, FormLayout, Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample3 = () => (
  <div className={styles.example}>
    <FormLayout>
      <ChoiceList
        title="Gift card auto-expiration"
        choices={[
          {
            label: 'Gift cards never expire',
            value: 'no',
          },
          {
            label: 'Gift cards expire',
            value: 'yes',
          },
        ]}
        selected={['yes']}
      />
      <TextField
        label="Gift cards expire after"
        labelHidden
        value="12"
        connectedRight={<Select label="Unit of time" labelHidden options={['months after purchase']} />}
      />
    </FormLayout>
  </div>
);

export default TextFieldExample3;
