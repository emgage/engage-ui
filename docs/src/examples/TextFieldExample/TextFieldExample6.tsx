import * as React from 'react';
import { TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample6 = () => (
  <div className={styles.example}>
    <TextField
      label="Account email"
      type="email"
      helpText="We’ll use this address if we need to contact you about your account."
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

export default TextFieldExample6;
