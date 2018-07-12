import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample6 = () => (
  <div className={styles.example}>
    <TextField
      label="Account email"
      type="email"
      helpText="We’ll use this address if we need to contact you about your account."
    />
  </div>
);

export default TextFieldExample6;
