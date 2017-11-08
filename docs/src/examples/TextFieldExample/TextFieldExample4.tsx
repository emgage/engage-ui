import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample4 = () => (
  <div className={styles.example}>
    <TextField
      label="Zone name"
      placeholder="e.g. North America, Europe"
    />
  </div>
);

export default TextFieldExample4;
