import * as React from 'react';
import { ValidatedForm, ValidatedTextField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidateTextFieldExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
      <ValidatedTextField
        customId="AppName"
        required={true}
        label="App Name"
        placeholder=""
        helpText="We recommend keeping app name less then 25 characters."
        customName="App Name"
        customValue=""
        validateTrigger={['onBlur']}
        validateRules={[{ required: true, message: 'App Name is required.' },
        ]}
      />
      <ValidatedTextField
        customId="AppDescription"
        required={true}
        label="App Description"
        placeholder=""
        helpText="We recommend keeping app description less then 256 characters."
        customName="App Description"
        customValue=""
        validateTrigger={['onBlur']}
        validateRules={[{ required: true, message: 'App Description is required.' }]}
        multiline
      />
    </ValidatedForm>
  </div>
);

export default ValidateTextFieldExample;
