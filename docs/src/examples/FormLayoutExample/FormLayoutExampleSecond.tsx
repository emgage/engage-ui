import * as React from 'react';
import { FormLayout, TextField } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
import * as styles from '../../styles/components-page.scss';

const FormLayoutExampleSecond = () => (
  <div className={styles.example}>
    <FormLayout>
      <Group condensed={false}>
        <TextField
          type="number"
          label="Minimum order"
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
          type="number"
          label="Maximum order"
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

export default FormLayoutExampleSecond;
