import * as React from 'react';
import { ClickableChip, Chip, Card, CardBody, CardHeader  } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const ClickableChipExample = () => (
  <div className={styles.example}>
    <ClickableChip chip={<Chip>Batman</Chip>}>
      <Card>
        <CardHeader>More about Batman></CardHeader>
        <CardBody>
        </CardBody>
      </Card>
    </ClickableChip>
  </div>
);

export default ClickableChipExample;
