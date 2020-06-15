import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelledExampleFirst = () => (
  <div className={styles.example}>
    <Labelled
      componentId="lblid"
      label="Test"
      action={{ content: 'Click Here', onAction:() => { alert('You have performed Click Action.'); } }}
      autoSuggest={false}
      hasValue={false}
      disabled={false}
      required={false}
      labelHidden={false}
      focused={false}
    />
  </div>
);

export default LabelledExampleFirst;
