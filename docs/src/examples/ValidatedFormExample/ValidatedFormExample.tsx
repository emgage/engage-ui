import * as React from 'react';
import { ValidatedForm, FormLayout, ValidatedTextField, Button, ButtonGroup } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidatedFormExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
      <FormLayout>
        <ValidatedTextField
          componentId="AppName"
          required={true}
          label="App Name"
          helpText="We recommend keeping your app name under 23 characters."
          value=""
          name="App Name"
          validateTrigger={['onBlur']}
          validateRules={[
            { required: true, message: 'App Name is required.' },
          ]}
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
          resizable={false}
          showNumberIcon={false}
          spellCheck={false}
        />
        <ValidatedTextField
          multiline
          componentId="appDescription"
          required={true}
          name="App Description"
          value=""
          label="App Description"
          helpText="Provide an engaging description that highlights the features and functionality of your app."
          validateTrigger={['onBlur']}
          validateRules={[
            { required: true, message: 'App Description is required.' },
          ]}
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
          resizable={false}
          showNumberIcon={false}
          spellCheck={false}
        />
        <ButtonGroup segmented={false}>
          <Button
            submit
            primary
            disabled={false}
            destructive={false}
            disclosure={false}
            external={false}
            fullWidth={false}
            outline={false}
            plain={false}
          >
            Submit
          </Button>
        </ButtonGroup>
      </FormLayout>
    </ValidatedForm>
  </div>
);

export default ValidatedFormExample;
