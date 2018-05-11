import * as React from 'react';
import { ValidatedForm, FormLayout, ValidatedTextField, ValidatedCheckboxField, ValidatedRadioField, Button, ButtonGroup } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidatedFormExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
      <FormLayout>
        <ValidatedTextField
          id="AppName"
          required={true}
          name="App Name"
          value=""
          label="App Name"
          helpText="We recommend keeping your app name under 23 characters."
          validateTrigger={['onBlur']}
          validateRules={[
            { required: true, message: 'App Name is required.' },
          ]}
        />
        <ValidatedTextField
          multiline
          id="appDescription"
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
        <ValidatedCheckboxField
            id="appTerms"
            required
            name="I agree to terms and conditions"
            value=""
            checked={false}
            label="I agree to terms and conditions"
            validateTrigger={['onBlur']}
            validateRules={[
              { required: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.' },
            ]}
        /> 
        <ValidatedRadioField
            id="appStatus"
            required
            name="Publish App"
            value=""
            checked={false}
            label="Publish App"
            validateTrigger={['onBlur']}
            validateRules={[
              { required: true, message: 'Publish App is required.' },
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
