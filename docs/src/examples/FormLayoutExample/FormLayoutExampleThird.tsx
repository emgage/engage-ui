import * as React from 'react';
import { FormLayout , TextField } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
import * as styles from '../../styles/components-page.scss';

const FormLayoutExampleThird = () => (
  <div className={styles.example}>
    <FormLayout>
      <Group condensed>
        <TextField type="text" label="Length" />
        <TextField type="text" label="Width" />
        <TextField type="text" label="Height" />
        <TextField type="text" label="Unit" />
      </Group>
    </FormLayout>
</div>
);

export default FormLayoutExampleThird;
