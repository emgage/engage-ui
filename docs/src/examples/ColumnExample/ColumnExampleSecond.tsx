import * as React from 'react';
import { Column } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ColumnExample = () => (
  <div className={styles.example}>
    <Column medium="3-6">
      Size 3-6:
      <br/>
        <span>
        Column responsivewidth size are vary and show information in multiple line based on it.
        </span>
    </Column>
    <br/>
    <Column medium="4-5">
      Size 4-5:
      <br/>
        <span>
            Column responsivewidth size are vary and show information in multiple line based on it.
        </span>
    </Column>
  </div>
);

export default ColumnExample;
