import * as React from 'react';
import { Chip } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ChipExample = () => (
  <div className={styles.example}>
    <Chip
      clickable
      onClick={() => { alert('You clicked on Chip'); }}
      removable={false}
      transparent={false}
    >
      Trevor Hansen
    </Chip>
  </div>
);

export default ChipExample;
