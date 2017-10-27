import * as React from 'react';
import { ChoiceList } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class ChoiceListExample extends React.Component {
  render() {
    return (
      <div className={styles.example}>
        <ChoiceList
          title="Company name"
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
          selected={['hidden']}/>
      </div>
    );
  }
}

export default ChoiceListExample;
