import * as React from 'react';
import { Card, CardBody } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card>
      <CardBody componentTitle="Staff accounts" sectioned >
      <ul>
        <li>Stephen Hawking</li>
        <li>Jane Auston</li>
      </ul>
      </CardBody>
    </Card>
  </div>
);

export default CardExample;
