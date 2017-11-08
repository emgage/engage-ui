import * as React from 'react';
import { FlexBox } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const FlexBoxExample = () => (
  <div className={styles.example}>
    <FlexBox
      direction="ColumnReverse"
      align="Start"
      justify="SpaceBetween"
    >
      <div>Demo 1</div>
      <div>Demo 2</div>
      <div>Demo 3</div>
    </FlexBox>
  </div>
);

export default FlexBoxExample;
