import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample = () => (
  <div className={styles.example}>
    <TextField
      type="text"
      label="TextField Label"
    />
  </div>
);

export default TextFieldExample;
