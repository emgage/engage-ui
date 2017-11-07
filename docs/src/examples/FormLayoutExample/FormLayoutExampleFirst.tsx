import * as React from 'react';
import { FormLayout , TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const FormLayoutExampleFirst = () => (
  <div className={styles.example}>
    <FormLayout>
      <TextField
        label="Store name"
      />
      <TextField
        type="email"
        label="Account email"
      />
    </FormLayout>
  </div>
);

export default FormLayoutExampleFirst;
