import * as React from 'react';
import { Card, CardSection, CardBody , CardFooter } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const CardExample = () => (
  <div className={styles.example}>
  <Card>
    <CardBody componentTitle="Online store dashboard">
    <CardSection>
        <p>View a summary of your online store’s performance.</p>
      </CardSection>
    <CardFooter
      primaryFooterAction = {{
        content: 'View Dashboard',
        onAction: () => { alert('View Dashboard Content of Online Store.'); },
      }}
    >
    </CardFooter>
    </CardBody>
    </Card>
  </div>
);

export default CardExample;
