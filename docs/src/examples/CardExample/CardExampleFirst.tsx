import * as React from 'react';
import { Card, CardBody, CardHeader } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card>
    <CardHeader>Online store dashboard - Card</CardHeader>
        <CardBody sectioned>
          <p>View a summary of your online store’s performance.</p>
        </CardBody>
    </Card>
  </div>
);

export default CardExample;
