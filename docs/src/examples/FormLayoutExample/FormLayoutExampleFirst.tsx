import * as React from 'react';
import { FormLayout , TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const FormLayoutExampleFirst = () => (
  <div className={styles.example}>
    <FormLayout>
      <TextField
        label="Store name"
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
      <TextField
        type ="email"
        label="Account email"
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
    </FormLayout>
  </div>
);

export default FormLayoutExampleFirst;
