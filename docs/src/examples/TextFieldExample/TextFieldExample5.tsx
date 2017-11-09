import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample5 = () => (
  <div className={styles.example}>
    <TextField
      label="Zone name"
      labelAction={{ content: 'Look up codes' }}
    />
  </div>
);

export default TextFieldExample5;
