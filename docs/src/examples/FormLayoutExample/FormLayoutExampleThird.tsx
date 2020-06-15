import * as React from 'react';
import { FormLayout , TextField } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
import * as styles from '../../styles/components-page.scss';

const FormLayoutExampleThird = () => (
  <div className={styles.example}>
    <FormLayout>
      <Group condensed>
        <TextField
          label="Length"
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
          label="Width"
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
          label="Height"
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
          label="Unit"
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
      </Group>
    </FormLayout>
</div>
);

export default FormLayoutExampleThird;
