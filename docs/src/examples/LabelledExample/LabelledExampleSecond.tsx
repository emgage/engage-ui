import * as React from 'react';
import { Labelled  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const LabelledExampleSecond = () => (
  <div className={styles.example}>
    <Labelled
      componentId="Id"
      label="Testing labelled"
      action={{ content: 'Click Here', onAction:() => { alert('You have performed Click Action.'); } }}
      required={false}
      helpText="HelpText"
      autoSuggest={false}
      hasValue={false}
      disabled={false}
      labelHidden={false}
      focused={false}
    />
  </div>
);

export default LabelledExampleSecond;
