import * as React from 'react';
import { Type, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample7 = () => (
  <div className={styles.example}>
    <TextField
      label="Price"
      type={Type.Number}
      prefix="$"
    />
  </div>
);

export default TextFieldExample7;
