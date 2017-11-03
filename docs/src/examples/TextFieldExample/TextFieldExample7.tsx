import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample7 = () => (
  <div className={styles.example}>
        <TextField
          label="Price"
          type="number"
          prefix="$"
        />
      </div>
);

export default TextFieldExample7;
