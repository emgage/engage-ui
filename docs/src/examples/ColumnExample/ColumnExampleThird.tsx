import * as React from 'react';
import { Column } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ColumnExample = () => (
  <div className={styles.example}>
    <Column large="5-9">
      Size 5-9:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in multiple line based on it.
        </span>
    </Column>
    <br/>
    <Column large="6-8">
      Size 6-8:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in multiple line based on it.
        </span>
    </Column>
  </div>
);

export default ColumnExample;
