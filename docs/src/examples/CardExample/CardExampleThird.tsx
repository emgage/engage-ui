import * as React from 'react';
import { Card, CardHeader, CardSection } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
    <Card>
      <CardHeader actions = {[{
        content: 'Edit Dashboard',
        onAction: () => {
          alert('Edit Content of Online Store Dashboard');
        },
        disabled: false,
      }]}>
      <p>Online store dashboard</p>
      </CardHeader>
      <CardSection subdued={false}>
        <p>View a summary of your online store’s performance.</p>
      </CardSection>
    </Card>
  </div>
);

export default CardExample;
