import * as React from 'react';
import { ChoiceList } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ChoiceListExample = () => (
  <div className={styles.example}>
    <ChoiceList
      componentTitle="Company name"
      choices={[
        {
          label: 'Hidden',
          value: 'hidden',
        }, {
          label: 'Optional',
          value: 'optional',
        }, {
          label: 'Required',
          value: 'required',
        },
      ]}
      selected={['required']}
      horizontal
      helpText="Allow recipient to dismiss a message from their notifications."
      titleHidden={false}
      allowMultiple={false}
    />
  </div>
);

export default ChoiceListExample;
