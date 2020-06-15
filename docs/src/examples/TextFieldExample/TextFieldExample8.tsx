import * as React from 'react';
import { TextField, Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample8 = () => (
  <div className={styles.example}>
    <TextField
      label="Weight"
      type="number"
      connectedRight={
        <Select
          label="Weight unit"
          labelHidden options={[
            'kg',
            'lb',
          ]}
          loading={false}
          disabled={false}
          required={false}
        />
      }
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

export default TextFieldExample8;
