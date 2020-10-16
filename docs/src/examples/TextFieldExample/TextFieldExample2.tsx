import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample2 = () => (
  <div className={styles.example}>
    <TextField
      type="text"
      label="Shipping address"
      multiline
    />
  </div>
);

export default TextFieldExample2;
