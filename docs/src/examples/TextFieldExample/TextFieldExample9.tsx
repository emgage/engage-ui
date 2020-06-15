import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample9 = () => (
  <div className={styles.example}>
    <TextField
      errors={['This field is mandatory.']}
      label="TextField"
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

export default TextFieldExample9;
