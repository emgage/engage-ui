import * as React from 'react';
import { Column } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ColumnExample = () => (
  <div className={styles.example}>
      <Column small="1-2" medium="3-4" large="5-7" extraLarge="8-10">
      small=1-2 medium=3-4 large=5-7 extraLarge=8-10:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in column based on it.
        </span>
      </Column>
      <br/>
      <Column small="1-2" medium="3-4" large="4-10">
      small=1-2 medium=3-4 large=4-10:
      <br/>
        <span>
          Column responsivewidth size are vary and show information in column based on it.
        </span>
      </Column>
  </div>
);

export default ColumnExample;
