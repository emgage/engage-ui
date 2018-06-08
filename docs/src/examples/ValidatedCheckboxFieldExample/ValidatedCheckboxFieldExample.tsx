import * as React from 'react';
import { ValidatedForm, ValidatedCheckboxField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidatedCheckboxFieldExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
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
    </ValidatedForm>
  </div>
);

export default ValidatedCheckboxFieldExample;
