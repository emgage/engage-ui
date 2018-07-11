import * as React from 'react';
import { ComboBox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class ComboBoxExampleSecond extends React.Component<never, never> {
  render() {
    const items = [
      {
        key: 'name',
        value: [
          {
            name: 'item1',
            value: '10'
          },
          {
            name: 'item2',
            value: '20'
          },
          {
            name: 'item3',
            value: '20'
          },
          {
            name: 'item4',
            value: '20'
          }
        ]
      }
    ];
    return (
      <div className={styles.example}>
        <ComboBox
            label="Select"
            items = {items}
        />
      </div>
    );
  }
}

export default ComboBoxExampleSecond;
