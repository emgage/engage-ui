import * as React from 'react';
import { Type, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample1 = () => (
  <div className={styles.example}>
    <TextField
      label=""
      type={Type.Number}
      value="1"
    />
  </div>
);

export default TextFieldExample1;
