import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample9 = () => (
  <div className={styles.example}>
    <TextField errors={['This field is mandatory.']} label="TextField" />
  </div>
);

export default TextFieldExample9;
