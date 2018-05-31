import * as React from 'react';
import { Choice } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ChoiceExample = () => (
  <div className={styles.example}>
    <Choice customId="MyChoice" label="ChoiceLabel" helpText="This is Choice Component."/>
  </div>
);

export default ChoiceExample;
