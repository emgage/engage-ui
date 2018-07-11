import * as React from 'react';
import { ComboBox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class ComboBoxExampleFourth extends React.Component<never, never> {

  private renderItems = (item: any) => {
    return (
        <div style={{ clear: 'both', overflow: 'auto' }}>
            <div style={{ float: 'left', width: '30%' }}>
                <span>Name:</span>
                <span>{item.name}</span>
            </div>
            <div style={{ float: 'left', width: '30%' }}>
                <span>Value:</span>
                <span>{item.value}</span>
            </div>
        </div>);
  }

  render() {
    const items = [
      {
        key: 'name',
        type: 'Accordian',
        renderer: this.renderItems,
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
        renderer: this.renderItems,
        value: [
          {
            name: 'item1',
            value: '10'
          },
          {
            name: 'item2',
            value: '10'
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

export default ComboBoxExampleFourth;
