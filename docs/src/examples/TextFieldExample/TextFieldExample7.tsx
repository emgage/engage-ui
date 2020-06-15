import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample7 = () => (
  <div className={styles.example}>
    <TextField
      label="Price"
      type="number"
      prefix="$"
      alphanumeric={false}
      autoComplete={false}
      autoFocus={false}
      autoSuggest={false}
      backdropHidden={false}
      capital={false}
      disabled={false}
      enableTextCounter={false}
      hasValue={false}
      isFocused={false}
      itemSelected={false}
      labelHidden={false}
      loading={false}
      readOnly={false}
      required={false}
      resizable={false}
      showNumberIcon={false}
      spellCheck={false}
    />
  </div>
);

export default TextFieldExample7;
