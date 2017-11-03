import * as React from 'react';
import { Choice } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ChoiceExample = () => (
  <div className={styles.example}>
    <Choice id="MyChoice" label="ChoiceLabel" error="test"/>
  </div>
);

export default ChoiceExample;
