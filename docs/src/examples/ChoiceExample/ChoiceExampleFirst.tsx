import * as React from 'react';
import { Choice } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ChoiceExample = () => (
  <div className={styles.example}>
    <Choice
      componentId="MyChoice"
      label="ChoiceLabel"
      disabled={false}
      labelHidden={false}
    />
  </div>
);

export default ChoiceExample;
