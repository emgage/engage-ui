import * as React from 'react';
import { Label } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelExampleFirst = () => (
  <div className={styles.example}>
    <Label
      componentId="lblid"
      hidden={false}
      required={false}
      focused={false}
      hasValue={false}
    >
        Test
      </Label>
  </div>
);

export default LabelExampleFirst;
