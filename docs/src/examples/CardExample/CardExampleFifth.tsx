import * as React from 'react';
import { Card, CardBody, CardHeader } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card>
    <CardHeader>Staff accounts</CardHeader>
      <CardBody sectioned >
      <ul>
        <li>Stephen Hawking</li>
        <li>Jane Auston</li>
      </ul>
      </CardBody>
    </Card>
  </div>
);

export default CardExample;
