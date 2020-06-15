import * as React from 'react';
import { ChoiceList } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ChoiceListExample = () => (
  <div className={styles.example}>
    <ChoiceList
      componentTitle="Company name"
      allowMultiple
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
      selected={['optional', 'required']}
      titleHidden={false}
      horizontal={false}
    />
  </div>
);

export default ChoiceListExample;
