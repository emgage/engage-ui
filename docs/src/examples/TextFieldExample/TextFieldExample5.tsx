import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample5 = () => (
  <div className={styles.example}>
    <TextField
      label="Zone name"
      labelAction={{ content: 'Look up codes' }}
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

export default TextFieldExample5;
