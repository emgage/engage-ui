import * as React from 'react';
import { Column } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ColumnExample = () => (
  <div className={styles.example}>
    <Column small="1-6">
      Size 1-6:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in multiple line based on it.
        </span>
    </Column>
    <br/>
    <Column small="2-8">
      Size 2-8:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in multiple line based on it.
        </span>
    </Column>
  </div>
);

export default ColumnExample;
