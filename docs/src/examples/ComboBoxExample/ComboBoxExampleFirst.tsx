import * as React from 'react';
import { ComboBox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class ComboBoxExampleFirst extends React.Component<never, never> {
  render() {
    const items = [
      {
        value: ['item1', 'item2', 'item3', 'item4']
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

export default ComboBoxExampleFirst;
