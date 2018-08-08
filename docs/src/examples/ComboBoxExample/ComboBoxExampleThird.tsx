import * as React from 'react';
import { ComboBox, ComboBoxItemType } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class ComboBoxExampleThird extends React.Component<never, never> {
  render() {
    const items = [
      {
        key: 'name',
        type: 'Accordian' as ComboBoxItemType,
        value: [{
          header: 'Item 1',
          children: [{
            name: 'subItem1',
            value: '10'
          },
            {
              name: 'subItem2',
              age: '20'
            }]
        }]
      },
      {
        key: 'name',
        value: [
          {
            name: 'item1'
          },
          {
            name: 'item2'
          }
        ]
      }
    ];
    return (
      <div className={styles.example}>
        <ComboBox
            label="Select"
            items={items}
        />
      </div>
    );
  }
}

export default ComboBoxExampleThird;
