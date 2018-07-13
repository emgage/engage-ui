import * as React from 'react';
import { ClickableChip, Chip, Card  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ClickableChipExample = () => (
  <div className={styles.example}>
    <ClickableChip chip={<Chip>Batman</Chip>}>
      <Card componentTitle="More about Batman"/>
    </ClickableChip>
  </div>
);

export default ClickableChipExample;
