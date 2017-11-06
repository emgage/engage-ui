import * as React from 'react';
import { Type, TextField, Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample8 = () => (
  <div className={styles.example}>
    <TextField
      label="Weight"
      type={Type.Number}
      connectedRight={<Select label="Weight unit" labelHidden options={[
        'kg',
        'lb',
      ]} />}
    />
  </div>
);

export default TextFieldExample8;
