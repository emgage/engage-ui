import * as React from 'react';
import { TextField, ChoiceList, FormLayout, Select } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const TextFieldExample3 = () => (
  <div className={styles.example}>
    <FormLayout>
      <ChoiceList
        componentTitle="Gift card auto-expiration"
        choices={[
          {
            label: 'Gift cards never expire',
            value: 'no',
          },
          {
            label: 'Gift cards expire',
            value: 'yes',
          },
        ]}
        selected={['yes']}
        allowMultiple={false}
        horizontal={false}
        titleHidden={false}
      />
      <TextField
        label="Gift cards expire after"
        labelHidden
        value="12"
        connectedRight={<Select label="Unit of time" labelHidden options={['months after purchase']} loading={false} disabled={false} required={false} />}
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

export default TextFieldExample3;
