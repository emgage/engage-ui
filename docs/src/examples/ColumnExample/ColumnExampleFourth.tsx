import * as React from 'react';
import { Column } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ColumnExample = () => (
  <div className={styles.example}>
    <Column extraLarge="8-9">
      Size 8-9:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in multiple line based on size selected for column by user.
        </span>
    </Column>
    <br/>
    <Column extraLarge="9-10">
      Size 9-10:
      <br/>
        <span>
        Column responsivewidth size are vary and show information in multiple line based on size selected for column by user.
        </span>
    </Column>
  </div>
);

export default ColumnExample;
