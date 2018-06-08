import * as React from 'react';
import { ValidatedForm, ValidatedRadioField } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ValidatedRadioFieldExample = () => (
  <div className={styles.example}>
    <ValidatedForm>
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
    </ValidatedForm>
  </div>
);

export default ValidatedRadioFieldExample;
