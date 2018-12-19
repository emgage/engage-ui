import * as React from 'react';
import { ClickableChip, Chip, Card, CardBody  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ClickableChipExample = () => (
  <div className={styles.example}>
    <ClickableChip chip={<Chip>Batman</Chip>}>
      <Card>
        <CardBody componentTitle="More about Batman">
        </CardBody>
      </Card>
    </ClickableChip>
  </div>
);

export default ClickableChipExample;
