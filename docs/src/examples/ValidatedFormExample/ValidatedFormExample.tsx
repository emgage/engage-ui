import * as React from 'react';
import { ValidatedForm, FormLayout, ValidatedTextField, Button, ButtonGroup } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidatedFormExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
      <FormLayout>
        <ValidatedTextField
          customId="AppName"
          required={true}
          label="App Name"
          helpText="We recommend keeping your app name under 23 characters."
          customValue=""
          customName="App Name"
          validateTrigger={['onBlur']}
          validateRules={[
            { required: true, message: 'App Name is required.' },
          ]}
        />
        <ValidatedTextField
          multiline
          customId="appDescription"
          required={true}
          customName="App Description"
          customValue=""
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
