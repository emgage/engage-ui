import * as React from 'react';
import { Label } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelExampleSecond = () => (
  <div className={styles.example}>
    <Label
      customId="lblid"
      hidden={false}
      action={{ content: 'Click Here', onAction:() => {alert('You have performed Click Action.');} }}
      required focused hasValue >
        Testing Label
    </Label>
</div>
);

export default LabelExampleSecond;
