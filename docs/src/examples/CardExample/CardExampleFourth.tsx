import * as React from 'react';
import { Card, CardSection, CardBody, CardHeader } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
  <Card>
  <CardHeader>Online store dashboard</CardHeader>
    <CardBody>
      <CardSection >
        <CardHeader>Reports</CardHeader>
        <p>View a summary of your online store’s performance.</p>
      </CardSection>
      <CardSection>
        <CardHeader>Summary</CardHeader>
        <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
      </CardSection>
    </CardBody>
  </Card>
  </div>
);

export default CardExample;
