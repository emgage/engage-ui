import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelledExampleFirst = () => (
  <div className={styles.example}>
    <Labelled
      componentId="lblid"
      label="Test"
      action={{ content: 'Click Here', onAction:() => { alert('You have performed Click Action.'); } }}
    />
  </div>
);

export default LabelledExampleFirst;
