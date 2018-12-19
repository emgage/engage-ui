import * as React from 'react';
import { Card, CardSection, CardBody } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
  <Card>
    <CardBody componentTitle="Online store dashboard">
      <CardSection componentTitle="Reports">
        <p>View a summary of your online store’s performance.</p>
      </CardSection>
      <CardSection componentTitle="Summary">
        <p>View a summary of your online store’s performance, including sales, visitors, top products, and referrals.</p>
      </CardSection>
    </CardBody>
  </Card>
  </div>
);

export default CardExample;
