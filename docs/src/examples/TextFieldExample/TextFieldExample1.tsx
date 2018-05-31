import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample1 = () => (
  <div className={styles.example}>
    <TextField
      label=""
      customType="number"
      customValue="1"
    />
  </div>
);

export default TextFieldExample1;
