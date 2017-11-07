import * as React from 'react';
import { FormLayout, TextField } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
import * as styles from '../../styles/components-page.scss';

const FormLayoutExampleSecond = () => (
  <div className={styles.example}>
    <FormLayout>
      <Group>
        <TextField type="number" label="Minimum order" />
        <TextField type="number" label="Maximum order" />
      </Group>
    </FormLayout>
</div>
);

export default FormLayoutExampleSecond;
