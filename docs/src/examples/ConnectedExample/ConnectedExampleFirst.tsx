import * as React from 'react';
import { Connected, TextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ConnectedExample = () => (
  <div className={styles.example}>
    <Connected
      left = {
        <TextField
          label="TextField Left"
          value="Some value"
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
      }
    >
    </Connected>
  </div>
);

export default ConnectedExample;
