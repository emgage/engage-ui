import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelledExampleThird = () => (
  <div className={styles.example}>
    <Labelled
        componentId="Id"
        label="Labelled hidden"
        action={{ content: 'Click Here', onAction:() => { alert('You have performed Click Action.'); } }}
        labelHidden
        autoSuggest={false}
        hasValue={false}
        disabled={false}
        required={false}
        focused={false}
    />
  </div>
);

export default LabelledExampleThird;
