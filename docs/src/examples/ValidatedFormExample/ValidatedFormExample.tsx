import * as React from 'react';
import { ValidatedForm, FormLayout, ValidatedTextField, Button, ButtonGroup } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidatedFormExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
      <FormLayout>
        <ValidatedTextField
          type="text"
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
        />
        <ValidatedTextField
          type="text"
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
        />
        <ButtonGroup>
          <Button submit primary>Submit</Button>
        </ButtonGroup>
      </FormLayout>
    </ValidatedForm>
  </div>
);

export default ValidatedFormExample;
